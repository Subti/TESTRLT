const modeToggleButton = document.getElementById('lightDarkMode');
const modeIcon = document.getElementById('modeIcon');
const modeLabel = document.getElementById('modeLabel');

let isLightMode = true; // Initially set to light mode

modeToggleButton.addEventListener('click', () => {
  // Toggle the CSS classes on all elements with 'light-mode' or 'dark-mode' classes
  const elementsWithModeClass = document.querySelectorAll('.light-mode, .dark-mode');
  elementsWithModeClass.forEach((element) => {
    element.classList.toggle('light-mode', !isLightMode);
    element.classList.toggle('dark-mode', isLightMode);
  });

  // Toggle the mode variable
  isLightMode = !isLightMode;

  // Update the SVG icon source and button label based on the mode
  modeIcon.src = isLightMode ? '/assets/toggle_off.png' : '/assets/toggle_on.png';
  modeLabel.textContent = isLightMode ? 'Dark mode off' : 'Dark mode on';
});
