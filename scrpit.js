// =====================================
// FOOTLY - APP FUNCTIONALITY
// Haptics, Auth, & Interactivity
// =====================================

// ===== HAPTICS FUNCTION =====
function triggerHaptics(intensity = 'medium') {
  // Works on iOS and Android devices with vibration support
  if (navigator.vibrate) {
    switch(intensity) {
      case 'light':
        navigator.vibrate(10);
        break;
      case 'medium':
        navigator.vibrate(20);
        break;
      case 'heavy':
        navigator.vibrate([30, 20, 30]);
        break;
    }
  }
}

// ===== AUTH HANDLER =====
function handleAuth(method) {
  triggerHaptics('medium');
  
  setTimeout(() => {
    const message = method === 'google' 
      ? 'Redirecting to Google login...'
      : method === 'gmail'
      ? 'Redirecting to Gmail login...'
      : 'Opening phone number signup...';
    
    alert(message + '\n\n(In production, this would connect to real auth)');
  }, 50);
}

// ===== PLAN SELECTION =====
function selectPlan(plan) {
  triggerHaptics('heavy');
  
  const planNames = {
    'free': 'Starter (Free)',
    'pro': 'Pro ($9.99/month)',
    'elite': 'Elite ($19.99/month)'
  };
  
  setTimeout(() => {
    alert(`You selected: ${planNames[plan]}\n\nProceeding to sign up...`);
  }, 50);
}

// ===== BUTTON HAPTICS =====
document.addEventListener('DOMContentLoaded', function() {
  // Add haptics to all buttons
  const buttons = document.querySelectorAll('button, .nav-item, a');
  
  buttons.forEach(button => {
    button.addEventListener('mousedown', function() {
      triggerHaptics('light');
    });
    
    button.addEventListener('touchstart', function() {
      triggerHaptics('light');
    });
  });

  // Smooth scroll for navigation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

// Observe all sections
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// ===== DARK MODE DETECTION =====
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  // Dark mode is enabled - our CSS is already dark, so we're good
  document.body.style.backgroundColor = '#0a0e27';
}

console.log('✅ Footly app loaded successfully')