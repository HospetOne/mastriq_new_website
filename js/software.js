// ===== SOFTWARE SECTION VIDEO & CAROUSEL FUNCTIONALITY =====
function initSoftwareSection() {
  // Video functionality
  const video = document.getElementById('softwareHeroVideo');
  const playBtn = document.getElementById('heroPlayBtn');
  const playPauseBtn = document.getElementById('playPauseBtn');
  const progressFill = document.getElementById('progressFill');
  const progressContainer = document.querySelector('.progress-container');
  const timeDisplay = document.getElementById('timeDisplay');
  const volumeBtn = document.getElementById('volumeBtn');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  
  if (video) {
    function formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    
    function updateProgress() {
      if (video.duration) {
        const percent = (video.currentTime / video.duration) * 100;
        progressFill.style.width = `${percent}%`;
        timeDisplay.textContent = formatTime(video.currentTime);
      }
    }
    
    function togglePlay() {
      if (video.paused) {
        video.play();
        if (playBtn) playBtn.classList.add('hidden');
        if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
      } else {
        video.pause();
        if (playBtn) playBtn.classList.remove('hidden');
        if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
      }
    }
    
    if (playBtn) playBtn.addEventListener('click', togglePlay);
    if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlay);
    
    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', () => {
      timeDisplay.textContent = formatTime(0);
    });
    
    video.addEventListener('play', () => {
      if (playBtn) playBtn.classList.add('hidden');
      if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    });
    
    video.addEventListener('pause', () => {
      if (video.currentTime > 0 && !video.ended) {
        if (playBtn) playBtn.classList.remove('hidden');
        if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
      }
    });
    
    video.addEventListener('ended', () => {
      if (playBtn) playBtn.classList.remove('hidden');
      if (playPauseBtn) playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
      video.currentTime = 0;
      progressFill.style.width = '0%';
    });
    
    if (progressContainer) {
      progressContainer.addEventListener('click', (e) => {
        const rect = progressContainer.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        video.currentTime = pos * video.duration;
      });
    }
    
    let isMuted = false;
    if (volumeBtn) {
      volumeBtn.addEventListener('click', () => {
        if (isMuted) {
          video.muted = false;
          volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
          isMuted = false;
        } else {
          video.muted = true;
          volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
          isMuted = true;
        }
      });
    }
    
    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', () => {
        const container = video.closest('.video-wrapper');
        if (!document.fullscreenElement) {
          container.requestFullscreen();
          fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
        } else {
          document.exitFullscreen();
          fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        }
      });
      
      document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
          fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
        } else {
          fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
        }
      });
    }
  }
  
  // Carousel functionality
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dotsContainer = document.getElementById('carouselDots');
  const items = document.querySelectorAll('.carousel-item');
  let currentIndex = 0;
  const totalItems = items.length;
  
  function updateCarousel() {
    if (track) {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    if (dotsContainer) {
      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });
    }
  }
  
  function createDots() {
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < totalItems; i++) {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot' + (i === currentIndex ? ' active' : '');
        dot.addEventListener('click', () => {
          currentIndex = i;
          updateCarousel();
        });
        dotsContainer.appendChild(dot);
      }
    }
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + totalItems) % totalItems;
      updateCarousel();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarousel();
    });
  }
  
  createDots();
  updateCarousel();
}
// ===== STRIPE-STYLE SQUEEZY CAROUSEL WITH REAL IMAGES (FIXED) =====
(function() {
  // Carousel Data with ACTUAL IMAGE URLs
  const carouselData = [
    {
      title: "Businesses on MastriqONE",
      description: "Our platform processes millions of tinting operations annually with 99.99% uptime, enabling consistent colour accuracy across retail networks.",
      link: "#",
      linkText: "Read the story",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
    },
    {
      title: "150K+ daily transactions",
      description: "MastriqONE handles peak loads effortlessly, maintaining consistent performance during high-volume periods like seasonal promotions.",
      link: "#",
      linkText: "See the numbers",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
    },
    {
      title: "New: AI-Powered Color Matching",
      description: "Our latest update introduces intelligent colour recommendations and automated formula adjustments for unprecedented accuracy.",
      link: "#",
      linkText: "Learn more",
      image: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=600&h=400&fit=crop"
    },
    {
      title: "Global Partner Network",
      description: "MastriqONE now supports over 25 languages, enabling seamless deployment across international markets.",
      link: "#",
      linkText: "Read more",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
    },
    {
      title: "Remote Diagnostics Launch",
      description: "New remote troubleshooting tools reduce resolution time by 60%, minimizing downtime for your stores.",
      link: "#",
      linkText: "View announcement",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop"
    },
    {
      title: "API Performance Upgrade",
      description: "MastriqONE's API now handles 3x more requests per second, supporting higher throughput operations.",
      link: "#",
      linkText: "Get the data",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop"
    },
    {
      title: "Integration with Leading POS",
      description: "New partnerships bring seamless integration with top retail management systems worldwide.",
      link: "#",
      linkText: "Read more",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop"
    },
    {
      title: "Sustainability Report 2025",
      description: "How digital tinting reduces waste by 85% compared to manual processes. Read our latest sustainability insights.",
      link: "#",
      linkText: "Get the report",
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop"
    }
  ];

  let currentIndex = 0;
  const totalItems = carouselData.length;
  let itemsContainer;
  let autoRotateInterval;
  let isAnimating = false;

  // Create a card with REAL IMAGE
  function createCard(item, index) {
    const card = document.createElement('div');
    card.className = 'squeezy-carousel__item-card';
    card.setAttribute('data-index', index);
    
    card.innerHTML = `
      <div class="card-image">
        <img src="${item.image}" alt="${item.title}" loading="lazy" onerror="this.src='https://placehold.co/600x400/1a2a3a/20FFB5?text=${encodeURIComponent(item.title.slice(0,20))}'">
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
    
  // ✅ FIX: click event must be here
  card.addEventListener('click', () => {
    stopAutoRotate();
    goToSlide(index);
    startAutoRotate();
  });
    return card;
  }
  
  // Create all carousel items
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
    


    for (let i = 0; i < total; i++) {
      const item = items[i];
      const index = parseInt(item.getAttribute('data-index'));
      
      // Calculate offset from current index (circular)
      let offset = (index - currentIndex + total) % total;
      if (offset > total / 2) offset = offset - total;
      
      let translateX, opacity, zIndex, scale;
      
      if (offset === 0) {
        // Active item - full visibility, centered
        translateX = '0%';
        opacity = 1;
        zIndex = 20;
        scale = 1;
        item.style.pointerEvents = 'auto';
      } else {
        // Stacked items - decreasing visibility based on distance
        const distance = Math.abs(offset);
        // Each subsequent item is shifted more
        const shiftPercent = Math.min(50, distance * 15);
        translateX = offset > 0 ? `${shiftPercent}%` : `-${shiftPercent}%`;
        // Opacity decreases with distance
        //opacity = Math.max(0.2, 1 - (distance * 0.2));
        //opacity = 1;   // 🔥 fully solid cards
        scale = offset === 0 ? 1 : 0.9;
opacity = 1;
       // zIndex = 10 - distance;
        zIndex = offset === 0 ? 30 : 20 - distance;
        // Scale decreases slightly
        scale = Math.max(0.75, 1 - (distance * 0.08));
        item.style.pointerEvents = 'auto';
      }
      
      //item.style.transform = `translateX(${translateX}) scale(${scale})`;
      item.style.transform = `translateX(calc(-50% + ${translateX})) scale(${scale})`;
      
      item.style.opacity = opacity;
      item.style.zIndex = zIndex;
      // item.style.width = 'auto';   // 🔥 key fix
      item.classList.toggle('active', offset === 0);
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
    }, 500);
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

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

  // Auto-rotation functions
  function startAutoRotate() {
    if (autoRotateInterval) clearInterval(autoRotateInterval);
    autoRotateInterval = setInterval(() => {
      if (!isAnimating) {
        nextSlide();
      }
    }, 6000);
  }

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
  document.addEventListener('DOMContentLoaded', initSoftwareSection);
} else {
  initSoftwareSection();
}