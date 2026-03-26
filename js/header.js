// ===== HEADER FUNCTIONALITY - FIXED =====
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
  
  // Make initHeader globally available
  window.initHeader = function() {
    console.log('initHeader called');
    
    // Wait a bit for DOM to be fully ready
    setTimeout(() => {
      const menuToggle = document.querySelector('.menu-toggle');
      const nav = document.querySelector('.nav');
      
      console.log('Searching for elements...');
      console.log('menuToggle:', menuToggle);
      console.log('nav:', nav);
      
      if (!menuToggle) {
        console.error('Menu toggle not found!');
        return;
      }
      
      if (!nav) {
        console.error('Nav not found!');
        return;
      }
      
      console.log('Menu toggle found:', menuToggle);
      console.log('Nav found:', nav);
      
      // Remove any existing event listeners by replacing the button
      const newToggle = menuToggle.cloneNode(true);
      menuToggle.parentNode.replaceChild(newToggle, menuToggle);
      const finalToggle = document.querySelector('.menu-toggle');
      
      // Add click event to new button
      finalToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('Menu toggle CLICKED!');
        
        if (nav.classList.contains('open')) {
          console.log('Closing menu');
          closeMobileMenu();
        } else {
          console.log('Opening menu');
          createOverlay();
          openMobileMenu();
        }
      });
      
      // Handle Products link on mobile
      const productsLink = document.querySelector('.nav-item > a');
      if (productsLink) {
        productsLink.addEventListener('click', function(e) {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            e.stopPropagation();
            const parent = this.parentElement;
            parent.classList.toggle('active');
            console.log('Products toggled:', parent.classList.contains('active'));
          }
        });
      }
      
      // Close menu when clicking nav links (except products)
      document.querySelectorAll('.nav > a').forEach(link => {
        link.addEventListener('click', function() {
          if (window.innerWidth <= 768 && this.getAttribute('href') !== '#') {
            closeMobileMenu();
          }
        });
      });
      
      // Handle category switching
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
      
      // Set active menu based on current page
      const currentPath = window.location.pathname;
      document.querySelectorAll('.nav > a, .nav-item > a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href !== '#' && currentPath.includes(href)) {
          link.classList.add('active');
        }
      });
      
      console.log('Header initialized successfully');
    }, 100);
  };
  
  // Auto-initialize if DOM is already ready
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