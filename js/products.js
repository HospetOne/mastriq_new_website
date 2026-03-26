// ===== PRODUCTS CAROUSEL - CENTERED IMAGE LAYOUT =====
function initProductsCarousel() {
  const productPrev = document.getElementById('productPrev');
  const productNext = document.getElementById('productNext');
  const productDots = document.getElementById('productDots');
  
  // Product data
  const products = [
    {
      name: 'M60 BEAST',
      desc: 'Engineered to dominate · 8.8 L/min · Screw pump',
      specs: [
        { label: 'Flow Rate', value: '8.8 L/min' },
        { label: 'Technology', value: 'Screw pump' },
        { label: 'Circuits', value: '8 simultaneous' },
        { label: 'Precision', value: '0.03 ml' }
      ],
      features: [
        'Massive 8.8 L/min throughput',
        'Screw pump architecture',
        '8 simultaneous circuits',
        'Industrial-grade durability'
      ],
      badge: 'NEW',
      image: 'images/products_section/M60.webp',
      link: 'm60-beast.html'
    },
    {
      name: 'S45 Automatic',
      desc: 'Precision sequential dosing · 0.03ml · 0.30 L/min',
      specs: [
        { label: 'Flow Rate', value: '0.30 L/min' },
        { label: 'Technology', value: 'Sequential' },
        { label: 'Canisters', value: '16 cans' },
        { label: 'Precision', value: '0.03 ml' }
      ],
      features: [
        'Entry-level excellence',
        'Cluster stirring technology',
        '16 canister capacity',
        'USB/Bluetooth connectivity'
      ],
      badge: 'Entry Level',
      image: 'images/products_section/S45.webp',
      link: 's45.html'
    },
    {
      name: 'M45 Automatic',
      desc: 'Higher throughput · 0.60 L/min · 111 kg',
      specs: [
        { label: 'Flow Rate', value: '0.60 L/min' },
        { label: 'Technology', value: 'Sequential' },
        { label: 'Canisters', value: '16 cans' },
        { label: 'Weight', value: '111 kg' }
      ],
      features: [
        'Mid-range powerhouse',
        '0.60 L/min flow rate',
        'Higher throughput',
        'Automatic stirring'
      ],
      badge: 'Mid-Range',
      image: 'images/products_section/M45.webp',
      link: 'm45.html'
    },
    {
      name: 'M45-SM Simultaneous',
      desc: 'Parallel power · 4.8 L/min total · 8 circuits',
      specs: [
        { label: 'Total Flow', value: '4.8 L/min' },
        { label: 'Technology', value: 'Simultaneous' },
        { label: 'Circuits', value: '8 at once' },
        { label: 'Certification', value: 'CE/SASO' }
      ],
      features: [
        'Parallel dispensing power',
        '8 circuits simultaneously',
        '4.8 L/min total output',
        'CE & SASO certified'
      ],
      badge: 'High Volume',
      image: 'images/products_section/M45-SM.webp',
      link: 'm45-sm.html'
    },
    {
      name: 'TM Manual',
      desc: 'Precision simplified · 12/16/24 cans · Flexible scale',
      specs: [
        { label: 'Type', value: 'Manual' },
        { label: 'Canisters', value: '12-24 cans' },
        { label: 'Scale', value: 'Flexible' },
        { label: 'Compatibility', value: 'Universal' }
      ],
      features: [
        'Precision manual control',
        'Multiple canister options',
        'Flexible measurement units',
        'Universal compatibility'
      ],
      badge: 'Manual',
      image: 'images/products_section/TM.webp',
      link: 'tm-manual.html'
    }
  ];
  
  let currentIndex = 0;
  let autoRotateTimer;
  const AUTO_ROTATE_DELAY = 6000;
  const totalProducts = products.length;
  
  // Get DOM elements
  const productBadge = document.getElementById('productBadge');
  const productTitle = document.getElementById('productTitle');
  const productDesc = document.getElementById('productDesc');
  const productSpecs = document.getElementById('productSpecs');
  const featureList = document.getElementById('featureList');
  const productLink = document.getElementById('productLink');
  const mainImage = document.getElementById('mainProductImage');
  
  // Create dots
  function updateDots() {
    if (productDots) {
      productDots.innerHTML = '';
      for (let i = 0; i < totalProducts; i++) {
        const dot = document.createElement('button');
        dot.className = 'showcase-dot';
        if (i === currentIndex) dot.classList.add('active');
        dot.addEventListener('click', () => {
          stopAutoRotate();
          updateProduct(i);
          startAutoRotate();
        });
        productDots.appendChild(dot);
      }
    }
  }
  
  // Update product content
  function updateProduct(index) {
    const product = products[index];
    currentIndex = index;
    
    // Update badge
    if (product.badge === 'NEW') {
      productBadge.textContent = product.badge;
      productBadge.style.background = 'var(--primary)';
    } else {
      productBadge.textContent = product.badge;
      productBadge.style.background = 'var(--text-light)';
    }
    
    // Update title with animation
    productTitle.style.animation = 'none';
    productTitle.offsetHeight;
    productTitle.style.animation = 'fadeInLeft 0.5s ease';
    productTitle.textContent = product.name;
    
    // Update description
    productDesc.style.animation = 'none';
    productDesc.offsetHeight;
    productDesc.style.animation = 'fadeInLeft 0.5s ease 0.1s';
    productDesc.textContent = product.desc;
    
    // Update specs
    productSpecs.style.animation = 'none';
    productSpecs.offsetHeight;
    productSpecs.style.animation = 'fadeInLeft 0.5s ease 0.2s';
    productSpecs.innerHTML = product.specs.map(spec => `
      <div class="spec-item">
        <span class="spec-label">${spec.label}</span>
        <span class="spec-value">${spec.value}</span>
      </div>
    `).join('');
    
    // Update features
    featureList.style.animation = 'none';
    featureList.offsetHeight;
    featureList.style.animation = 'fadeInRight 0.5s ease 0.2s';
    featureList.innerHTML = product.features.map(feature => `
      <li><i class="fas fa-check-circle"></i> ${feature}</li>
    `).join('');
    
    // Update link
    productLink.href = product.link;
    
    // Update image with animation
    mainImage.style.animation = 'none';
    mainImage.offsetHeight;
    mainImage.style.animation = 'zoomIn 0.5s ease';
    mainImage.src = product.image;
    mainImage.alt = product.name;
    
    // Update active dot
    const dots = document.querySelectorAll('.showcase-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
    
    // Update navigation buttons state
    if (productPrev) productPrev.disabled = currentIndex === 0;
    if (productNext) productNext.disabled = currentIndex === totalProducts - 1;
  }
  
  function nextProduct() {
    if (currentIndex < totalProducts - 1) {
      updateProduct(currentIndex + 1);
    } else {
      updateProduct(0);
    }
  }
  
  function prevProduct() {
    if (currentIndex > 0) {
      updateProduct(currentIndex - 1);
    } else {
      updateProduct(totalProducts - 1);
    }
  }
  
  function startAutoRotate() {
    if (autoRotateTimer) clearInterval(autoRotateTimer);
    autoRotateTimer = setInterval(() => {
      nextProduct();
    }, AUTO_ROTATE_DELAY);
  }
  
  function stopAutoRotate() {
    if (autoRotateTimer) {
      clearInterval(autoRotateTimer);
      autoRotateTimer = null;
    }
  }
  
  // Add event listeners
  if (productPrev) productPrev.addEventListener('click', () => {
    stopAutoRotate();
    prevProduct();
    startAutoRotate();
  });
  
  if (productNext) productNext.addEventListener('click', () => {
    stopAutoRotate();
    nextProduct();
    startAutoRotate();
  });
  
  // Pause on hover
  const showcaseContainer = document.querySelector('.product-showcase-content');
  if (showcaseContainer) {
    showcaseContainer.addEventListener('mouseenter', () => stopAutoRotate());
    showcaseContainer.addEventListener('mouseleave', () => startAutoRotate());
  }
  
  // Initialize
  updateDots();
  updateProduct(0);
  startAutoRotate();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProductsCarousel);
} else {
  initProductsCarousel();
}