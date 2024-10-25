// Access Sections and Navigation Container
const sections = document.querySelectorAll("main section");
const navList = document.getElementById("navbar__list");
const scrollToTopBtn = document.getElementById("scrollToTop");
let scrollTimeout;  // A variable to hold the timeout


// Build Navigation
sections.forEach(section => {
    const navItem = document.createElement("li");
    navItem.textContent = section.getAttribute("data-nav");
    navItem.dataset.target = section.id;
    navItem.classList.add("menu__link");

    navList.appendChild(navItem);
});

// Scroll to Section on Click
navList.addEventListener("click", event => {
    const targetSection = document.getElementById(event.target.dataset.target);
    if (targetSection) {
        event.preventDefault();
        targetSection.scrollIntoView({behavior: "smooth"});
    }
});

// Highlight Section in View
function makeActive() {
    sections.forEach(section => {
        const box = section.getBoundingClientRect();
        const navItem = document.querySelector(`[data-target='${section.id}']`);

        if (box.top <= 150 && box.bottom >= 150) {
            section.classList.add("active");
            navItem.classList.add("active");
        } else {
            section.classList.remove("active");
            navItem.classList.remove("active");
        }
    });
}

document.addEventListener("scroll", () => {
    makeActive();

    // Show/hide scroll to top button
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
});

// Scroll to Top Button functionality
scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({top: 0, behavior: "smooth"});
});


// Function to hide the navbar
function hideNavbar() {
    navList.style.opacity = "0"; // Hide the navbar
}

// Listen for scroll events
document.addEventListener("scroll", () => {
    // Show the navbar when scrolling starts
    navList.style.opacity = "1"; // Make sure it's visible

    // Clear any previous timeout to reset the 3-second countdown
    clearTimeout(scrollTimeout);

    // Start a new timeout to hide the navbar after 3 seconds of inactivity
    scrollTimeout = setTimeout(hideNavbar, 3000); // 3 seconds
});
