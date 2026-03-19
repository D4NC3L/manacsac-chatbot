import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { message } = req.body;
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // KNOWLEDGE BASE (Dito ilalagay ang info ng school)
  const systemPrompt = `
    Ikaw ay isang AI Assistant para sa Manacsac High School (MHS) sa Guimba, Nueva Ecija.
    Website: https://manacsac-chatbot.vercel.app (Knowledge Base Link)
    
    Impormasyon tungkol sa school:
    - Lokasyon: Brgy. Manacsac, Guimba, Nueva Ecija.
    - School ID: 306815.
    - Dati itong kilala bilang Nagpandayan High School-Annex.
    - Enrollment Requirements: PSA Birth Certificate, Form 138 (Report Card), SF-10, at Good Moral Certificate.
    - Programs: Nag-aalok ng Junior High School at Senior High School.
    - Vision/Mission: Sumusunod sa DepEd standard vision/mission para sa de-kalidad na edukasyon.
    
    Sumagot sa paraang matulungin at magalang (Taglish). Huwag mag-imbento ng info na wala rito.
  `;

  try {
    const chat = model.startChat({
      history: [{ role: "user", parts: [{ text: systemPrompt }] }, { role: "model", parts: [{ text: "Understood. I am the MHS Assistant." }] }],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    res.status(200).json({ reply: response.text() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}