// "use client";
// import React, { useState } from "react";
// import * as pdfjsLib from "pdfjs-dist/build/pdf";
// import "pdfjs-dist/web/pdf_viewer.css";
// import { Box, Typography, Button, Paper, CircularProgress } from "@mui/material";

// // Set up the worker source
// pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// const ManageContract = () => {
//   const [numbers, setNumbers] = useState([]);
//   const [pagesText, setPagesText] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const processInvoiceText = async (text) => {
//     try {
//       const res = await fetch("/api/processinvoice", {
//         method: "POST",
//         body: JSON.stringify({ text }),
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (!res.ok) {
//         throw new Error(`API Error: ${res.statusText}`);
//       }

//       const data = await res.json();
//       setIsLoading(false);
//       setNumbers(data.numbers);
//     } catch (error) {
//       console.error("Error processing invoice text:", error);
//       setIsLoading(false);
//     }
//   };

//   const onLoadFile = function () {
//     const typedarray = new Uint8Array(this.result);
//     let allText = "";

//     pdfjsLib.getDocument({ data: typedarray }).promise.then((pdf) => {
//       let pagePromises = [];

//       for (let i = 1; i <= pdf.numPages; i++) {
//         pagePromises.push(
//           pdf.getPage(i).then((page) =>
//             page.getTextContent().then((textContent) => {
//               let pageText = textContent.items.map((item) => item.str).join(" ");
//               allText += pageText + "\n";
//               return pageText;
//             })
//           )
//         );
//       }

//       Promise.all(pagePromises).then((texts) => {
//         setPagesText(texts);
//         setIsLoading(true);
//         processInvoiceText(allText);
//       });
//     });
//   };

//   const onChangeFileInput = (event) => {
//     const file = event.target.files[0];
//     if (file.type !== "application/pdf") {
//       console.error(file.name, "is not a PDF file.");
//       return;
//     }

//     const fileReader = new FileReader();
//     fileReader.onload = onLoadFile;
//     fileReader.readAsArrayBuffer(file);
//   };

//   return (
//     <Box sx={{ padding: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Process Invoice
//       </Typography>
//       <input
//         id="file-input"
//         type="file"
//         onChange={onChangeFileInput}
//         style={{ display: "none" }}
//       />
//       <label htmlFor="file-input">
//         <Button
//           variant="contained"
//           color="primary"
//           component="span"
//           sx={{ mb: 3 }}
//         >
//           Upload Invoice PDF
//         </Button>
//       </label>

//       <Box>
//         <Typography variant="h6" gutterBottom>
//           Raw Text
//         </Typography>
//         <Paper elevation={3} sx={{ padding: 2, mb: 3 }}>
//           {pagesText.map((pageText, index) => (
//             <Box key={index} sx={{ mb: 2 }}>
//               <Typography variant="subtitle1">Page {index + 1}</Typography>
//               <Typography
//                 variant="body2"
//                 sx={{ whiteSpace: "pre-wrap", backgroundColor: "#f5f5f5", padding: 1, borderRadius: 1 }}
//               >
//                 {pageText}
//               </Typography>
//             </Box>
//           ))}
//         </Paper>
//       </Box>

//       <Box>
//         <Typography variant="h6" gutterBottom>
//           Extracted Numbers
//         </Typography>
//         <Paper elevation={3} sx={{ padding: 2 }}>
//           {isLoading ? (
//             <Box sx={{ display: "flex", justifyContent: "center" }}>
//               <CircularProgress />
//             </Box>
//           ) : (
//             <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
//               {numbers.join(", ")}
//             </Typography>
//           )}
//         </Paper>
//       </Box>
//     </Box>
//   );
// };

// export default ManageContract;



"use client"

import { Button } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/navigation';

const ManageContract = () => {

    const router = useRouter();

    const handleAddInvoice = () => {
      router.push('/dashboard/managevendor/managecontract/addinvoice');
    };
    const handleAmendContract = () => {
      router.push('/dashboard/managevendor/managecontract/amendcontract');
    };
  
  return (
    <div>
          <div className="flex space-x-4 mt-6">
        <Button 
          onClick={handleAmendContract}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Amend Contract
        </Button>
        <Button className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
        onClick={handleAddInvoice }>
          Add Invoice
        </Button>
      </div>
      
    </div>
  );
}

export default ManageContract;
