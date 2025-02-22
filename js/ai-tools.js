// AI Tools - Debugging & Perbaikan Fungsi

// Chatbot AI Toggle
const chatbotToggle = document.getElementById("chatbotToggle");
const chatbotBox = document.getElementById("chatbotBox");

if (chatbotToggle && chatbotBox) {
    chatbotToggle.addEventListener("click", () => {
        chatbotBox.classList.toggle("chatbot_hidden");
    });
}

// API Key
const apiKey = "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"; // Ganti dengan API Key yang valid

async function fetchAIResponse(prompt, element) {
    element.innerHTML = "<p>⏳ Memproses...</p>";
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "openai/gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "Anda adalah AI Assistant yang membantu analisis bisnis dan pemasaran." },
                    { role: "user", content: prompt }
                ]
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        if (data.choices && data.choices.length > 0) {
            element.innerHTML = `<p><strong>Hasil:</strong> ${data.choices[0].message.content}</p>`;
        } else {
            element.innerHTML = "<p>⚠️ Tidak ada hasil yang ditemukan.</p>";
        }
    } catch (error) {
        console.error("Error fetching AI response:", error);
        element.innerHTML = `<p>❌ Error: ${error.message}</p>`;
    }
}

// AI Trend Analyzer
const analyzeTrendButton = document.getElementById("analyzeTrend");
const trendInput = document.getElementById("trendInput");
const trendResult = document.getElementById("trendResult");
if (analyzeTrendButton) {
    analyzeTrendButton.addEventListener("click", () => {
        const industry = trendInput.value.trim();
        if (!industry) {
            trendResult.innerHTML = "<p>⚠️ Masukkan kategori bisnis.</p>";
            return;
        }
        fetchAIResponse(`Apa tren terbaru dalam industri ${industry}?`, trendResult);
    });
}

// AI Marketing Assistant
const generateMarketingButton = document.getElementById("generateMarketing");
const marketingInput = document.getElementById("marketingInput");
const marketingResult = document.getElementById("marketingResult");
if (generateMarketingButton) {
    generateMarketingButton.addEventListener("click", () => {
        const marketingText = marketingInput.value.trim();
        if (!marketingText) {
            marketingResult.innerHTML = "<p>⚠️ Masukkan produk atau layanan.</p>";
            return;
        }
        fetchAIResponse(`Buatkan konten pemasaran untuk ${marketingText}.`, marketingResult);
    });
}

// AI Copywriting Assistant
const generateCopyButton = document.getElementById("generateCopy");
const copyInput = document.getElementById("copyInput");
const copyResult = document.getElementById("copyResult");
if (generateCopyButton) {
    generateCopyButton.addEventListener("click", () => {
        const copyText = copyInput.value.trim();
        if (!copyText) {
            copyResult.innerHTML = "<p>⚠️ Masukkan topik copywriting.</p>";
            return;
        }
        fetchAIResponse(`Buatkan teks iklan untuk ${copyText}.`, copyResult);
    });
}
alert("AI Tools berhasil dimuat!");
