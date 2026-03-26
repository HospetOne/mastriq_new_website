// ===== VIDEO GALLERY FUNCTIONALITY =====
function initVideoGallery() {
  const videos = document.querySelectorAll('.video-wrapper');
  const modal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  const modalClose = document.getElementById('modalClose');
  
  if (!videos.length) return;
  
  // Add click event to each video wrapper
  videos.forEach(videoWrapper => {
    const video = videoWrapper.querySelector('video');
    const playOverlay = videoWrapper.querySelector('.video-play-overlay');
    
    if (!video) return;
    
    // Check if poster exists, if not set a fallback
    if (video.hasAttribute('poster') && video.getAttribute('poster')) {
      // Poster is set, ensure video displays it
      video.load();
    }
    
    // Play/pause on click
    videoWrapper.addEventListener('click', (e) => {
      e.stopPropagation();
      
      // If clicking on play overlay or video itself, play the video
      if (video.paused) {
        // Pause any other playing videos first
        document.querySelectorAll('.video-wrapper video').forEach(otherVideo => {
          if (otherVideo !== video && !otherVideo.paused) {
            otherVideo.pause();
            const otherWrapper = otherVideo.closest('.video-wrapper');
            if (otherWrapper) otherWrapper.classList.remove('playing');
          }
        });
        
        video.play();
        videoWrapper.classList.add('playing');
      } else {
        video.pause();
        videoWrapper.classList.remove('playing');
      }
    });
    
    // Show overlay when video ends
    video.addEventListener('ended', () => {
      videoWrapper.classList.remove('playing');
    });
    
    // Remove playing class when video is paused
    video.addEventListener('pause', () => {
      videoWrapper.classList.remove('playing');
    });
    
    // Add playing class when video starts playing
    video.addEventListener('play', () => {
      videoWrapper.classList.add('playing');
    });
  });
  
  // Modal functionality for fullscreen view
  if (modal && modalVideo) {
    // Double click on video to open modal
    document.querySelectorAll('.video-wrapper video').forEach(video => {
      video.addEventListener('dblclick', (e) => {
        e.stopPropagation();
        const videoSrc = video.currentSrc || video.src;
        modalVideo.src = videoSrc;
        modal.style.display = 'flex';
        modalVideo.play();
        
        // Pause the original video
        video.pause();
        const wrapper = video.closest('.video-wrapper');
        if (wrapper) wrapper.classList.remove('playing');
      });
    });
    
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
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initVideoGallery);
} else {
  initVideoGallery();
}