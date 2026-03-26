// ===== MAIN JAVASCRIPT =====
document.addEventListener('DOMContentLoaded', () => {
  console.log('Mastriq website loaded');
  
  // Load Header Component
  fetch('components/header.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('header-container').innerHTML = data;
      // Initialize header functionality after loading
      if (typeof initHeader === 'function') {
        initHeader();
      }
    })
    .catch(error => console.error('Error loading header:', error));
  
  // Load Footer Component
  fetch('components/footer.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('footer-container').innerHTML = data;
    })
    .catch(error => console.error('Error loading footer:', error));
});