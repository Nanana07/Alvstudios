// script.js

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
