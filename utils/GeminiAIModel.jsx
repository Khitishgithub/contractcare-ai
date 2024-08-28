
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  const { GoogleAIFileManager } = require("@google/generative-ai/server");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  const fileManager = new GoogleAIFileManager(apiKey);
  
 
  // async function uploadToGemini(path, mimeType) {
  //   const uploadResult = await fileManager.uploadFile(path, {
  //     mimeType,
  //     displayName: path,
  //   });
  //   const file = uploadResult.file;
  //   console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
  //   return file;
  // }
  
 
  // async function waitForFilesActive(files) {
  //   console.log("Waiting for file processing...");
  //   for (const name of files.map((file) => file.name)) {
  //     let file = await fileManager.getFile(name);
  //     while (file.state === "PROCESSING") {
  //       process.stdout.write(".")
  //       await new Promise((resolve) => setTimeout(resolve, 10_000));
  //       file = await fileManager.getFile(name)
  //     }
  //     if (file.state !== "ACTIVE") {
  //       throw Error(`File ${file.name} failed to process`);
  //     }
  //   }
  //   console.log("...all files ready\n");
  // }
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  

  
   export const chatSession = model.startChat({
      generationConfig,
 
      
    });
  
   
  