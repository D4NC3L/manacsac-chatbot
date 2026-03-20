import { GoogleGenAI } from '@google/genai';

// Replace 'YOUR_ACTUAL_API_KEY' with your key or use an environment variable
const API_KEY = process.env.GEMINI_API_KEY; 

async function main(userInput) {
  if (!API_KEY) {
    console.error("AIzaSyCWJbQz8Ew9pACp8Hfaik3B0WIUY6cTrsU");
    return;
  }

  const ai = new GoogleGenAI(API_KEY);
  
  // Note: 'gemini-2.0-flash-thinking-preview' or 'gemini-1.5-pro' are standard 
  // We use the model string directly.
  const model = ai.getGenerativeModel({ 
    model: "gemini-2.0-flash-thinking-preview-01-21" 
  });

  const generationConfig = {
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
    maxOutputTokens: 2048,
  };

  // System instructions as a single string for better consistency
  const systemInstruction = `You are the official AI Assistant of Manacsac High School Senior High School department.
Your goal is to provide accurate information about the school's strands, enrollment process, and FAQs.

PRIMARY SOURCE: https://www.cybo.com/PH-biz/manacsac-high-school-formerly

GUIDELINES:
1. Greet: If the user says "Hi", say: "Hello! I am the Manacsac High School Assistant. Do you want to learn some things about Manacsac High School? How can I help you with your SHS inquiries today?"
2. Language: Use Taglish/Tagalog if the user asks in Tagalog. Use English if the user asks in English. 
3. Scope: Only answer questions about Manacsac High School (History, Location, Graduates, Teachers, Strands like STEM/TVL). 
4. Restrictions: Do NOT answer questions unrelated to the school. Politely redirect them back to school inquiries.
5. If information is missing: Say: "I don't have that information at the moment. Please contact the Manacsac High School Registrar's Office for more details."
6. Closing: Always end with: "Manacsac High School is committed to providing quality education and opportunities for all students!"`;

  const chatSession = model.startChat({
    generationConfig,
    history: [],
    systemInstruction: { text: systemInstruction }
  });

  try {
    const result = await chatSession.sendMessageStream(userInput);
    
    console.log("\n--- Assistant Response ---\n");
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      process.stdout.write(chunkText); // Prints in real-time
    }
    console.log("\n\n--------------------------");
  } catch (error) {
    console.error("Error generating content:", error);
  }
}

// Get input from command line or default to "Hi"
const input = process.argv[2] || "Hi";
main(input);