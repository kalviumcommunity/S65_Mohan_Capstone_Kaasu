require("dotenv").config() 
const fs = require("fs") 
const pdfParse = require("pdf-parse") 
const axios = require("axios")  


const extractTextFromPDF = async (pdfPath) => {
  try {
    const dataBuffer = fs.readFileSync(pdfPath) 
    const data = await pdfParse(dataBuffer) 
    return data.text 
  } catch (error) {
    console.error("Error reading PDF:", error) 
    return null 
  }
} 


const getGeminiExplanation = async (text) => {
  try {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}` 
    
    const requestBody = {
      contents: [{
        parts: [{
          text: `Just Give me the Transactions group with categories in terms of json give me only the json don't write any extra text give me only json:\n\n${text}`
        }]
      }]
    } 

    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        'Content-Type': 'application/json'
      }
    }) 


    if (response.data.candidates && response.data.candidates[0].content.parts[0].text) {
      return response.data.candidates[0].content.parts[0].text 
    } else {
      console.error("Unexpected API response:", response.data) 
      return null 
    }
  } catch (error) {
    console.error("Error with Gemini API:", error.message) 
    return null 
  }
} 


const processPDF = async (pdfPath) => {
  const extractedText = await extractTextFromPDF(pdfPath) 
  
  if (!extractedText) {
    console.log("No text extracted.") 
    return 
  }

  console.log("Extracted Text:", extractedText)  

  const explanation = await getGeminiExplanation(extractedText) 
  console.log("\nGemini Explanation:\n", explanation) 
} 

// processPDF("bank-statement.pdf")

module.exports = processPDF