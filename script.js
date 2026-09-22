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
    ".social-links a"
);

socialButtons[0].href = socialLinks.instagram;
socialButtons[1].href = socialLinks.facebook;
socialButtons[2].href = socialLinks.tiktok;


/* Open links in a new tab */

socialButtons.forEach(function(button) {
    button.target = "_blank";
    button.rel = "noopener noreferrer";
});

/* =========================
   NAVBAR SCROLL
========================= */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});

/* =========================
   HAMBURGER MENU
========================= */

function toggleMenu() {
    const menu = document.getElementById("navLinks");
    const button = document.querySelector(".menu-btn");

    menu.classList.toggle("active");
    button.classList.toggle("active");
}


/* =========================
   MENU DROPDOWN
========================= */

function toggleMenuDropdown() {

    const dropdown = document.getElementById("menuDropdown");

    dropdown.classList.toggle("active");
}

/* =========================
   EAT SECTION SCROLL ANIMATION
========================= */

const eatSection = document.querySelector(".eat-section");

const eatObserver = new IntersectionObserver(
    function(entries) {

        entries.forEach(function(entry) {

            if (entry.isIntersecting) {
                eatSection.classList.add("show");
            }

        });

    },
    {
        threshold: 0.25
    }
);

if (eatSection) {
    eatObserver.observe(eatSection);
}


function selectMenu(name, image, link) {

    const menuImage = document.getElementById("menuImage");
    const menuLink = document.getElementById("menuLink");
    const selectedMenu = document.getElementById("selectedMenu");
    const dropdown = document.getElementById("menuDropdown");

    /* Change image */
    menuImage.src = image;

    /* Change image link */
    menuLink.href = link;

    /* Change selected menu text */
    selectedMenu.textContent = name;

    /* Close dropdown */
    dropdown.classList.remove("active");
}

