// Cek apakah elemen ada sebelum menambahkan event listener
document.addEventListener("DOMContentLoaded", () => {

    // Fitur Toggle Dark Mode
    const darkModeToggle = document.getElementById("darkModeToggle");
    if (darkModeToggle) {
        darkModeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
        });

        // Simpan preferensi mode gelap di localStorage
        if (localStorage.getItem("darkMode") === "true") {
            document.body.classList.add("dark-mode");
        }
    }

    // Fitur Scroll to Top
    const scrollToTopButton = document.createElement("button");
    scrollToTopButton.innerText = "⬆";
    scrollToTopButton.id = "scrollToTop";
    scrollToTopButton.style.display = "none"; // Sembunyikan awalnya
    document.body.appendChild(scrollToTopButton);

    window.addEventListener("scroll", () => {
        scrollToTopButton.style.display = window.scrollY > 300 ? "block" : "none";
    });

    scrollToTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Fitur Hamburger Menu
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
        });
    }

    document.addEventListener("DOMContentLoaded", function () {
  // Chatbot Functionality
  const chatbotContainer = document.getElementById("chatbot-container");
  const chatbotToggle = document.getElementById("chatbot-toggle");
  const closeChatbot = document.getElementById("close-chatbot");
  const chatbotInput = document.getElementById("chatbot-input");
  const sendMessage = document.getElementById("send-message");
  const chatbotMessages = document.getElementById("chatbot-messages");

  chatbotToggle.addEventListener("click", () => {
    chatbotContainer.classList.toggle("active");
  });

  closeChatbot.addEventListener("click", () => {
    chatbotContainer.classList.remove("active");
  });

  sendMessage.addEventListener("click", () => {
    const userMessage = chatbotInput.value.trim();
    if (userMessage !== "") {
      chatbotMessages.innerHTML += `<p><strong>Anda:</strong> ${userMessage}</p>`;
      chatbotInput.value = "";
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
  });

  // Dark Mode Toggle
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

});


    // API Key harus ditentukan dengan aman
    const apiKey = "YOUR_OPENAI_API_KEY"; // Ganti dengan cara yang lebih aman (misalnya, dari backend)

    // Event Listener untuk mengirim pesan ke AI Chatbot
    const sendMessageBtn = document.getElementById("sendMessage");
    if (sendMessageBtn) {
        sendMessageBtn.addEventListener("click", async () => {
            const input = document.getElementById("chatInput").value.trim();
            if (!input) return;

            document.getElementById("chatBody").innerHTML += `<p class='user'>${input}</p>`;
            document.getElementById("chatInput").value = "";

            try {
                const response = await fetch("https://api.openai.com/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${apiKey}`
                    },
                    body: JSON.stringify({
                        model: "gpt-3.5-turbo",
                        messages: [{ role: "user", content: input }]
                    })
                });

                if (!response.ok) throw new Error("Gagal mendapatkan respons dari server");

                const data = await response.json();
                document.getElementById("chatBody").innerHTML += `<p class='bot'>${data.choices[0].message.content}</p>`;
            } catch (error) {
                document.getElementById("chatBody").innerHTML += `<p class='bot'>Maaf, terjadi kesalahan.</p>`;
                console.error(error);
            }
        });
    }
});
