// ===== SOFTWARE SECTION ANIMATION =====
function initSoftwareAnimation() {
  const players = document.querySelectorAll('.screen-screen');
  let started = false;
  
  function startAnimation() {
    players.forEach(player => {
      const images = player.querySelectorAll('img');
      let i = 0;
      setInterval(() => {
        images.forEach(img => img.classList.remove('active'));
        i = (i + 1) % images.length;
        images[i].classList.add('active');
      }, 2200);
    });
  }
  
  const softwareSection = document.querySelector('.software-section');
  if (softwareSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !started) {
          started = true;
          startAnimation();
        }
      });
    }, { threshold: 0.4 });
    observer.observe(softwareSection);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSoftwareAnimation);
} else {
  initSoftwareAnimation();
}