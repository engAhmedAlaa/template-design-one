// Global Variables
// Burger Menu
const burgerMenu = document.querySelector('.burger-icon');
// Second Span In The Burger Menu
const secondSpan = burgerMenu.querySelectorAll('span')[1];
// Links List
const linksList = document.querySelector('.links');
// Scroll To Top Button
const toTopButton = document.querySelector('.up');

// Main Function
// Showing And Hidding The Scroll To Top Button
function scrollToTopControl() {
    if (window.scrollY >= 1000) {
        toTopButton.classList.add('show');
    } else {
        toTopButton.classList.remove('show');
    }
}

// Events
// Event To Show Links List When Clicking And Adding Active Classes
burgerMenu.addEventListener('click', () => {
    linksList.classList.toggle('show');
    burgerMenu.classList.toggle('active');
    secondSpan.classList.toggle('active');
});

// Event Showing and Hidding The Scroll To Top Button
window.onscroll = () => {
    scrollToTopControl();
};

// Scrolling to Top On Clicking
toTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0 });
});
