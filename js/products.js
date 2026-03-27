// ===== PRODUCTS CAROUSEL - WITH NEXT PREVIEW (IMAGE + NAME) =====
function initProductsCarousel() {
  const productPrev = document.getElementById('productPrev');
  const productNext = document.getElementById('productNext');
  const productDots = document.getElementById('productDots');
  
  // Product data
  const products = [
    {
      name: 'M60 BEAST',
      desc: 'Engineered to dominate · 8.8 L/min · Screw pump',
      keyFeatures: [
        'Massive 8.8 L/min throughput',
        'Screw pump architecture',
        '8 simultaneous circuits',
        'Industrial-grade durability',
        '0.03 ml precision dosing'
      ],
      badge: 'NEW',
      image: 'images/products_section/M60.webp',
      link: 'm60-beast.html'
    },
    {
      name: 'S45 Automatic',
      desc: 'Precision sequential dosing · 0.03ml · 0.30 L/min',
      keyFeatures: [
        'Entry-level excellence',
        'Cluster stirring technology',
        '16 canister capacity',
        'USB/Bluetooth connectivity',
        '0.03 ml precision'
      ],
      badge: 'Entry Level',
      image: 'images/products_section/S45.webp',
      link: 's45.html'
    },
    {
      name: 'M45 Automatic',
      desc: 'Higher throughput · 0.60 L/min · 111 kg',
      keyFeatures: [
        'Mid-range powerhouse',
        '0.60 L/min flow rate',
        'Higher throughput capacity',
        'Automatic stirring system',
        '16 canister configuration'
      ],
      badge: 'Mid-Range',
      image: 'images/products_section/M45.webp',
      link: 'm45.html'
    },
    {
      name: 'M45-SM Simultaneous',
      desc: 'Parallel power · 4.8 L/min total · 8 circuits',
      keyFeatures: [
        'Parallel dispensing power',
        '8 circuits simultaneously',
        '4.8 L/min total output',
        'CE & SASO certified',
        'High-volume efficiency'
      ],
      badge: 'High Volume',
      image: 'images/products_section/M45-SM.webp',
      link: 'm45-sm.html'
    },
    {
      name: 'TM Manual',
      desc: 'Precision simplified · 12/16/24 cans · Flexible scale',
      keyFeatures: [
        'Precision manual control',
        'Multiple canister options (12-24)',
        'Flexible measurement units',
        'Universal compatibility',
        'Simple & reliable operation'
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
  const keyFeaturesList = document.getElementById('keyFeaturesList');
  const productLink = document.getElementById('productLink');
  const mainImage = document.getElementById('mainProductImage');
  const nextPreviewImage = document.getElementById('nextPreviewImage');
  const nextPreviewName = document.getElementById('nextPreviewName');
  const nextPreviewDesc = document.getElementById('nextPreviewDesc');
  const nextPreviewLink = document.getElementById('nextPreviewLink');
  
  // Get next product index
  function getNextProductIndex() {
    return (currentIndex + 1) % totalProducts;
  }
  
  // Update next preview with image + name
  function updateNextPreview() {
    if (nextPreviewName && nextPreviewDesc && nextPreviewImage) {
      const nextIndex = getNextProductIndex();
      const nextProduct = products[nextIndex];
      nextPreviewImage.src = nextProduct.image;
      nextPreviewImage.alt = nextProduct.name;
      nextPreviewName.textContent = nextProduct.name;
      nextPreviewDesc.textContent = nextProduct.desc.split('·')[0].trim();
      if (nextPreviewLink) {
        nextPreviewLink.href = nextProduct.link;
      }
    }
  }
  
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
    
  // Update explore button with product name
  const exploreProductName = document.getElementById('exploreProductName');
  if (exploreProductName) {
    exploreProductName.textContent = product.name;
  }

   // Update mobile next preview
  const mobileNextImage = document.getElementById('mobileNextImage');
  const mobileNextName = document.getElementById('mobileNextName');
  const mobileNextDesc = document.getElementById('mobileNextDesc');
  const mobileNextBtn = document.getElementById('mobileNextBtn');
  
  if (mobileNextImage && mobileNextName && mobileNextDesc) {
    const nextIndex = (index + 1) % products.length;
    const nextProduct = products[nextIndex];
    mobileNextImage.src = nextProduct.image;
    mobileNextName.textContent = nextProduct.name;
    mobileNextDesc.textContent = nextProduct.desc.split('·')[0].trim();
    
    // Add click event for mobile next button
    if (mobileNextBtn) {
      mobileNextBtn.onclick = () => {
        stopAutoRotate();
        updateProduct(nextIndex);
        startAutoRotate();
      };
    }
  }
  

    // Update badge
    productBadge.textContent = product.badge;
    productBadge.style.background = '#20FFB5';
    productBadge.style.color = '#0a0c12';
    
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
    
    // Update key features
    keyFeaturesList.style.animation = 'none';
    keyFeaturesList.offsetHeight;
    keyFeaturesList.style.animation = 'fadeInLeft 0.5s ease 0.2s';
    keyFeaturesList.innerHTML = product.keyFeatures.map(feature => `
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
    
    // Update next preview
    updateNextPreview();
    
    // Update active dot
    const dots = document.querySelectorAll('.showcase-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
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
  
  // Add event listeners for next preview click
  if (nextPreviewLink) {
    nextPreviewLink.addEventListener('click', (e) => {
      e.preventDefault();
      stopAutoRotate();
      nextProduct();
      startAutoRotate();
    });
  }
  
  // Add event listeners for navigation buttons
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
