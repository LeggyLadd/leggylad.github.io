// Get all submenu buttons
const submenuButtons = document.querySelectorAll('.submenu-button');

// Add click event listeners to each button
submenuButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Hide all submenus except the one clicked
    submenuButtons.forEach(otherButton => {
      if (otherButton !== button) {
        const otherSubmenu = otherButton.nextElementSibling;
        otherSubmenu.style.display = 'none';
      }
    });

    // Toggle the display of the clicked submenu
    const submenu = button.nextElementSibling;
    submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
  });
});

// Get all submenu items
const submenuItems = document.querySelectorAll('.submenu-item');

// Add click event listeners to each submenu item
submenuItems.forEach(item => {
  item.addEventListener('click', () => {
    // Hide the parent submenu when a submenu item is clicked
    const submenu = item.closest('.submenu');
    if (submenu) {
      submenu.style.display = 'none';
    }
  });
});

// Add click event listener to the document to hide submenus and reset buttons
document.addEventListener('click', event => {
  // Check if the clicked element is not a submenu button or item
  if (!event.target.classList.contains('submenu-button') && !event.target.classList.contains('submenu-item')) {
    // Hide all submenus
    submenuButtons.forEach(button => {
      const submenu = button.nextElementSibling;
      submenu.style.display = 'none';
    });
  }
});

window.onbeforeunload = function() {
  // Clear your website's cache by reloading the page
  location.reload(true);
};
