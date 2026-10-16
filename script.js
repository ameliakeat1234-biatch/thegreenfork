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
    button.textContent = "☰";

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
    const button = document.getElementById("menuDropdownButton");

    if (!dropdown || !button) return;

    const isOpen = dropdown.classList.toggle("active");

    button.setAttribute("aria-expanded", String(isOpen));
}

document.addEventListener("click", function (event) {
    const dropdown = document.getElementById("menuDropdown");
    const button = document.getElementById("menuDropdownButton");

    if (!dropdown || !button) return;

    // Close if the user clicks outside the dropdown and button
    if (
        !dropdown.contains(event.target) &&
        !button.contains(event.target)
    ) {
        dropdown.classList.remove("active");
        button.setAttribute("aria-expanded", "false");
    }
});


/* =========================
   EAT SECTION SCROLL ANIMATION
========================= */

const eatSection = document.querySelector(".eat-section");

if (eatSection && "IntersectionObserver" in window) {
    const eatObserver = new IntersectionObserver(
        function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    eatSection.classList.add("show");
                    eatObserver.unobserve(eatSection);
                }
            });
        },
        { threshold: 0.25 }
    );

    eatObserver.observe(eatSection);
}



/* =========================
   MENU CATEGORY FILTERS
========================= */

document.addEventListener("DOMContentLoaded", function () {
    const menu = document.querySelector(".breakfast-menu");

    // Only run on the breakfast menu page
    if (!menu) return;

    const filterButtons = menu.querySelectorAll(".filter-button");
    const menuColumns = menu.querySelector(".menu-columns");
    const categories = menu.querySelectorAll(".menu-category");
    const drinksCategory = menu.querySelector(".drinks-category");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const selectedFilter = button.dataset.filter;

            filterButtons.forEach(filterButton => {
                const isActive = filterButton === button;

                filterButton.classList.toggle("active", isActive);
                filterButton.setAttribute("aria-pressed", String(isActive));
            });

            categories.forEach(category => {
                const categoryName = category.dataset.category;

                const shouldShow =
                    selectedFilter === "all" ||
                    categoryName === selectedFilter;

                category.hidden = !shouldShow;
            });

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

    /* ALLERGEN GUIDE TOGGLE */

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


function selectMenu(title, image, link) {
    const index = menuSlides.findIndex(
        slide => slide.title === title
    );

    if (index !== -1) {
        currentSlide = index;
    } else {
        const customIndex = menuSlides.findIndex(
            slide => slide.image === image && slide.link === link
        );

        if (customIndex !== -1) {
            currentSlide = customIndex;
        }
    }

    displayMenuSlide(currentSlide);

    const dropdown = document.getElementById("menuDropdown");
    const button = document.getElementById("menuDropdownButton");

    if (dropdown) dropdown.classList.remove("active");

    if (button) {
        button.setAttribute("aria-expanded", "false");
    }

    startMenuSlideshow();
}


/* =========================
   MENU IMAGE SLIDESHOW
========================= */

const menuSlides = [
    {
        title: "BREAKFAST & BRUNCH",
        image: "images/breakfast-img.jpg",
        link: "breakfast.html"
    },
    {
        title: "À LA CARTE",
        image: "images/a-la-carte.webp",
        link: "a-la-carte.html"
    },
    {
        title: "LUNCH",
        image: "images/lunch.jpg",
        link: "lunch.html"
    },
    {
        title: "DRINKS",
        image: "images/drinks.jpg",
        link: "drinks.html"
    },
    {
        title: "BAKERY & DESSERTS",
        image: "images/bakery.webp",
        link: "bakery.html"
    },
    {
        title: "SUNDAY CARVERY",
        image: "images/carvary.jpg",
        link: "sunday-lunch.html"
    }
];

let currentSlide = 0;
let menuSlideshow = null;

function displayMenuSlide(index) {
    const menuImage = document.getElementById("menuImage");
    const menuLink = document.getElementById("menuLink");
    const menuTitle = document.getElementById("menuImageTitle");
    const selectedMenu = document.getElementById("selectedMenu");

    if (!menuImage || !menuLink) return;

    const slide = menuSlides[index];

    menuImage.src = slide.image;
    menuImage.alt = slide.title + " menu";
    menuLink.href = slide.link;

    if (menuTitle) {
        menuTitle.textContent = slide.title;
    }

    if (selectedMenu) {
        selectedMenu.textContent = slide.title;
    }
}


function showNextMenu() {
    currentSlide = (currentSlide + 1) % menuSlides.length;
    displayMenuSlide(currentSlide);
}

function startMenuSlideshow() {
    clearInterval(menuSlideshow);

    menuSlideshow = setInterval(showNextMenu, 5000);
}

document.addEventListener("DOMContentLoaded", function () {
    const menuImage = document.getElementById("menuImage");
    const dropdown = document.getElementById("menuDropdown");

    if (!menuImage || !dropdown) return;

    // Connect each dropdown heading to the image and destination
    dropdown.querySelectorAll("a[data-title]").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            selectMenu(
                this.dataset.title,
                this.dataset.image,
                this.dataset.link
            );
        });
    });

    // Start the slideshow
    startMenuSlideshow();
});
