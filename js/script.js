// Script utama untuk fitur interaktif

document.addEventListener("DOMContentLoaded", function () {
    // Dark Mode Toggle
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    if (darkModeToggle) {
        if (localStorage.getItem("darkMode") === "enabled") {
            document.body.classList.add("dark-mode");
        }

        darkModeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            localStorage.setItem("darkMode", document.body.classList.contains("dark-mode") ? "enabled" : "disabled");
        });
    }

    // Chatbot Toggle
    const chatbotToggle = document.getElementById("chatbot-toggle");
    const chatbotContainer = document.querySelector(".chatbot-container");
    const closeChatbot = document.getElementById("close-chatbot");
    const sendMessage = document.getElementById("send-message");
    const chatbotMessages = document.getElementById("chatbot-messages");
    const chatbotInput = document.getElementById("chatbot-input");

    if (chatbotToggle && chatbotContainer) {
        chatbotToggle.addEventListener("click", () => {
            chatbotContainer.classList.toggle("active");
        });
    }

    if (closeChatbot) {
        closeChatbot.addEventListener("click", () => {
            chatbotContainer.classList.remove("active");
        });
    }

    if (sendMessage && chatbotInput) {
        sendMessage.addEventListener("click", () => {
            const userMessage = chatbotInput.value.trim();
            if (userMessage !== "") {
                chatbotMessages.innerHTML += `<p><strong>Anda:</strong> ${userMessage}</p>`;
                chatbotInput.value = "";
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            }
        });
    }

    // AI Tools Button Handling
    function setupAIButton(buttonId, inputId, resultId, promptText) {
        const button = document.getElementById(buttonId);
        const input = document.getElementById(inputId);
        const result = document.getElementById(resultId);
        
        if (button && input && result) {
            button.addEventListener("click", async () => {
                const userInput = input.value.trim();
                if (!userInput) {
                    result.innerHTML = "<p>⚠️ Harap masukkan input terlebih dahulu.</p>";
                    return;
                }
                result.innerHTML = "<p>⏳ Memproses...</p>";
                try {
                    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer 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`
                        },
                        body: JSON.stringify({
                            model: "openai/gpt-3.5-turbo",
                            messages: [
                                { role: "system", content: promptText },
                                { role: "user", content: userInput }
                            ]
                        })
                    });
                    const data = await response.json();
                    if (data.choices && data.choices.length > 0) {
                        result.innerHTML = `<p><strong>Hasil:</strong> ${data.choices[0].message.content}</p>`;
                    } else {
                        result.innerHTML = "<p>⚠️ Tidak ada hasil yang ditemukan.</p>";
                    }
                } catch (error) {
                    console.error("Error fetching AI response:", error);
                    result.innerHTML = "<p>❌ Terjadi kesalahan, coba lagi nanti.</p>";
                }
            });
        }
    }

    // Setup AI Tools
    setupAIButton("analyzeTrend", "trendInput", "trendResult", "Anda adalah AI yang menganalisis tren pasar.");
    setupAIButton("generateMarketing", "marketingInput", "marketingResult", "Anda adalah AI Marketing Assistant yang membantu bisnis.");
    setupAIButton("generateCopy", "copyInput", "copyResult", "Anda adalah AI Copywriting Assistant.");
});
