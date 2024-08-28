
importScripts('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.13.216/pdf.worker.min.js');
// public/pdf.worker.js

// This file should directly export the worker file from the `pdfjs-dist` package.
// pdfjs-dist already comes with a worker file, so we can just reference it.
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.js';

export default pdfjsWorker;
