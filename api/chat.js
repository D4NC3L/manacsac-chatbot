import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const genAI = new GoogleGenerativeAI(process.env.AIzaSyCPC0xJg8OgKbznRLu6lXXVpR_HSQSWVRk);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const { message } = req.body;

  // SYSTEM PROMPT: Dito natin ilalagay ang knowledge base link
  const systemInstruction = `
    You are the official AI Assistant for Manacsac High School.
    Knowledge Base: Use the information from this website: https://www.facebook.com/manacsachighschool/
    Behavior: 
    - Be professional yet approachable (Taglish is okay).
    - Answer FAQs about enrollment, strands, and school facilities.
    - If the info is not on the website, advise them to contact the school office directly.
  `;

  const prompt = `${systemInstruction}\n\nUser Question: ${message}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    res.status(200).json({ text: response.text() });
  } catch (error) {
    res.status(500).json({ error: "Nagka-error sa connection sa AI." });
  }
}