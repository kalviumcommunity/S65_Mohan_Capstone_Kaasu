const axios = require('axios')
const showdown = require('showdown')
const getInsights = async () => {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
    const dummy = `
    {1
    userId: '67e6bb1a451839153be391c1',
    date: '07-03-2025',
    description: 'UPI/CR/506617070333/G R Monish/PPIW/**ish07@fam/UPI Paym//TOT46E608C5572A41E6837174BA348F7686/07/03/2025 16:13:44',
    debit: null,
    credit: 27.5,
    category: 'UPI Payment'
  },
  {
    userId: '67e6bb1a451839153be391c1',
    date: '08-03-2025',
    description: 'UPI/DR/506796757025/Indian Cl/ICIC/**ments@icici/Indian C//ICI4da93af97d9846ffbcd7b20fa840d046/08/03/2025 06:38:33',
    debit: 100,
    credit: null,
    category: 'UPI Payment'
  },
  {
    userId: '67e6bb1a451839153be391c1',
    date: '09-03-2025',
    description: 'UPI/DR/506835044507/Jio/YESB/**l3066@ptybl/Sent usi//PYTM50309802050522625029XXXXXXXXXXX/09/03/2025 07:29:33',
    debit: 19,
    credit: null,
    category: 'UPI Payment'
  },
  {
    userId: '67e6bb1a451839153be391c1',
    date: '09-03-2025',
    description: 'UPI/DR/506871542856/ASHVITHA /SBIN/**09261@slc/UPI//NEF10625bba70274fffb7c2cefcbc6dccf3/09/03/2025 21:14:57',
    debit: 75,
    credit: null,
    category: 'UPI Payment'
  },
  {
    userId: '67e6bb1a451839153be391c1',
    date: '09-03-2025',
    description: 'UPI/DR/506897723497/ASHVITHA /SBIN/**09261@slc/UPI//NEF6fd6750d01ea4e61a94a1a5548e2cbb5/09/03/2025 22:57:01',
    debit: 50,
    credit: null,
    category: 'UPI Payment'
  },
  {
    userId: '67e6bb1a451839153be391c1',
    date: '10-03-2025',
    description: 'UPI/CR/506992946934/Hrithik  /SBIN/**51127@slc/UPI//NEF9d01016f20874192b71729564c1b103a/10/03/2025 16:27:43',
    debit: null,
    credit: 15,
    category: 'UPI Payment'
  },
  {
    userId: '67e6bb1a451839153be391c1',
    date: '10-03-2025',
    description: 'UPI/DR/101257291214/METROEMOB/UTIB/**9.rzp@axisbank/Addamoun//HDF49186021206e4cdf96725d2fefb8e0a3/10/03/2025 16:48:01',
    debit: 40,
    credit: null,
    category: 'UPI Payment'
  },
  {
    userId: '67e6bb1a451839153be391c1',
    date: '12-03-2025',
    description: 'UPI/CR/507179417022/MUTHUMARI/CNRB/**988-1@okaxis/UPI//AXId88cff45c80d4da9ade413fc6edce8de/12/03/2025 18:06:28',
    debit: null,
    credit: 10,
    category: 'UPI Payment'
  },
  {
    userId: '67e6bb1a451839153be391c1',
    date: '22-03-2025',
    description: 'SMS CHARGES ON ACTUAL BASIS',
    debit: 29,
    credit: null,
    category: 'Service Charges'
  },
  {
    userId: '67e6bb1a451839153be391c1',
    date: '28-03-2025',
    description: 'SBINT FOR THE PERIOD FROM01-FEB-25 TO 27-MAR-25',
    debit: null,
    credit: 6,
    category: 'Interest'
  }`
  const converter = new showdown.Converter()
        const requestBody = {
          contents: [
            {
              parts: [
                {
                  text: `Give me the Insights of this Transactions: ${dummy}`,
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

              const res = converter.makeHtml(response.data.candidates[0].content.parts[0].text)
              console.log(res)
          }
}

module.exports =  getInsights