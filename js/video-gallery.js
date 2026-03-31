// ===== VIDEO GALLERY FUNCTIONALITY =====
function initVideoGallery() {
  const videoWrappers = document.querySelectorAll('.video-wrapper');
  const modal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  const modalClose = document.getElementById('modalClose');
  let hasAutoPlayed = false;
  
  if (!videoWrappers.length) return;
  
  // Function to play video
  function playVideo(video, wrapper) {
    // Pause all other videos first
    document.querySelectorAll('.video-wrapper video').forEach(otherVideo => {
      if (otherVideo !== video && !otherVideo.paused) {
        otherVideo.pause();
        const otherWrapper = otherVideo.closest('.video-wrapper');
        if (otherWrapper) otherWrapper.classList.remove('playing');
      }
    });
    
    video.play();
    wrapper.classList.add('playing');
  }
  
  // Function to pause video
  function pauseVideo(video, wrapper) {
    video.pause();
    wrapper.classList.remove('playing');
  }
  
  // Setup each video
  videoWrappers.forEach(wrapper => {
    const video = wrapper.querySelector('video');
    const playOverlay = wrapper.querySelector('.video-play-overlay');
    const enlargeBtn = wrapper.querySelector('.video-enlarge-btn');
    
    if (!video) return;
    
    // Set muted to allow autoplay
    video.muted = true;
    
    // Load poster
    if (video.hasAttribute('poster') && video.getAttribute('poster')) {
      video.load();
    }
    
    // Play/Pause on overlay click
    if (playOverlay) {
      playOverlay.addEventListener('click', (e) => {
        e.stopPropagation();
        if (video.paused) {
          playVideo(video, wrapper);
        } else {
          pauseVideo(video, wrapper);
        }
      });
    }
    
    // Enlarge button click - open modal
    if (enlargeBtn) {
      enlargeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const videoSrc = video.currentSrc || video.src;
        modalVideo.src = videoSrc;
        modal.style.display = 'flex';
        modalVideo.play();
        
        // Pause the original video
        pauseVideo(video, wrapper);
      });
    }
    
    // Video event listeners
    video.addEventListener('ended', () => {
      wrapper.classList.remove('playing');
    });
    
    video.addEventListener('pause', () => {
      wrapper.classList.remove('playing');
    });
    
    video.addEventListener('play', () => {
      wrapper.classList.add('playing');
    });
  });
  
  // Intersection Observer for autoplay when section comes into view
  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAutoPlayed) {
        hasAutoPlayed = true;
        
        // Play all videos muted when section comes into view
        videoWrappers.forEach(wrapper => {
          const video = wrapper.querySelector('video');
          if (video && video.paused) {
            video.play().catch(e => console.log('Autoplay prevented:', e));
            wrapper.classList.add('playing');
          }
        });
        
        // Stop observing after autoplay
        observer.disconnect();
      }
    });
  }, observerOptions);
  
  const gallerySection = document.querySelector('.video-gallery-section');
  if (gallerySection) {
    observer.observe(gallerySection);
  }
  
  // Modal functionality
  if (modal && modalVideo) {
    // Close modal
    if (modalClose) {
      modalClose.addEventListener('click', () => {
        modal.style.display = 'none';
        modalVideo.pause();
        modalVideo.src = '';
      });
    }
    
    // Close modal on background click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
        modalVideo.pause();
        modalVideo.src = '';
      }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
        modal.style.display = 'none';
        modalVideo.pause();
        modalVideo.src = '';
      }
    });
  }
  
  // Optional: Pause videos when they go out of view
  const pauseObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const wrapper = entry.target.closest('.video-wrapper');
      const video = wrapper?.querySelector('video');
      
      if (!entry.isIntersecting && video && !video.paused) {
        pauseVideo(video, wrapper);
      }
    });
  }, { threshold: 0.1 });
  
  videoWrappers.forEach(wrapper => {
    pauseObserver.observe(wrapper);
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initVideoGallery);
} else {
  initVideoGallery();
}