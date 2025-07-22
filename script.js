 const chatBox = document.getElementById("chat-box");
    const userInput = document.getElementById("user-input");

    const apiKey = "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";
    const apiUrl = "https://openrouter.ai/api/v1/chat/completions";

    async function sendMessage() {
      const message = userInput.value.trim();
      if (!message) return;

      appendMessage("You", message);
      userInput.value = "";

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
            "HTTP-Referer": "https://your-site.com",  // Change this to your domain if hosting
            "X-Title": "My Chatbot"
          },
          body: JSON.stringify({
            model: "openai/gpt-3.5-turbo",  // You can also try: "mistralai/mixtral-8x7b", "meta-llama/llama-3-70b-instruct"
            messages: [
              { role: "system", content: "You are a helpful assistant." },
              { role: "user", content: message }
            ]
          })
        });

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || "⚠️ No response";
        appendMessage("AI", reply);
      } catch (error) {
        console.error("Error:", error);
        appendMessage("AI", "❌ Error: Unable to connect.");
      }
    }

    function appendMessage(sender, text) {
      const msg = document.createElement("div");
      msg.className = "message";
      msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
      chatBox.appendChild(msg);
      chatBox.scrollTop = chatBox.scrollHeight;
    }