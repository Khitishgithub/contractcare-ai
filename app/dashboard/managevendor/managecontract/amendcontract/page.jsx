// pages/displaySummary.js
"use client"
import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, CircularProgress, Button, Input } from "@mui/material";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import "pdfjs-dist/web/pdf_viewer.css";

// Set up the worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const DisplaySummary = () => {
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch("/api/getSummarizedText");

        if (!res.ok) {
          throw new Error(`API Error: ${res.statusText}`);
        }

        const data = await res.json();
        if (data.success) {
          setSummary(data.summarizedText);
        } else {
          console.error("Failed to fetch summarized text:", data.message);
        }
      } catch (error) {
        console.error("Error fetching summarized text:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummary();
  }, []);

  const extractTextFromPDF = async (file) => {
    const pdf = await pdfjsLib.getDocument(URL.createObjectURL(file)).promise;
    const numPages = pdf.numPages;
    let text = "";

    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();
      const strings = content.items.map(item => item.str);
      text += strings.join(" ");
    }

    return text;
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) return;

    setIsLoading(true);
    setResponseMessage(""); 
    try {
      const pdfText = await extractTextFromPDF(file);

      const combinedText = `${summary}\n\n${pdfText}`;

      const res = await fetch("/api/amendsummerize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: combinedText, type: "amendContract" }),
      });

      if (!res.ok) {
        throw new Error(`API Error: ${res.statusText}`);
      }

      const data = await res.json();
      if (data.message) {
        setResponseMessage(data.message); // Store the API response in state
      } else {
        console.error("Failed to process amended contract:", data.error);
        setResponseMessage("Failed to process amended contract.");
      }
    } catch (error) {
      console.error("Error processing amended contract:", error);
      setResponseMessage("Error processing amended contract.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Summarized Text
      </Typography>
      <Paper elevation={3} sx={{ padding: 2 }}>
        {isLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
            {summary}
          </Typography>
        )}
      </Paper>
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h6">Upload Amended Contract</Typography>
        <Input type="file" accept=".pdf" onChange={handleFileChange} />
        <Button variant="contained" color="primary" onClick={handleFileUpload} disabled={!file}>
          Upload Amended Contract
        </Button>
      </Box>
      {responseMessage && (
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h6">AI Response</Typography>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
              {responseMessage}
            </Typography>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default DisplaySummary;
