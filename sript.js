import { GoogleGenAI } from "https://esm.run/@google/genai";

const API_KEY = "AIzaSyA6RDEBgGBW31wgGmV_k_MG2cra_pWE2us"; // Replace with your actual API key
const genAI = new GoogleGenAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-lite-preview" });

const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

async function handleChat() {
    const text = userInput.value;
    if (!text) return;

    appendMessage(text, 'user');
    userInput.value = '';

    try {
        const result = await model.generateContent(text);
        const response = await result.response;
        appendMessage(response.text(), 'bot');
    } catch (error) {
        appendMessage("Error: Check console or API limits.", 'bot');
        console.error(error);
    }
}

function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', sender);
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener('click', handleChat);
userInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleChat(); });