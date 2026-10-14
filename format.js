/* =========================
   SOCIAL MEDIA LINKS
========================= */

const socialLinks = {
    instagram: "https://www.instagram.com/thegreenforkbg/",
    facebook: "https://www.facebook.com/profile.php?id=61592036572830",
    tiktok: "https://www.tiktok.com/",
};


/* Connect each icon to its social media page */

const socialButtons = document.querySelectorAll(
    ".footer--links a"
);

if (socialButtons.length >= 3) {
    socialButtons[0].href = socialLinks.instagram;
    socialButtons[1].href = socialLinks.facebook;
    socialButtons[2].href = socialLinks.tiktok;


    /* Open links in a new tab */

    socialButtons.forEach(function(button) {
        button.target = "_blank";
        button.rel = "noopener noreferrer";
    });
}

/* =========================
NAVBAR SCROLL
========================= */

document.addEventListener("DOMContentLoaded", function () {
const navbar = document.querySelector(".navbar");

if (!navbar) return;

function updateNavbar() {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
}

// Set the correct navbar style on page load
updateNavbar();

// Update the navbar when scrolling
window.addEventListener("scroll", updateNavbar, { passive: true });

});

/* =========================
HAMBURGER MENU
========================= */

function toggleMenu() {
    const menu = document.getElementById("navLinks");
    const button = document.getElementById("menuButton");

    if (!menu || !button) return;

    const isOpen = menu.classList.toggle("active");

    button.classList.toggle("active", isOpen);
    button.textContent = isOpen ? "☰" : "☰";
    button.setAttribute("aria-expanded", String(isOpen));
    button.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
}

/* =========================
   MENU DROPDOWN
========================= */

function toggleMenuDropdown() {

    const dropdown = document.getElementById("menuDropdown");

    dropdown.classList.toggle("active");
}