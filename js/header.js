// ===== HEADER FUNCTIONALITY - FULLY FIXED FOR MOBILE =====
(function() {
  'use strict';
  
  let overlay = null;
  let isMobile = false;
  
  function checkMobile() {
    return window.innerWidth <= 768;
  }
  
  function createOverlay() {
    if (!overlay && checkMobile()) {
      overlay = document.createElement('div');
      overlay.className = 'menu-overlay';
      document.body.appendChild(overlay);
      
      overlay.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        closeMobileMenu();
      });
    }
  }
  
  function removeOverlay() {
    if (overlay && overlay.parentNode) {
      overlay.removeEventListener('click', closeMobileMenu);
      overlay.remove();
      overlay = null;
    }
  }
  
  function closeMobileMenu() {
    const nav = document.querySelector('.nav');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (nav) {
      nav.classList.remove('open');
      if (menuToggle) menuToggle.textContent = '☰';
      document.body.style.overflow = '';
    }
    if (overlay) {
      overlay.classList.remove('active');
    }
  }
  
  function openMobileMenu() {
    const nav = document.querySelector('.nav');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (nav) {
      nav.classList.add('open');
      if (menuToggle) menuToggle.textContent = '✖';
      document.body.style.overflow = 'hidden';
    }
    if (overlay) {
      overlay.classList.add('active');
    }
  }
  
  function initHeader() {
    // Mega Menu Category Switching
    const categoryItems = document.querySelectorAll('.category-item');
    const dispensersSection = document.getElementById('dispensers-section');
    const mixersSection = document.getElementById('mixers-section');
    
    if (categoryItems.length) {
      categoryItems.forEach(item => {
        item.removeEventListener('click', handleCategoryClick);
        item.addEventListener('click', handleCategoryClick);
        
        function handleCategoryClick(e) {
          e.preventDefault();
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
        }
      });
    }
    
    // Mobile Menu Elements
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const navItems = document.querySelectorAll('.nav-item');
    
    // Toggle mobile menu
    if (menuToggle) {
      menuToggle.removeEventListener('click', toggleMenu);
      menuToggle.addEventListener('click', toggleMenu);
      
      function toggleMenu(e) {
        e.preventDefault();
        e.stopPropagation();
        if (nav.classList.contains('open')) {
          closeMobileMenu();
        } else {
          createOverlay();
          openMobileMenu();
        }
      }
    }
    
    // Mobile Mega Menu Toggle - CRITICAL FIX
    navItems.forEach(item => {
      const link = item.querySelector('a');
      if (link) {
        link.removeEventListener('click', handleMobileMegaMenu);
        link.addEventListener('click', handleMobileMegaMenu);
        
        function handleMobileMegaMenu(e) {
          if (checkMobile()) {
            e.preventDefault();
            e.stopPropagation();
            
            // Close other open mega menus
            navItems.forEach(other => {
              if (other !== item && other.classList.contains('active')) {
                other.classList.remove('active');
              }
            });
            
            // Toggle current
            item.classList.toggle('active');
          }
        }
      }
    });
    
    // Close menu when clicking nav links (except product menu)
    document.querySelectorAll('.nav > a').forEach(link => {
      link.removeEventListener('click', handleNavLinkClick);
      link.addEventListener('click', handleNavLinkClick);
      
      function handleNavLinkClick(e) {
        const href = link.getAttribute('href');
        if (checkMobile() && href && href !== '#' && href !== '#products') {
          closeMobileMenu();
        }
      }
    });
    
    // Close menu when clicking outside
    document.removeEventListener('click', handleOutsideClick);
    document.addEventListener('click', handleOutsideClick);
    
    function handleOutsideClick(e) {
      if (checkMobile() && nav && nav.classList.contains('open')) {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
          closeMobileMenu();
        }
      }
    }
    
    // Handle window resize
    let resizeTimer;
    window.removeEventListener('resize', handleResize);
    window.addEventListener('resize', handleResize);
    
    function handleResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        isMobile = checkMobile();
        
        if (!isMobile) {
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
    }
    
    // Set active menu based on current page
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav > a, .nav-item > a').forEach(link => {
      const href = link.getAttribute('href');
      if (href && href !== '#' && currentPath.includes(href)) {
        link.classList.add('active');
      }
    });
    
    // Initial setup
    createOverlay();
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeader);
  } else {
    initHeader();
  }
})();