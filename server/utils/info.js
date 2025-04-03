const axios = require('axios')
const getInfo = async (data) => {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
    
        const requestBody = {
          contents: [
            {
              parts: [
                {
                  text: `Give me the total balance and expenses from this Transactions in a array format like this [2000, 300] the first index is the balance and second is the expenses. Don't give me any extra text: ${data}`,
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

module.exports =  getInfo