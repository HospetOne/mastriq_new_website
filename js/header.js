// ===== HEADER FUNCTIONALITY - WORKING SUBMENU =====
(function() {
  'use strict';
  
  let overlay = null;
  
  function closeMobileMenu() {
    const nav = document.querySelector('.nav');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (nav) {
      nav.classList.remove('open');
      if (menuToggle) menuToggle.innerHTML = '☰';
      document.body.style.overflow = '';
      document.body.style.position = '';
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
      if (menuToggle) menuToggle.innerHTML = '✖';
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
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
  
  window.initHeader = function() {
    console.log('initHeader called');
    
    setTimeout(() => {
      const menuToggle = document.querySelector('.menu-toggle');
      const nav = document.querySelector('.nav');
      
      if (!menuToggle || !nav) {
        console.error('Header elements not found!');
        return;
      }
      
      console.log('Elements found - initializing...');
      
      // Setup menu toggle click
      const newToggle = menuToggle.cloneNode(true);
      menuToggle.parentNode.replaceChild(newToggle, menuToggle);
      const finalToggle = document.querySelector('.menu-toggle');
      
      finalToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (nav.classList.contains('open')) {
          closeMobileMenu();
        } else {
          createOverlay();
          openMobileMenu();
        }
      });
      
      // Handle Products link on mobile - IMPORTANT for submenu
      const productsLink = document.querySelector('.nav-item > a');
      if (productsLink) {
        // Remove any existing listeners
        const newProductsLink = productsLink.cloneNode(true);
        productsLink.parentNode.replaceChild(newProductsLink, productsLink);
        const finalProductsLink = document.querySelector('.nav-item > a');
        
        finalProductsLink.addEventListener('click', function(e) {
          // Only on mobile
          if (window.innerWidth <= 768) {
            e.preventDefault();
            e.stopPropagation();
            const parentItem = this.closest('.nav-item');
            if (parentItem) {
              parentItem.classList.toggle('active');
              console.log('Products toggled:', parentItem.classList.contains('active'));
            }
          }
        });
      }
      
      // Close menu when clicking other nav links
      document.querySelectorAll('.nav > a').forEach(link => {
        link.addEventListener('click', function() {
          if (window.innerWidth <= 768 && this.getAttribute('href') !== '#') {
            closeMobileMenu();
          }
        });
      });
      
      // Handle category switching in mega menu
      const categoryItems = document.querySelectorAll('.category-item');
      const dispensersSection = document.getElementById('dispensers-section');
      const mixersSection = document.getElementById('mixers-section');
      
      categoryItems.forEach(item => {
        item.addEventListener('click', function(e) {
          e.preventDefault();
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
      
      // Handle window resize
      let resizeTimer;
      window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
          if (window.innerWidth > 768) {
            closeMobileMenu();
            removeOverlay();
            document.querySelectorAll('.nav-item').forEach(item => {
              item.classList.remove('active');
            });
          }
        }, 100);
      });
      
      console.log('Header initialized successfully');
    }, 100);
  };
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      if (typeof window.initHeader === 'function') {
        window.initHeader();
      }
    });
  } else {
    if (typeof window.initHeader === 'function') {
      window.initHeader();
    }
  }
})();