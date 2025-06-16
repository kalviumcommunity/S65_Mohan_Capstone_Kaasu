const axios = require('axios')

const cleanJSXResponse = (rawText) => {
  return rawText.replace(/```jsx|```/g, "").trim();
};


const getInsights = async (text) => {
  try {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `
             You are a financial-analysis engine. You will be given a raw list of financial transactions (one per line). 
1. Analyze the transactions and extract meaningful financial insights, including:
   - Spending patterns
   - Recurring payees
   - Unusual spikes or dips
   - Frequent small UPI payments
   - Any red flags or budgeting suggestions
2. Then output **only** the following JSX fragment (no imports, no icons, no surrounding HTML, no explanations), with **inline CSS** exactly as shown in this template:

<div style="max-width: 1200px; margin: 0 auto; padding: 24px; background-color: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); display: flex; flex-direction: column; gap: 24px;">
  <h1 style="font-size: 1.5rem; font-weight: 700; color: #2d3748; text-align: center;">Financial Insights</h1>
  <div style="display: flex; flex-direction: column; gap: 16px;">
    <div style="background-color: #edf2f7; padding: 16px; border-radius: 8px;">
      <h2 style="font-size: 1.125rem; font-weight: 600; color: #4a5568;">Spending Patterns</h2>
      <ul style="list-style-type: disc; padding-left: 20px; color: #718096; font-size: 0.875rem;">
        <!-- 1–5 bullet points summarizing major patterns -->
        <li>…</li>
      </ul>
    </div>
    <div style="background-color: #edf2f7; padding: 16px; border-radius: 8px;">
      <h2 style="font-size: 1.125rem; font-weight: 600; color: #4a5568;">Suggestions</h2>
      <ul style="list-style-type: disc; padding-left: 20px; color: #718096; font-size: 0.875rem;">
        <!-- 1–5 actionable suggestions -->
        <li>…</li>
      </ul>
    </div>
    <div style="background-color: #edf2f7; padding: 16px; border-radius: 8px;">
      <h2 style="font-size: 1.125rem; font-weight: 600; color: #4a5568;">Recurring Transactions</h2>
      <ul style="list-style-type: disc; padding-left: 20px; color: #718096; font-size: 0.875rem;">
        <!-- 1–5 recurring payee bullets -->
        <li>…</li>
      </ul>
    </div>
  </div>
</div>

❌ Important:
- Use **only** inline CSS exactly as in the template.
- Output **only** the JSX snippet above, replacing the “…” with your extracted insights.
- No additional text, comments, imports, or wrappers—just that <div>...</div> block.

              \n\n${text}`,
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
      const res = response.data.candidates[0].content.parts[0].text;
      const cleanJSX = cleanJSXResponse(res)
      try {

        return cleanJSX;
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

module.exports = getInsights