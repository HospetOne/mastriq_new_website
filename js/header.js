// ===== HEADER FUNCTIONALITY =====
function initHeader() {
  // Mega Menu Category Switching
  const categoryItems = document.querySelectorAll('.category-item');
  const dispensersSection = document.getElementById('dispensers-section');
  const mixersSection = document.getElementById('mixers-section');
  
  if (categoryItems.length) {
    categoryItems.forEach(item => {
      item.addEventListener('click', () => {
        const category = item.dataset.category;
        categoryItems.forEach(cat => cat.classList.remove('active'));
        item.classList.add('active');
        
        if (category === 'dispensers') {
          if (dispensersSection) dispensersSection.classList.add('active');
          if (mixersSection) mixersSection.classList.remove('active');
        } else if (category === 'mixers') {
          if (mixersSection) mixersSection.classList.add('active');
          if (dispensersSection) dispensersSection.classList.remove('active');
        }
      });
    });
  }
  
  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const navItems = document.querySelectorAll('.nav-item');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      menuToggle.textContent = nav.classList.contains('open') ? '✖' : '☰';
    });
  }
  
  // Mobile Mega Menu Toggle - FIXED: Changed '> a' to 'a' or use proper selector
  navItems.forEach(item => {
    const link = item.querySelector('a'); // Fixed: removed '> a' which was invalid
    if (link && window.innerWidth <= 900) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        item.classList.toggle('active');
      });
    }
  });
  
  // Close menu on link click
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 900 && nav) {
        nav.classList.remove('open');
        if (menuToggle) menuToggle.textContent = '☰';
      }
    });
  });
}

// Initialize header when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeader);
} else {
  initHeader();
}