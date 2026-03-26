// ===== HERO CAROUSEL FUNCTIONALITY =====
function initHeroCarousel() {
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.carousel-nav.prev');
  const nextBtn = document.querySelector('.carousel-nav.next');
  const progressBar = document.querySelector('.progress-bar');
  const dotsContainer = document.querySelector('.carousel-dots');
  const scrollIndicator = document.querySelector('.scroll-indicator');
  const productsSection = document.querySelector('.products-section');
  
  if (!slides.length) return;
  
  let currentIndex = 0;
  let autoTimer;
  const DEFAULT_DURATION = 7000;
  
  // Clear existing dots and create new ones (only once)
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'hero-dot';
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        stopAutoRotate();
        showSlide(i);
        startAutoRotate();
      });
      dotsContainer.appendChild(dot);
    });
  }
  
  const dots = document.querySelectorAll('.hero-dot');
  
  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    slides[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');
    currentIndex = index;
    
    let duration = DEFAULT_DURATION;
    const video = slides[index].querySelector('video');
    
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
      if (video.readyState >= 1 && video.duration) {
        duration = video.duration * 1000;
      } else {
        video.onloadedmetadata = () => {
          duration = video.duration * 1000;
          animateProgress(duration);
          resetTimer(duration);
        };
        return;
      }
    }
    animateProgress(duration);
    resetTimer(duration);
  }
  
  function animateProgress(duration) {
    if (progressBar) {
      progressBar.style.transition = 'none';
      progressBar.style.width = '0%';
      progressBar.offsetHeight;
      progressBar.style.transition = `width ${duration}ms linear`;
      progressBar.style.width = '100%';
    }
  }
  
  function resetTimer(duration) {
    clearTimeout(autoTimer);
    autoTimer = setTimeout(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }, duration);
  }
  
  function stopAutoRotate() {
    clearTimeout(autoTimer);
  }
  
  function startAutoRotate() {
    const duration = DEFAULT_DURATION;
    animateProgress(duration);
    resetTimer(duration);
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      stopAutoRotate();
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
      startAutoRotate();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      stopAutoRotate();
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
      startAutoRotate();
    });
  }
  
  // Scroll to products section on click
  if (scrollIndicator && productsSection) {
    scrollIndicator.addEventListener('click', () => {
      productsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
  
  const heroCarousel = document.querySelector('.hero-carousel');
  if (heroCarousel) {
    heroCarousel.addEventListener('mouseenter', () => stopAutoRotate());
    heroCarousel.addEventListener('mouseleave', () => startAutoRotate());
  }
  
  showSlide(0);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeroCarousel);
} else {
  initHeroCarousel();
}