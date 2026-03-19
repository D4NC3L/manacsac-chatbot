import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY=AIzaSyCWJbQz8Ew9pACp8Hfaik3B0WIUY6cTrsU);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const { message } = req.body;

  // SYSTEM PROMPT (Knowledge Base & Agent Identity)
  const systemPrompt = `
    You are the official AI Assistant of Manacsac High School Senior High School department.
    Your goal is to provide accurate information about the school's strands, enrollment process, and FAQs.

    KNOWLEDGE BASE:
    Primary Source: [ILAGAY DITO ANG LINK NG WEBSITE O FB PAGE NG MANACSAC HIGH SCHOOL]
    
    GUIDELINES:
    1. Answer in a professional yet friendly manner (Taglish is okay).
    2. Focus on Manacsac High School's specific offerings (e.g., STEM, TVL, etc.).
    3. If a specific detail (like exact tuition or dates) is not in your knowledge, advise them to visit the Manacsac High School Registrar's Office.
    4. Always promote the school's values and mission.
    5. If asked about something outside of Manacsac High School, politely redirect the user back to school-related inquiries.
    6. Use the knowledge base as your primary reference for all information provided.
    7. If the user asks for information that is not available in the knowledge base, respond with: "I don't have that information at the moment. Please contact the Manacsac High School Registrar's Office for more details."
    8. Always end your responses with a positive note about Manacsac High School, such as "Manacsac High School is committed to providing quality education and opportunities for all students!".
    9. When it hi to you say hello, greet them with "Hello! I am the Manacsac High School Assistant. How can I help you with your SHS inquiries today?".
  `;

  try {
    const chat = model.startChat({
      history: [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "model", parts: [{ text: "Hello! I am the Manacsac High School Assistant. How can I help you with your SHS inquiries today?" }] },
      ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    res.status(200).json({ reply: response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}