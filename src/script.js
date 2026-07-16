const menuToggle = document.querySelector(".menu-toggle");
const menuOverlay = document.querySelector(".menu-overlay");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("header[id], section[id]");
const orderButtons = document.querySelectorAll(".card-button");
const orderNotification = document.querySelector(".order-notification");
const currentYear = document.querySelector("#current-year");

let notificationTimer;

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

function updateActiveNavigation() {
    let currentSectionId = "home";

    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 160;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {
            currentSectionId = section.id;
        }
    });

    navLinks.forEach((link) => {
        const targetId = link.getAttribute("href").replace("#", "");

        link.classList.toggle("active", targetId === currentSectionId);
    });
}

function showOrderNotification(productName) {
    if (!orderNotification) {
        return;
    }

    clearTimeout(notificationTimer);

    orderNotification.textContent =
        `${productName} has been added to your order enquiry.`;

    orderNotification.classList.add("show");

    notificationTimer = setTimeout(() => {
        orderNotification.classList.remove("show");
    }, 3000);
}

menuToggle?.addEventListener("click", toggleMenu);
menuOverlay?.addEventListener("click", closeMenu);

navLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
});

orderButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const productName = button.dataset.product || "Product";

        showOrderNotification(productName);

        const originalText = button.textContent;

        button.textContent = "Added";
        button.disabled = true;

        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
        }, 1800);
    });
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

window.addEventListener("scroll", updateActiveNavigation, {
    passive: true
});

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

updateActiveNavigation();