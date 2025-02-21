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
