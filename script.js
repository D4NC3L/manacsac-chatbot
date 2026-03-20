// Example fetch sa script.js
async function sendMessage() {
  const userInput = document.getElementById('user-input').value;
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userInput })
  });
  const data = await response.json();
  console.log(data.reply); // Ito ang sagot ni Gemini
}