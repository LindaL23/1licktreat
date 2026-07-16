const menuToggle = document.querySelector(".menu-toggle");
const menuOverlay = document.querySelector(".menu-overlay");
const navLinks = document.querySelectorAll(".nav-links a");

function openMenu() {
    document.body.classList.add("menu-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");
}

function closeMenu() {
    document.body.classList.remove("menu-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
}

function toggleMenu() {
    const menuIsOpen = document.body.classList.contains("menu-open");

    if (menuIsOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}

menuToggle.addEventListener("click", toggleMenu);

menuOverlay.addEventListener("click", closeMenu);

navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeMenu();
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 1023) {
        closeMenu();
    }
});