// "use client";
// import React, { useState } from 'react';
// import * as pdfjsLib from 'pdfjs-dist/build/pdf';
// import { Box, Typography, Button, Paper, CircularProgress } from '@mui/material';

// pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

// const InvoiceUpload = () => {
//   const [invoiceDetails, setInvoiceDetails] = useState(null);
//   const [pagesText, setPagesText] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const processInvoiceText = async (text) => {
//     try {
//       const res = await fetch('/api/summarize', {
//         method: 'POST',
//         body: JSON.stringify({ text, invoiceNumber: '1' }), // Assuming invoice number is '1'
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       if (!res.ok) {
//         throw new Error(`API Error: ${res.statusText}`);
//       }

//       const data = await res.json();
//       setInvoiceDetails(data);
//     } catch (error) {
//       console.error('Error processing invoice text:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const onLoadFile = function () {
//     const typedarray = new Uint8Array(this.result);
//     let allText = '';

//     pdfjsLib.getDocument({ data: typedarray }).promise.then((pdf) => {
//       let pagePromises = [];

//       for (let i = 1; i <= pdf.numPages; i++) {
//         pagePromises.push(
//           pdf.getPage(i).then((page) =>
//             page.getTextContent().then((textContent) => {
//               let pageText = textContent.items.map((item) => item.str).join(' ');
//               allText += pageText + '\n';
//               return pageText;
//             })
//           )
//         );
//       }

//       Promise.all(pagePromises).then(() => {
//         setPagesText(allText.split('\n'));
//         setIsLoading(true);
//         processInvoiceText(allText);
//       });
//     });
//   };

//   const onChangeFileInput = (event) => {
//     const file = event.target.files[0];
//     if (file.type !== 'application/pdf') {
//       console.error(file.name, 'is not a PDF file.');
//       return;
//     }

//     const fileReader = new FileReader();
//     fileReader.onload = onLoadFile;
//     fileReader.readAsArrayBuffer(file);
//   };

//   return (
//     <Box sx={{ padding: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         Upload Invoice
//       </Typography>
//       <input
//         id="file-input"
//         type="file"
//         onChange={onChangeFileInput}
//         style={{ display: 'none' }}
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

//       {isLoading && (
//         <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
//           <CircularProgress />
//         </Box>
//       )}

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
//                 sx={{ whiteSpace: 'pre-wrap', backgroundColor: '#f5f5f5', padding: 1, borderRadius: 1 }}
//               >
//                 {pageText}
//               </Typography>
//             </Box>
//           ))}
//         </Paper>
//       </Box>

//       {invoiceDetails && (
//         <Box>
//           <Typography variant="h6" gutterBottom>
//             Combined Invoice and Contract Details
//           </Typography>
//           <Paper elevation={3} sx={{ padding: 2 }}>
//             <Box sx={{ whiteSpace: 'pre-wrap' }}>
//               <Typography variant="body2">
//                 <strong>Invoice Summary:</strong>
//                 {invoiceDetails.contractSummary}
//               </Typography>
//               <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
//                 Original Contract Data
//               </Typography>
//               <Typography variant="body2">{JSON.stringify(invoiceDetails.originalContract, null, 2)}</Typography>
//             </Box>
//           </Paper>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default InvoiceUpload;

import React from 'react';

const AmendContract = () => {
  return (
    <div>
      <h1>Amend Contract</h1>
      
    </div>
  );
}

export default AmendContract;

