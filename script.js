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


document.addEventListener("DOMContentLoaded", () => {

    const menu = document.querySelector(".breakfast-menu");

    if (!menu) return;

    // ======================================
    // MENU CATEGORY FILTERS
    // ======================================

    const filterButtons = menu.querySelectorAll(".filter-button");
    const menuColumns = menu.querySelector(".menu-columns");
    const categories = menu.querySelectorAll(".menu-category");
    const drinksCategory = menu.querySelector(".drinks-category");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const selectedFilter = button.dataset.filter;

            // Update active button and accessibility state
            filterButtons.forEach(filterButton => {
                const isActive = filterButton === button;

                filterButton.classList.toggle("active", isActive);
                filterButton.setAttribute(
                    "aria-pressed",
                    String(isActive)
                );
            });

            // Show or hide individual menu categories
            categories.forEach(category => {

                const categoryName = category.dataset.category;

                const shouldShow =
                    selectedFilter === "all" ||
                    categoryName === selectedFilter;

                category.hidden = !shouldShow;
            });

            // Avoid leaving an empty two-column area
            // when the customer selects Coffee & Drinks
            if (menuColumns) {
                menuColumns.hidden = selectedFilter === "drinks";
            }

            if (drinksCategory) {
                drinksCategory.hidden =
                    selectedFilter !== "all" &&
                    selectedFilter !== "drinks";
            }

        });

    });


    // ======================================
    // ALLERGEN GUIDE TOGGLE
    // ======================================

    const allergyToggle = menu.querySelector("#allergyToggle");
    const allergenGuide = menu.querySelector("#allergenGuide");

    if (allergyToggle && allergenGuide) {

        allergyToggle.addEventListener("click", () => {

            const isExpanded =
                allergyToggle.getAttribute("aria-expanded") === "true";

            allergyToggle.setAttribute(
                "aria-expanded",
                String(!isExpanded)
            );

            allergenGuide.hidden = isExpanded;

            allergyToggle.innerHTML = isExpanded
                ? 'View Allergen Guide <span>＋</span>'
                : 'Hide Allergen Guide <span>−</span>';

        });

    }

});
