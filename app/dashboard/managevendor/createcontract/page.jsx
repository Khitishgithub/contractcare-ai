"use client";
import React, { useState, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import "pdfjs-dist/web/pdf_viewer.css";
import { Box, Typography, Button, Paper, CircularProgress } from "@mui/material";

// Set up the worker source
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const CreateContract = () => {
  const [summary, setSummary] = useState("");
  const [rawText, setRawText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [documentType, setDocumentType] = useState("contract"); // "contract" or "invoice"

  const saveToDatabase = async (rawText, summarizedText) => {
    try {
      const res = await fetch("/api/savecontract", {
        method: "POST",
        body: JSON.stringify({ rawText, summarizedText }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`API Error: ${res.statusText}`);
      }

      const data = await res.json();
      console.log("Saved to database:", data);
    } catch (error) {
      console.error("Error saving to database:", error);
    }
  };

  const summarizeText = async (text) => {
    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        body: JSON.stringify({ text, type: documentType }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`API Error: ${res.statusText}`);
      }

      const data = await res.json();
      setIsLoading(false);
      const summarizedText = data.message;
      setSummary(summarizedText);

      // Save raw text and summary to the database if it's a contract
      if (documentType === "contract") {
        await saveToDatabase(text, summarizedText);
      }
    } catch (error) {
      console.error("Error summarizing text:", error);
      setIsLoading(false);
    }
  };

  const fetchContractSummary = async () => {
    try {
      const res = await fetch("/api/getContractsummary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`API Error: ${res.statusText}`);
      }

      const data = await res.json();
      return data.summary; // Assuming the API returns { summary: "..." }
    } catch (error) {
      console.error("Error fetching contract summary:", error);
      return null;
    }
  };

  const onLoadFile = async function () {
    const typedarray = new Uint8Array(this.result);
    let allText = "";

    pdfjsLib.getDocument({ data: typedarray }).promise.then(async (pdf) => {
      let pagePromises = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        pagePromises.push(
          pdf.getPage(i).then((page) =>
            page.getTextContent().then((textContent) => {
              let pageText = textContent.items.map((item) => item.str).join(" ");
              allText += pageText + " ";
            })
          )
        );
      }

      await Promise.all(pagePromises);

      setRawText(allText);
      setIsLoading(true);

      if (documentType === "invoice") {
        // Fetch the contract summary for comparison
        const contractSummary = await fetchContractSummary();
        const combinedText = `${contractSummary}\n\n${allText}`;
        summarizeText(combinedText);
      } else {
        summarizeText(allText);
      }
    });
  };

  const onChangeFileInput = (event) => {
    const file = event.target.files[0];
    if (file.type !== "application/pdf") {
      console.error(file.name, "is not a PDF file.");
      return;
    }

    
    setDocumentType(file.name.includes("invoice") ? "invoice" : "contract");

    const fileReader = new FileReader();
    fileReader.onload = onLoadFile;
    fileReader.readAsArrayBuffer(file);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        {documentType === "contract" ? "Create Contract" : "Upload Invoice"}
      </Typography>
      <input
        id="file-input"
        type="file"
        onChange={onChangeFileInput}
        style={{ display: "none" }}
      />
      <label htmlFor="file-input">
        <Button
          variant="contained"
          color="primary"
          component="span"
          sx={{ mb: 3 }}
        >
          Upload PDF
        </Button>
      </label>

      <Box>
        <Typography variant="h6" gutterBottom>
          Raw Text
        </Typography>
        <Paper elevation={3} sx={{ padding: 2, mb: 3 }}>
          <Typography
            variant="body2"
            sx={{ whiteSpace: "pre-wrap", backgroundColor: "#f5f5f5", padding: 1, borderRadius: 1 }}
          >
            {rawText}
          </Typography>
        </Paper>
      </Box>

      <Box>
        <Typography variant="h6" gutterBottom>
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
      </Box>
    </Box>
  );
};

export default CreateContract;
