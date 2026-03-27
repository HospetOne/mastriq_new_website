// ===== HEADER FUNCTIONALITY - COMPLETE FIXED =====
(function() {
  'use strict';
  
  let overlay = null;
  
  function closeMobileMenu() {
    console.log('🔴 closeMobileMenu() called');
    const nav = document.querySelector('.nav');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (nav) {
      nav.classList.remove('open');
      if (menuToggle) menuToggle.innerHTML = '☰';
      document.body.style.overflow = '';
      document.body.style.position = '';
      console.log('✅ Menu closed, nav classes:', nav.className);
      console.log('  - left position:', window.getComputedStyle(nav).left);
    }
    if (overlay) {
      overlay.classList.remove('active');
    }
  }
  
  function openMobileMenu() {
    console.log('🟢 openMobileMenu() called');
    const nav = document.querySelector('.nav');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (nav) {
      console.log('  - Before adding class, nav classes:', nav.className);
      nav.classList.add('open');
      console.log('  - After adding class, nav classes:', nav.className);
      console.log('  - Does nav have "open"?', nav.classList.contains('open'));
      
      if (menuToggle) menuToggle.innerHTML = '✖';
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      
      // Force check the left position after adding class
      setTimeout(() => {
        const leftPos = window.getComputedStyle(nav).left;
        console.log('  - Left position after open:', leftPos);
      }, 50);
    }
    if (overlay) {
      overlay.classList.add('active');
    }
  }
  
  function createOverlay() {
    if (!overlay) {
      console.log('📱 Creating overlay');
      overlay = document.createElement('div');
      overlay.className = 'menu-overlay';
      document.body.appendChild(overlay);
      overlay.addEventListener('click', function() {
        console.log('📱 Overlay clicked - closing menu');
        closeMobileMenu();
      });
    }
  }
  
  function removeOverlay() {
    if (overlay) {
      console.log('🗑️ Removing overlay');
      overlay.removeEventListener('click', closeMobileMenu);
      overlay.remove();
      overlay = null;
    }
  }
  
  // Function to set active menu based on current page
  function setActiveMenuItem() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav > a, .nav-item > a').forEach(link => {
      link.classList.remove('active');
    });
    
    document.querySelectorAll('.mega-product-item').forEach(item => {
      item.classList.remove('active-product');
    });
    
    const navLinks = document.querySelectorAll('.nav > a');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && (currentPage === href || 
          (currentPage === '' && href === 'index.html') ||
          currentPath.endsWith(href))) {
        link.classList.add('active');
        console.log('Active link:', href);
      }
    });
    
    const productPages = ['s45.html', 'm45.html', 'm45-sm.html', 'm60-beast.html', 'tm-manual.html', 
                          'vx1.html', 'mx1.html', 'mx2.html'];
    
    const isProductPage = productPages.some(page => currentPage === page);
    
    if (isProductPage) {
      const productsLink = document.querySelector('.nav-item > a');
      if (productsLink) {
        productsLink.classList.add('active');
        console.log('Products link active (product page)');
      }
      
      const megaItems = document.querySelectorAll('.mega-product-item');
      megaItems.forEach(item => {
        const itemHref = item.getAttribute('href');
        if (itemHref && currentPage === itemHref.split('/').pop()) {
          item.classList.add('active-product');
          console.log('Active product in menu:', itemHref);
        }
      });
    }
  }
  
  window.initHeader = function() {
    console.log('🚀 initHeader() started - Mobile Debug Mode');
    
    setTimeout(() => {
      const menuToggle = document.querySelector('.menu-toggle');
      const nav = document.querySelector('.nav');
      const productsLink = document.querySelector('.nav-item > a');
      
      console.log('🔍 Debug Info:');
      console.log('  - menuToggle found:', menuToggle);
      console.log('  - nav found:', nav);
      console.log('  - productsLink found:', productsLink);
      console.log('  - window.innerWidth:', window.innerWidth);
      
      if (!menuToggle || !nav) {
        console.error('❌ ERROR: Header elements not found!');
        return;
      }
      
      // REMOVE ANY EXISTING EVENT LISTENERS - Direct assignment
      menuToggle.onclick = null;
      menuToggle.ontouchstart = null;
      
      // Add click handler
      menuToggle.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🎯 MENU TOGGLE CLICKED (onclick)!');
        console.log('  - Current nav classes:', nav.className);
        
        if (nav.classList.contains('open')) {
          closeMobileMenu();
        } else {
          createOverlay();
          openMobileMenu();
        }
        return false;
      };
      
      // Add touch handler for mobile
      menuToggle.ontouchstart = function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🎯 MENU TOGGLE TOUCH START!');
        console.log('  - Current nav classes:', nav.className);
        
        if (nav.classList.contains('open')) {
          closeMobileMenu();
        } else {
          createOverlay();
          openMobileMenu();
        }
        return false;
      };
      
      // Products link - toggle submenu only on mobile
      if (productsLink) {
        productsLink.onclick = function(e) {
          console.log('📦 PRODUCTS LINK CLICKED!');
          console.log('  - Window width:', window.innerWidth);
          
          if (window.innerWidth <= 768) {
            e.preventDefault();
            e.stopPropagation();
            const parentItem = this.closest('.nav-item');
            if (parentItem) {
              parentItem.classList.toggle('active');
              console.log('  - Products submenu toggled:', parentItem.classList.contains('active'));
            }
            return false;
          }
        };
      }
      
      // Regular navigation links
      const navLinks = document.querySelectorAll('.nav > a');
      console.log('🔗 Found', navLinks.length, 'direct navigation links');
      
      navLinks.forEach((link, index) => {
        const href = link.getAttribute('href');
        console.log(`  - Link ${index + 1}: href="${href}", text="${link.textContent}"`);
        
        if (href && href !== '#') {
          link.onclick = function(e) {
            console.log(`🔗 LINK CLICKED: "${this.textContent}" -> "${this.getAttribute('href')}"`);
            console.log('  - Window width:', window.innerWidth);
            
            if (window.innerWidth <= 768) {
              e.preventDefault();
              console.log('  - Closing menu before navigation...');
              closeMobileMenu();
              setTimeout(() => {
                window.location.href = href;
              }, 50);
            }
          };
        }
      });
      
      // Mega menu product links
      const megaLinks = document.querySelectorAll('.mega-product-item');
      console.log('📦 Found', megaLinks.length, 'mega menu product links');
      
      megaLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href) {
          link.onclick = function(e) {
            console.log(`📦 MEGA PRODUCT CLICKED: "${this.querySelector('strong')?.textContent || 'product'}"`);
            if (window.innerWidth <= 768) {
              e.preventDefault();
              console.log('  - Closing menu before navigation...');
              closeMobileMenu();
              setTimeout(() => {
                window.location.href = href;
              }, 50);
            }
          };
        }
      });
      
      // Category switching
      const categoryItems = document.querySelectorAll('.category-item');
      const dispensersSection = document.getElementById('dispensers-section');
      const mixersSection = document.getElementById('mixers-section');
      
      categoryItems.forEach(item => {
        item.onclick = function(e) {
          e.preventDefault();
          const category = this.dataset.category;
          console.log('📂 Category switched to:', category);
          
          categoryItems.forEach(cat => cat.classList.remove('active'));
          this.classList.add('active');
          
          if (category === 'dispensers' && dispensersSection && mixersSection) {
            dispensersSection.classList.add('active');
            mixersSection.classList.remove('active');
          } else if (category === 'mixers' && dispensersSection && mixersSection) {
            mixersSection.classList.add('active');
            dispensersSection.classList.remove('active');
          }
        };
      });
      
      // Handle window resize
      let resizeTimer;
      window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
          console.log('📱 Window resized to:', window.innerWidth);
          if (window.innerWidth > 768) {
            if (nav.classList.contains('open')) {
              console.log('  - Closing mobile menu (desktop view)');
              closeMobileMenu();
              removeOverlay();
            }
            document.querySelectorAll('.nav-item').forEach(item => {
              item.classList.remove('active');
            });
          }
        }, 100);
      });
      
      // Set active menu based on current page
      setActiveMenuItem();
      
      console.log('✅ Header initialized successfully!');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    }, 100);
  };
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', window.initHeader);
  } else {
    window.initHeader();
  }
})();