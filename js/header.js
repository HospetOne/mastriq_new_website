// ===== HEADER FUNCTIONALITY - COMPLETE FIX =====
(function() {
  'use strict';
  
  let overlay = null;
  
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
    
    // Mobile Menu Elements
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const navItems = document.querySelectorAll('.nav-item');
    
    // Create overlay for mobile menu
    function createOverlay() {
      if (!overlay && window.innerWidth <= 768) {
        overlay = document.createElement('div');
        overlay.className = 'menu-overlay';
        document.body.appendChild(overlay);
      }
    }
    
    function removeOverlay() {
      if (overlay && overlay.parentNode) {
        overlay.remove();
        overlay = null;
      }
    }
    
    function closeMobileMenu() {
      if (nav) {
        nav.classList.remove('open');
        if (menuToggle) menuToggle.textContent = '☰';
      }
      if (overlay) overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
    
    function openMobileMenu() {
      if (nav) {
        nav.classList.add('open');
        if (menuToggle) menuToggle.textContent = '✖';
      }
      if (overlay) overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    
    // Toggle mobile menu
    if (menuToggle) {
      menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        if (nav.classList.contains('open')) {
          closeMobileMenu();
        } else {
          createOverlay();
          openMobileMenu();
        }
      });
    }
    
    // Mobile Mega Menu Toggle
    navItems.forEach(item => {
      const link = item.querySelector('a');
      if (link) {
        link.addEventListener('click', (e) => {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            e.stopPropagation();
            // Close other open mega menus
            navItems.forEach(other => {
              if (other !== item && other.classList.contains('active')) {
                other.classList.remove('active');
              }
            });
            item.classList.toggle('active');
          }
        });
      }
    });
    
    // Close menu when clicking overlay
    if (overlay) {
      overlay.addEventListener('click', closeMobileMenu);
    }
    
    // Close menu when clicking nav links (except product menu)
    document.querySelectorAll('.nav > a').forEach(link => {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && link.getAttribute('href') !== '#') {
          closeMobileMenu();
        }
      });
    });
    
    // Close menu when clicking outside
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
        if (window.innerWidth > 768) {
          if (nav && nav.classList.contains('open')) {
            closeMobileMenu();
          }
          removeOverlay();
          // Reset mobile mega menu states
          navItems.forEach(item => {
            item.classList.remove('active');
          });
        } else {
          createOverlay();
        }
      }, 100);
    });
    
    // Set active menu based on current page
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav > a, .nav-item > a').forEach(link => {
      const href = link.getAttribute('href');
      if (href && href !== '#' && currentPath.includes(href)) {
        link.classList.add('active');
      }
    });
    
    createOverlay();
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeader);
  } else {
    initHeader();
  }
})();