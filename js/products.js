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



// ===== STRIPE-STYLE SQUEEZY CAROUSEL WITH IMAGES (FIXED) =====
(function() {
  // Carousel Data with high-quality online images that load reliably
  const carouselData = [
    {
      title: "Businesses on MastriqONE",
      description: "Our platform processes millions of tinting operations annually with 99.99% uptime, enabling consistent colour accuracy across retail networks.",
      link: "#",
      linkText: "Read the story",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop"
    },
    {
      title: "150K+ daily transactions",
      description: "MastriqONE handles peak loads effortlessly, maintaining consistent performance during high-volume periods like seasonal promotions.",
      link: "#",
      linkText: "See the numbers",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&sat=-100"
    },
    {
      title: "New: AI-Powered Color Matching",
      description: "Our latest update introduces intelligent colour recommendations and automated formula adjustments for unprecedented accuracy.",
      link: "#",
      linkText: "Learn more",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop"
    },
    {
      title: "Global Partner Network",
      description: "MastriqONE now supports over 25 languages, enabling seamless deployment across international markets.",
      link: "#",
      linkText: "Read more",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop"
    },
    {
      title: "Remote Diagnostics Launch",
      description: "New remote troubleshooting tools reduce resolution time by 60%, minimizing downtime for your stores.",
      link: "#",
      linkText: "View announcement",
      image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=800&h=500&fit=crop"
    },
    {
      title: "API Performance Upgrade",
      description: "MastriqONE's API now handles 3x more requests per second, supporting higher throughput operations.",
      link: "#",
      linkText: "Get the data",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop"
    },
    {
      title: "Integration with Leading POS",
      description: "New partnerships bring seamless integration with top retail management systems worldwide.",
      link: "#",
      linkText: "Read more",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop"
    },
    {
      title: "Sustainability Report 2025",
      description: "How digital tinting reduces waste by 85% compared to manual processes. Read our latest sustainability insights.",
      link: "#",
      linkText: "Get the report",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=500&fit=crop"
    }
  ];

  let currentIndex = 0;
  const totalItems = carouselData.length;
  let itemsContainer;
  let autoRotateInterval;
  let isAnimating = false;

  // Create a card element with image
  function createCard(item, index) {
    const card = document.createElement('div');
    card.className = 'squeezy-carousel__item-card';
    card.setAttribute('data-index', index);
    
    // Add placeholder fallback
    const imgHtml = `
      <div class="card-image">
        <img src="${item.image}" alt="${item.title}" loading="lazy" onerror="this.style.display='none'; this.parentElement.querySelector('.card-image-placeholder').style.display='flex';">
        <div class="card-image-placeholder" style="display: none;">
          <i class="fas fa-chart-line"></i>
        </div>
      </div>
      <div class="card-title">${item.title}</div>
      <div class="card-description">${item.description}</div>
      <a href="${item.link}" class="card-link">
        ${item.linkText} 
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path d="M0.5 5.5h7M1.5 1.5l4 4-4 4" stroke="currentColor" stroke-width="2"/>
        </svg>
      </a>
    `;
    
    card.innerHTML = imgHtml;
    return card;
  }

  // Create carousel items
  function createCarouselItems() {
    if (!itemsContainer) return;
    
    itemsContainer.innerHTML = '';
    
    for (let i = 0; i < totalItems; i++) {
      const itemWrapper = document.createElement('div');
      itemWrapper.className = 'squeezy-carousel__item-details';
      itemWrapper.setAttribute('data-index', i);
      const card = createCard(carouselData[i], i);
      itemWrapper.appendChild(card);
      itemsContainer.appendChild(itemWrapper);
    }
  }

  // Update carousel positions - Stripe style stacking
  function updateCarousel() {
    if (!itemsContainer) return;
    
    const items = itemsContainer.querySelectorAll('.squeezy-carousel__item-details');
    const total = items.length;
    const containerWidth = itemsContainer.parentElement?.offsetWidth || 1200;
    const baseShift = Math.min(120, containerWidth * 0.1);
    
    for (let i = 0; i < total; i++) {
      const item = items[i];
      const index = parseInt(item.getAttribute('data-index'));
      
      // Calculate offset from current index (circular)
      let offset = (index - currentIndex + total) % total;
      if (offset > total / 2) offset = offset - total;
      
      // Calculate transform and opacity based on offset
      let translateX, opacity, zIndex, scale;
      
      if (offset === 0) {
        // Active item - full visibility
        translateX = '0%';
        opacity = 1;
        zIndex = 20;
        scale = 1;
        item.style.pointerEvents = 'auto';
      } else {
        // Stacked items - decreasing visibility based on distance
        const distance = Math.abs(offset);
        // Each subsequent item is shifted more (decreasing shift for better visibility)
        const shiftPercent = Math.min(60, distance * 18);
        translateX = offset > 0 ? `${shiftPercent}%` : `-${shiftPercent}%`;
        // Opacity decreases with distance
        opacity = Math.max(0.2, 1 - (distance * 0.15));
        zIndex = 10 - distance;
        // Scale decreases slightly
        scale = Math.max(0.75, 1 - (distance * 0.06));
        item.style.pointerEvents = 'none';
      }
      
      item.style.transform = `translateX(${translateX}) scale(${scale})`;
      item.style.opacity = opacity;
      item.style.zIndex = zIndex;
    }
    
    // Update dots
    const dots = document.querySelectorAll('.carousel-dot');
    if (dots.length) {
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }
  }

  // Go to specific slide
  function goToSlide(index) {
    if (isAnimating) return;
    if (index < 0) index = totalItems - 1;
    if (index >= totalItems) index = 0;
    if (index === currentIndex) return;
    
    isAnimating = true;
    currentIndex = index;
    updateCarousel();
    
    setTimeout(() => {
      isAnimating = false;
    }, 600);
  }

  // Next slide
  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  // Previous slide
  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  // Create dots
  function createDots() {
    const dotsContainer = document.getElementById('carouselDots');
    if (!dotsContainer) return;
    
    dotsContainer.innerHTML = '';
    for (let i = 0; i < totalItems; i++) {
      const dot = document.createElement('div');
      dot.className = 'carousel-dot' + (i === currentIndex ? ' active' : '');
      dot.addEventListener('click', () => {
        stopAutoRotate();
        goToSlide(i);
        startAutoRotate();
      });
      dotsContainer.appendChild(dot);
    }
  }

  // Start auto rotation
  function startAutoRotate() {
    if (autoRotateInterval) clearInterval(autoRotateInterval);
    autoRotateInterval = setInterval(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, 6000);
  }

  // Stop auto rotation
  function stopAutoRotate() {
    if (autoRotateInterval) {
      clearInterval(autoRotateInterval);
      autoRotateInterval = null;
    }
  }

  // Handle window resize
  let resizeTimeout;
  function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      updateCarousel();
    }, 100);
  }

  // Initialize carousel
  function initCarousel() {
    itemsContainer = document.getElementById('carouselItemsContainer');
    if (!itemsContainer) {
      console.error('Carousel container not found');
      return;
    }
    
    createCarouselItems();
    createDots();
    updateCarousel();
    startAutoRotate();
    
    // Event listeners for navigation buttons
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        stopAutoRotate();
        prevSlide();
        startAutoRotate();
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        stopAutoRotate();
        nextSlide();
        startAutoRotate();
      });
    }
    
    // Pause on hover
    const carousel = document.querySelector('.squeezy-carousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', stopAutoRotate);
      carousel.addEventListener('mouseleave', startAutoRotate);
    }
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
    
    console.log('Carousel initialized with', totalItems, 'items');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousel);
  } else {
    initCarousel();
  }
})();
// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProductsCarousel);
} else {
  initProductsCarousel();
}
