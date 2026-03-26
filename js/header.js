// ===== HEADER FUNCTIONALITY - DEBUG VERSION =====
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
    }
    if (overlay) {
      overlay.classList.remove('active');
      console.log('✅ Overlay hidden');
    }
  }
  
  function openMobileMenu() {
    console.log('🟢 openMobileMenu() called');
    const nav = document.querySelector('.nav');
    const menuToggle = document.querySelector('.menu-toggle');
    
    if (nav) {
      nav.classList.add('open');
      if (menuToggle) menuToggle.innerHTML = '✖';
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      console.log('✅ Menu opened, nav classes:', nav.className);
      console.log('✅ nav position:', window.getComputedStyle(nav).left);
    }
    if (overlay) {
      overlay.classList.add('active');
      console.log('✅ Overlay shown');
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
  
  window.initHeader = function() {
    console.log('🚀 initHeader() started');
    
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
      
      // Setup menu toggle
      const newToggle = menuToggle.cloneNode(true);
      menuToggle.parentNode.replaceChild(newToggle, menuToggle);
      const finalToggle = document.querySelector('.menu-toggle');
      
      finalToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🎯 MENU TOGGLE CLICKED!');
        console.log('  - Current nav class:', nav.className);
        console.log('  - Contains "open"?', nav.classList.contains('open'));
        
        if (nav.classList.contains('open')) {
          closeMobileMenu();
        } else {
          createOverlay();
          openMobileMenu();
        }
      });
      
      // Products link - toggle submenu only on mobile, no navigation
      if (productsLink) {
        const newProductsLink = productsLink.cloneNode(true);
        productsLink.parentNode.replaceChild(newProductsLink, productsLink);
        const finalProductsLink = document.querySelector('.nav-item > a');
        
        finalProductsLink.addEventListener('click', function(e) {
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
        });
      }
      
      // Regular navigation links (Home, About, Software, Downloads, Contact)
      const navLinks = document.querySelectorAll('.nav > a');
      console.log('🔗 Found', navLinks.length, 'direct navigation links');
      
      navLinks.forEach((link, index) => {
        const href = link.getAttribute('href');
        console.log(`  - Link ${index + 1}: href="${href}", text="${link.textContent}"`);
        
        if (href && href !== '#') {
          const newLink = link.cloneNode(true);
          link.parentNode.replaceChild(newLink, link);
          
          newLink.addEventListener('click', function(e) {
            console.log(`🔗 LINK CLICKED: "${this.textContent}" -> "${this.getAttribute('href')}"`);
            console.log('  - Window width:', window.innerWidth);
            
            if (window.innerWidth <= 768) {
              console.log('  - Closing menu before navigation...');
              closeMobileMenu();
              // Allow navigation - do NOT preventDefault
              console.log('  - Navigation will proceed to:', this.getAttribute('href'));
            }
          });
        }
      });
      
      // Mega menu product links
      const megaLinks = document.querySelectorAll('.mega-product-item');
      console.log('📦 Found', megaLinks.length, 'mega menu product links');
      
      megaLinks.forEach(link => {
        link.addEventListener('click', function() {
          console.log(`📦 MEGA PRODUCT CLICKED: "${this.querySelector('strong')?.textContent || 'product'}"`);
          if (window.innerWidth <= 768) {
            console.log('  - Closing menu before navigation...');
            closeMobileMenu();
          }
        });
      });
      
      // Category switching
      const categoryItems = document.querySelectorAll('.category-item');
      const dispensersSection = document.getElementById('dispensers-section');
      const mixersSection = document.getElementById('mixers-section');
      
      categoryItems.forEach(item => {
        item.addEventListener('click', function(e) {
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
        });
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
