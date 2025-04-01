const fs = require("fs");
const pdfParse = require("pdf-parse");
const axios = require("axios");

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
  // Remove triple backticks and potential "json" label
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
              text: `Just give me the transactions grouped with categories in JSON format. Return only the JSON, no extra text:\n\n${text}`,
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

      // Clean the JSON response
      const cleanedJson = cleanJsonResponse(rawJson);

      try {
        // Parse the cleaned JSON
        const parsedJson = JSON.parse(cleanedJson);

        // Save to output.json
        fs.writeFileSync("output.json", JSON.stringify(parsedJson, null, 2));

        return parsedJson;
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
