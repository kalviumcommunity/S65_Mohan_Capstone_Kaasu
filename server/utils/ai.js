const fs = require("fs");
const pdfParse = require("pdf-parse");
const axios = require("axios");
const getInsights = require('./insights')
const getInfo = require('./info')



const extractTextFromPDF = async (pdfPath) => {
  try {
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  } catch (error) {
    console.error("Error reading PDF:", error);
    return null;
  }
};

const cleanJsonResponse = (rawText) => {
  return rawText.replace(/```json|```/g, "").trim();
};

const getGeminiExplanation = async (text) => {
  try {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `Just give me the transactions grouped with categories with the balance in JSON format. Return only the JSON, no extra text in this format {
  transactions: [
    {
      date: '01-03-2025' //make sure date in this formate,
      description: 'UPI/DR/506015304416/S KOKILA/IOBA/**shjai@okhdfcbank/UPI//NEF61d784017cf94cf3af3ad9f232efc3a9/01/03/2025 15:46:05', // here extract the main name like here is S Kokila,
      category: UPI Payment,
      debit: 106,
      credit: null,
      balance: 844.64
            }]:\n\n${text}`,
            },
          ],
        },
      ],
    };

    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (
      response.data.candidates &&
      response.data.candidates[0].content.parts[0].text
    ) {
      const rawJson = response.data.candidates[0].content.parts[0].text;
      const insights = await getInsights(rawJson)
      const info = await getInfo(rawJson)
      // Clean the JSON response
      const cleanedJson = cleanJsonResponse(rawJson);

      try {
        // Parse the cleaned JSON
        const parsedJson = JSON.parse(cleanedJson);

        // Save to output.json
        fs.writeFileSync("output.json", JSON.stringify(parsedJson, null, 2));

        return {parsedJson, insights, info};
      } catch (error) {
        console.error("Error parsing JSON from Gemini response:", error);
        console.error("Raw response:", cleanedJson);
        return null;
      }
    } else {
      console.error("Unexpected API response:", response.data);
      return null;
    }
  } catch (error) {
    console.error("Error with Gemini API:", error.message);
    return null;
  }
};

const processPDF = async (pdfPath) => {
  const extractedText = await extractTextFromPDF(pdfPath);

  if (!extractedText) {
    console.log("No text extracted.");
    return;
  }

  const explanation = await getGeminiExplanation(extractedText);
  return explanation;
};

module.exports = processPDF;
