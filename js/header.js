// ===== HEADER FUNCTIONALITY - FIXED =====
function initHeader() {
  // Mega Menu Category Switching
  const categoryItems = document.querySelectorAll('.category-item');
  const dispensersSection = document.getElementById('dispensers-section');
  const mixersSection = document.getElementById('mixers-section');
  
  if (categoryItems.length) {
    categoryItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
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
  
  // Create overlay for mobile menu
  let overlay = document.querySelector('.menu-overlay');
  if (!overlay && window.innerWidth <= 768) {
    overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);
  }
  
  function closeMobileMenu() {
    if (nav) nav.classList.remove('open');
    if (menuToggle) menuToggle.textContent = '☰';
    if (overlay) overlay.classList.remove('active');
  }
  
  function openMobileMenu() {
    if (nav) nav.classList.add('open');
    if (menuToggle) menuToggle.textContent = '✖';
    if (overlay) overlay.classList.add('active');
  }
  
  if (menuToggle) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (nav.classList.contains('open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }
  
  // Close menu when clicking overlay
  if (overlay) {
    overlay.addEventListener('click', closeMobileMenu);
  }
  
  // Mobile Mega Menu Toggle
  navItems.forEach(item => {
    const link = item.querySelector('a');
    if (link && window.innerWidth <= 768) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        // Close other open mega menus
        navItems.forEach(other => {
          if (other !== item && other.classList.contains('active')) {
            other.classList.remove('active');
          }
        });
        item.classList.toggle('active');
      });
    }
  });
  
  // Close menu on link click (except mega menu toggles on mobile)
  document.querySelectorAll('.nav > a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768 && link.getAttribute('href') !== '#products') {
        closeMobileMenu();
      }
    });
  });
  
  // Close menu when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && nav && nav.classList.contains('open')) {
      if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
        closeMobileMenu();
      }
    }
  });
  
  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.innerWidth > 768 && nav && nav.classList.contains('open')) {
        closeMobileMenu();
      }
      // Recreate overlay if needed
      const existingOverlay = document.querySelector('.menu-overlay');
      if (window.innerWidth <= 768 && !existingOverlay) {
        const newOverlay = document.createElement('div');
        newOverlay.className = 'menu-overlay';
        document.body.appendChild(newOverlay);
        newOverlay.addEventListener('click', closeMobileMenu);
      } else if (window.innerWidth > 768 && existingOverlay) {
        existingOverlay.remove();
      }
    }, 100);
  });
  
  // Prevent body scroll when mobile menu is open
  if (nav) {
    const observer = new MutationObserver(() => {
      if (nav.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
    observer.observe(nav, { attributes: true, attributeFilter: ['class'] });
  }
}

// Initialize header when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeader);
} else {
  initHeader();
}