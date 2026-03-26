// ===== HEADER FUNCTIONALITY - WITH ACTIVE MENU =====
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
  
  // Function to set active menu based on current page
  function setActiveMenuItem() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    // Remove all active classes first
    document.querySelectorAll('.nav > a, .nav-item > a').forEach(link => {
      link.classList.remove('active');
    });
    
    // Remove active class from mega product items
    document.querySelectorAll('.mega-product-item').forEach(item => {
      item.classList.remove('active-product');
    });
    
    // Set active for regular navigation links
    const navLinks = document.querySelectorAll('.nav > a');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && (currentPage === href || 
          (currentPage === '' && href === 'index.html') ||
          currentPath.endsWith(href))) {
        link.classList.add('active');
      }
    });
    
    // Check if we're on a product page
    const productPages = ['s45.html', 'm45.html', 'm45-sm.html', 'm60-beast.html', 'tm-manual.html', 
                          'vx1.html', 'mx1.html', 'mx2.html'];
    
    const isProductPage = productPages.some(page => currentPage === page);
    
    if (isProductPage) {
      // Add active class to Products link
      const productsLink = document.querySelector('.nav-item > a');
      if (productsLink) {
        productsLink.classList.add('active');
      }
      
      // Highlight the specific product in mega menu
      const megaItems = document.querySelectorAll('.mega-product-item');
      megaItems.forEach(item => {
        const itemHref = item.getAttribute('href');
        if (itemHref && currentPage === itemHref.split('/').pop()) {
          item.classList.add('active-product');
        }
      });
    }
  }
  
  window.initHeader = function() {
    setTimeout(() => {
      const menuToggle = document.querySelector('.menu-toggle');
      const nav = document.querySelector('.nav');
      const productsLink = document.querySelector('.nav-item > a');
      
      if (!menuToggle || !nav) {
        console.error('Header elements not found!');
        return;
      }
      
      // Setup menu toggle
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
      
      // Products link - toggle submenu only on mobile
      if (productsLink) {
        const newProductsLink = productsLink.cloneNode(true);
        productsLink.parentNode.replaceChild(newProductsLink, productsLink);
        const finalProductsLink = document.querySelector('.nav-item > a');
        
        finalProductsLink.addEventListener('click', function(e) {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            e.stopPropagation();
            const parentItem = this.closest('.nav-item');
            if (parentItem) {
              parentItem.classList.toggle('active');
            }
            return false;
          }
        });
      }
      
      // Regular navigation links
      const navLinks = document.querySelectorAll('.nav > a');
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href !== '#') {
          const newLink = link.cloneNode(true);
          link.parentNode.replaceChild(newLink, link);
          
          newLink.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
              e.preventDefault();
              closeMobileMenu();
              setTimeout(() => {
                window.location.href = href;
              }, 50);
            }
          });
        }
      });
      
      // Mega menu product links
      const megaLinks = document.querySelectorAll('.mega-product-item');
      megaLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
          const newLink = link.cloneNode(true);
          link.parentNode.replaceChild(newLink, link);
          
          newLink.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
              e.preventDefault();
              closeMobileMenu();
              setTimeout(() => {
                window.location.href = href;
              }, 50);
            }
          });
        }
      });
      
      // Category switching
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
      setActiveMenuItem();
      
      console.log('Header initialized successfully');
    }, 100);
  };
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.initHeader);
  } else {
    window.initHeader();
  }
})();