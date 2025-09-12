// Main page JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const id = document.getElementById('userId').value.trim();
      if (id) {
        // Store participant ID using sessionStorage
        sessionStorage.setItem('participantId', id);
        window.location.href = 'Level1.html';
      } else {
        alert('Please enter your participant ID');
      }
    });
  }
});