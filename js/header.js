// ===== HEADER FUNCTIONALITY - COMPLETE FIX FOR MOBILE =====
(function() {
  'use strict';
  
  let overlay = null;
  
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
  
  function createOverlay() {
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'menu-overlay';
      document.body.appendChild(overlay);
      overlay.addEventListener('click', closeMobileMenu);
    }
  }
  
  function removeOverlay() {
    if (overlay) {
      overlay.removeEventListener('click', closeMobileMenu);
      overlay.remove();
      overlay = null;
    }
  }
  
  function initHeader() {
    // Mega Menu Category Switching
    const categoryItems = document.querySelectorAll('.category-item');
    const dispensersSection = document.getElementById('dispensers-section');
    const mixersSection = document.getElementById('mixers-section');
    
    if (categoryItems.length) {
      categoryItems.forEach(item => {
        item.addEventListener('click', function(e) {
          e.preventDefault();
          e.stopPropagation();
          const category = this.dataset.category;
          categoryItems.forEach(cat => cat.classList.remove('active'));
          this.classList.add('active');
          
          if (category === 'dispensers' && dispensersSection && mixersSection) {
            dispensersSection.classList.add('active');
            mixersSection.classList.remove('active');
          } else if (category === 'mixers' && dispensersSection && mixersSection) {
            mixersSection.classList.add('active');
            dispensersSection.classList.remove('active');
          }
        });
      });
    }
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    const navItems = document.querySelectorAll('.nav-item');
    
    if (menuToggle && nav) {
      menuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (nav.classList.contains('open')) {
          closeMobileMenu();
        } else {
          createOverlay();
          openMobileMenu();
        }
      });
    }
    
    // Mobile Mega Menu Toggle - Products Link
    const productsLink = document.querySelector('.nav-item > a');
    if (productsLink) {
      productsLink.addEventListener('click', function(e) {
        // Check if mobile view
        if (window.innerWidth <= 768) {
          e.preventDefault();
          e.stopPropagation();
          const parentItem = this.parentElement;
          parentItem.classList.toggle('active');
        }
      });
    }
    
    // Close menu when clicking nav links (except products)
    const navLinks = document.querySelectorAll('.nav > a');
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && this.getAttribute('href') !== '#') {
          closeMobileMenu();
        }
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (window.innerWidth <= 768 && nav && nav.classList.contains('open')) {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
          closeMobileMenu();
        }
      }
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
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
    
    // Initial setup
    if (window.innerWidth <= 768) {
      createOverlay();
    }
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeader);
  } else {
    initHeader();
  }
})();