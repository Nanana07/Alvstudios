// Fitur Toggle Dark Mode
const darkModeToggle = document.getElementById("darkModeToggle");

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
});

// Simpan preferensi mode gelap di localStorage
window.onload = () => {
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }
};

// Fitur Scroll to Top
const scrollToTopButton = document.createElement("button");
scrollToTopButton.innerText = "⬆";
scrollToTopButton.id = "scrollToTop";
document.body.appendChild(scrollToTopButton);

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollToTopButton.style.display = "block";
    } else {
        scrollToTopButton.style.display = "none";
    }
});

scrollToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Fitur Hamburger Menu
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
});

// Animasi Hover Interaktif pada Link Navigasi
document.querySelectorAll("nav ul li a").forEach(link => {
    link.addEventListener("mouseover", () => {
        link.style.transform = "scale(1.1)";
        link.style.transition = "0.3s ease";
    });
    link.addEventListener("mouseout", () => {
        link.style.transform = "scale(1)";
    });
});

// AI Chatbot dengan OpenAI API
const chatbox = document.createElement("div");
chatbox.id = "chatbox";
chatbox.innerHTML = `
    <div id="chatHeader">AI Chatbot</div>
    <div id="chatBody"></div>
    <input type="text" id="chatInput" placeholder="Ketik pertanyaan..." />
    <button id="sendMessage">Kirim</button>
`;
document.body.appendChild(chatbox);

// Mengambil API Key dari .env.local
const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

// Event Listener untuk mengirim pesan
document.getElementById("sendMessage").addEventListener("click", async () => {
    const input = document.getElementById("chatInput").value;
    if (!input) return;
    
    document.getElementById("chatBody").innerHTML += `<p class='user'>${input}</p>`;
    document.getElementById("chatInput").value = "";
    
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
    
    const data = await response.json();
    document.getElementById("chatBody").innerHTML += `<p class='bot'>${data.choices[0].message.content}</p>`;
});
