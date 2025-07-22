const apiKey = "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";

const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

async function sendMessage() {
  const input = userInput.value.trim();
  if (!input) return;

  appendMessage("You", input, "user");
  userInput.value = "";

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: input }
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No reply";

    appendMessage("Gemini AI", reply, "bot");
  } catch (error) {
    appendMessage("Gemini AI", "Error fetching reply. Try again later.", "bot");
    console.error(error);
  }
}

function appendMessage(sender, text, className) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", className);
  messageDiv.textContent = `${sender}: ${text}`;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}
