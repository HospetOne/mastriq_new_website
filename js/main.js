// ===== MAIN JAVASCRIPT - FIXED =====
document.addEventListener('DOMContentLoaded', () => {
  console.log('Mastriq website loaded');
  
  // Function to initialize all components
  function initializeAllComponents() {
    // Initialize header after it's loaded
    if (typeof initHeader === 'function') {
      console.log('Initializing header...');
      initHeader();
    }
    
    // Initialize hero carousel
    if (typeof initHeroCarousel === 'function') {
      console.log('Initializing hero carousel...');
      initHeroCarousel();
    }
  }
  
  // Check if header is already present in HTML (not loaded from external file)
  const existingHeader = document.querySelector('.main-header');
  
  if (existingHeader) {
    // Header already exists in HTML
    console.log('Header already exists in HTML');
    initializeAllComponents();
  } else {
    // Load Header Component dynamically
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
      console.log('Loading header from components/header.html');
      fetch('components/header.html')
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to load header');
          }
          return response.text();
        })
        .then(data => {
          headerContainer.innerHTML = data;
          console.log('Header loaded successfully');
          // Wait a moment for DOM to update
          setTimeout(() => {
            initializeAllComponents();
          }, 50);
        })
        .catch(error => {
          console.error('Error loading header:', error);
          // Fallback header if fetch fails
          headerContainer.innerHTML = getFallbackHeader();
          setTimeout(() => {
            initializeAllComponents();
          }, 50);
        });
    } else {
      console.error('header-container element not found');
      initializeAllComponents();
    }
  }
  
  // Load Footer Component
  const footerContainer = document.getElementById('footer-container');
  if (footerContainer && !document.querySelector('.footer-modern')) {
    fetch('components/footer.html')
      .then(response => {
        if (!response.ok) throw new Error('Failed to load footer');
        return response.text();
      })
      .then(data => {
        footerContainer.innerHTML = data;
      })
      .catch(error => {
        console.error('Error loading footer:', error);
        footerContainer.innerHTML = getFallbackFooter();
      });
  }
  
  // Fallback header HTML
  function getFallbackHeader() {
    return `
      <header class="main-header">
        <div class="nav-bar">
          <button class="menu-toggle" type="button" aria-label="Menu">☰</button>
          <div class="brand-wrap">
            <a href="index.html" class="brand">mastriq</a>
            <div class="brand-tagline">Technology made simple.</div>
          </div>
          <nav class="nav">
            <a href="index.html">Home</a>
            <a href="about.html">About</a>
            <div class="nav-item">
              <a href="#">Products</a>
              <div class="mega-menu">
                <div class="mega-container">
                  <div class="mega-categories">
                    <div class="category-item active" data-category="dispensers">
                      <i class="fas fa-droplet"></i>
                      <span>Dispensers</span>
                    </div>
                    <div class="category-item" data-category="mixers">
                      <i class="fas fa-cogs"></i>
                      <span>Mixers</span>
                    </div>
                  </div>
                  <div class="mega-products">
                    <div class="product-section active" id="dispensers-section">
                      <div class="product-scroll">
                        <a href="m60-beast.html" class="mega-product-item">
                          <img src="images/products_menu/M60.webp" alt="M60 BEAST">
                          <div class="mega-product-info">
                            <strong>M60 BEAST <span class="badge-new">NEW</span></strong>
                            <span>Massive Capacity, Endless Power</span>
                          </div>
                        </a>
                        <a href="s45.html" class="mega-product-item">
                          <img src="images/products_menu/S45.webp" alt="S45">
                          <div class="mega-product-info">
                            <strong>S45 Automatic Dispenser</strong>
                            <span>High-speed automatic dispenser</span>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div class="product-section" id="mixers-section">
                      <div class="product-scroll">
                        <a href="vx1.html" class="mega-product-item">
                          <img src="images/products_menu/VX1.webp" alt="Vortex Mixer">
                          <div class="mega-product-info">
                            <strong>Vortex Mixer</strong>
                            <span>Easy & simple way of mixing</span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <a href="software.html">Software</a>
            <a href="downloads.html">Downloads</a>
            <a href="contact.html">Contact</a>
          </nav>
          <div class="header-extras">
            <button class="search-toggle">🔍</button>
            <button class="lang-toggle">EN ▾</button>
            <button class="sign-in-btn">Sign In</button>
          </div>
        </div>
      </header>
    `;
  }
  
  function getFallbackFooter() {
    return `
      <footer class="footer-modern">
        <div class="container">
          <div class="footer-content">
            <div class="footer-brand">
              <h3>mastriq</h3>
              <p>Technology made simple.</p>
            </div>
            <div class="footer-links">
              <div class="footer-column">
                <h4>Company</h4>
                <a href="about.html">About</a>
                <a href="contact.html">Contact</a>
              </div>
              <div class="footer-column">
                <h4>Products</h4>
                <a href="s45.html">Dispensers</a>
                <a href="software.html">Software</a>
              </div>
              <div class="footer-column">
                <h4>Legal</h4>
                <a href="privacy-policy.html">Privacy</a>
                <a href="terms.html">Terms</a>
              </div>
            </div>
          </div>
          <div class="footer-bottom">
            <p>&copy; 2026 Mastriq Tech Pvt. Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    `;
  }
});