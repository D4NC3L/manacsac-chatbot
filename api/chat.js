// api/chat.js (Vanilla JS)
export default async function handler(req, res) {
  const { message } = req.body;
  const API_KEY = process.env.GEMINI_API_KEY;

  // Dito natin ilalagay ang "Knowledge Base" link sa prompt
  const websiteLink = "https://manacsac-shs-info-link.com"; // Palitan mo ng actual link
  
  const prompt = `
    You are an AI assistant for Manacsac Senior High School. 
    Use the information from this website as your primary knowledge base: ${websiteLink}
    Answer the following user question about the school: ${message}
  `;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${AIzaSyCWJbQz8Ew9pACp8Hfaik3B0WIUY6cTrsU}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();
    const aiResponse = data.candidates[0].content.parts[0].text;
    res.status(200).json({ reply: aiResponse });
  } catch (error) {
    res.status(500).json({ error: "May mali sa system." });
  }
}