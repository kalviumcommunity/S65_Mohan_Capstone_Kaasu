const axios = require('axios')
const getInsights = async (data) => {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
    
        const requestBody = {
          contents: [
            {
              parts: [
                {
                  text: `Give me the Insights of this Transactions it must be sort and concise and the way to save money: ${data}`,
                },
              ],
            },
          ],
        };

        const response = await axios.post(apiUrl, requestBody, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        if (
            response.data.candidates &&
            response.data.candidates[0].content.parts[0].text
          ){

              return response.data.candidates[0].content.parts[0].text
          }
}

module.exports =  getInsights