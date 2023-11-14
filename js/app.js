// Global Variables
// Dropdown
const dropdown = document.getElementById('dropdown');

// Dropdown Trigger
const dropdownTrigger = dropdown.querySelector('.dropdown-trigger');

// Dropdown Menu
const dropdownMenu = dropdown.querySelector('.dropdown-menu');

// Dropdown Links
const dropdownLinks = dropdownMenu.querySelectorAll('.dropdown-link');

// sections
const sections = [...document.querySelectorAll('section[data-state]')];

// Scroll To Top Button
const scrollToTopButton = document.getElementById('scroll-to-top-button');

let dropdownTimeoutId;

// Main Functions
// Showing And Hiding The Scroll To Top Button
function scrollToTopButtonControl() {
  if (window.scrollY >= 1000) {
    scrollToTopButton.classList.add('show');
  } else {
    scrollToTopButton.classList.remove('show');
  }
}

// Open Dropdown Menu
function openDropdownMenu() {
  clearTimeout(dropdownTimeoutId);
  dropdownTrigger.setAttribute('data-state', 'open');
  dropdownTrigger.setAttribute('aria-expanded', 'true');
  dropdownMenu.setAttribute('data-state', 'open');
  dropdownMenu.classList.remove('closed');
}

// Close Dropdown Menu
function closeDropdownMenu() {
  dropdownTrigger.setAttribute('data-state', 'closed');
  dropdownTrigger.setAttribute('aria-expanded', 'false');
  dropdownMenu.setAttribute('data-state', 'closed');
  dropdownTimeoutId = setTimeout(() => {
    dropdownMenu.classList.add('closed');
  }, 350);
}

// Show Section On Appearing
function appearSections() {
  sections.forEach((section) => {
    const isHalfBased =
      window.innerHeight * 0.5 > section.getBoundingClientRect().top;
    if (isHalfBased) {
      section.setAttribute('data-state', 'appeared');
    }
  });
  const isAllAppeared = sections.every(
    (section) => section.getAttribute('data-state') === 'appeared'
  );
  if (isAllAppeared) window.removeEventListener('scroll', appearSections);
}

// function Add Current Year To Footer
function addYearToFooter() {
  const footerYear = document.getElementById('year');
  const date = new Date();
  const year = date.getFullYear();
  footerYear.textContent = year;
}
addYearToFooter();

// Events
// Event To Open And Close Dropdown Menu on Clicking
dropdownTrigger.addEventListener('click', () => {
  if (dropdownTrigger.getAttribute('data-state') === 'closed')
    openDropdownMenu();
  else closeDropdownMenu();
});

dropdownLinks.forEach((link) =>
  link.addEventListener('click', (event) => {
    event.preventDefault();
    closeDropdownMenu();
    const section = sections.find(
      (section) => section.id === link.getAttribute('data-state')
    );
    section.scrollIntoView();
  })
);

document.addEventListener('click', function (event) {
  if (
    dropdownMenu.getAttribute('data-state') === 'open' &&
    !dropdown.contains(event.target)
  ) {
    closeDropdownMenu();
  }
});

// Scrolling to Top On Clicking
scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0 });
});

// Event Showing and Hiding The Scroll To Top Button
window.addEventListener('scroll', scrollToTopButtonControl);

// Event Showing sections and Hiding The Scroll To Top Button
window.addEventListener('scroll', appearSections);
