// AI Trend Analyzer - Menggunakan OpenAI API
const analyzeTrendButton = document.getElementById("analyzeTrend");
const trendInput = document.getElementById("trendInput");
const trendResult = document.getElementById("trendResult");

const apiKey = "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"; // Ganti dengan API Key yang valid

analyzeTrendButton.addEventListener("click", async () => {
    const industry = trendInput.value.trim();
    if (!industry) {
        trendResult.innerHTML = "<p>Silakan masukkan industri atau kategori bisnis.</p>";
        return;
    }
    
    trendResult.innerHTML = "<p>Memproses analisis tren...</p>";
    
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
                    { role: "system", content: "Anda adalah AI Trend Analyzer yang menganalisis tren pasar dan insight kompetitor berdasarkan industri atau kategori bisnis pengguna. Berikan wawasan yang akurat dan actionable." },
                    { role: "user", content: `Apa tren terbaru dalam industri ${industry} dan bagaimana bisnis bisa memanfaatkannya?` }
                ]
            })
        });

        const data = await response.json();
        if (data.choices && data.choices.length > 0) {
            trendResult.innerHTML = `<p><strong>Hasil Analisis Tren:</strong> ${data.choices[0].message.content}</p>`;
        } else {
            trendResult.innerHTML = "<p>Maaf, tidak dapat menemukan tren untuk industri ini.</p>";
        }
    } catch (error) {
        console.error("Error fetching AI response:", error);
        trendResult.innerHTML = "<p>Terjadi kesalahan, coba lagi nanti.</p>";
    }
});
