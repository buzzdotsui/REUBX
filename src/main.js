import './style.css';

// ============================================
// REUBX WORLD®️ — Premium Motion System
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initHeroReveal();
  initScrollAnimations();
  initNavbar();
  initMobileNav();
  initSmoothScroll();
  initParallax();
  initGoldenParticles();
  initTiltCards();
  initTestimonialCarousel();
  initBackToTop();
  initNewsletter();
});

// --- Loading Screen ---
function initLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  setTimeout(() => {
    loader.classList.add('hidden');
    setTimeout(() => loader.remove(), 600);
  }, 2000);
}

// --- Cinematic Hero Reveal ---
function initHeroReveal() {
  const elements = [
    { sel: '.hero-tag', delay: 2200 },
    { sel: '.hero-title', delay: 2500 },
    { sel: '.hero-subtitle', delay: 2800 },
    { sel: '.hero-ctas', delay: 3100 },
    { sel: '.hero-scroll-indicator', delay: 3600 }
  ];

  elements.forEach(({ sel, delay }) => {
    const el = document.querySelector(sel);
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'none';

    setTimeout(() => {
      el.style.transition = 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, delay);
  });
}

// --- Scroll-triggered Animations ---
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const children = entry.target.querySelectorAll('.animate-on-scroll');
          if (children.length > 0) {
            children.forEach((child, i) => {
              setTimeout(() => child.classList.add('visible'), i * 100);
            });
          }
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
  document.querySelectorAll('.categories-grid, .products-grid, .trust-badges, .process-steps')
    .forEach((el) => observer.observe(el));
}

// --- Navbar ---
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  }, { passive: true });
}

// --- Mobile Nav ---
function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// --- Smooth Scroll ---
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const navHeight = document.querySelector('.navbar').offsetHeight + 36;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navHeight, behavior: 'smooth' });
    });
  });
}

// --- Hero Parallax ---
function initParallax() {
  const heroBg = document.querySelector('.hero-bg img');
  if (!heroBg) return;
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        if (scrollY < window.innerHeight) {
          heroBg.style.transform = `scale(1.08) translateY(${scrollY * 0.25}px)`;
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// --- Floating Golden Particles ---
function initGoldenParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;

  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'gold-particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 8 + 's';
    particle.style.animationDuration = (6 + Math.random() * 8) + 's';
    particle.style.width = particle.style.height = (2 + Math.random() * 4) + 'px';
    particle.style.opacity = (0.2 + Math.random() * 0.5).toString();
    container.appendChild(particle);
  }
}

// --- Premium Tilt Effect on Cards ---
function initTiltCards() {
  const cards = document.querySelectorAll('.category-card, .product-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
      card.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateY(0)';
    });
  });
}

// --- Testimonial Carousel ---
function initTestimonialCarousel() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dotsContainer = document.getElementById('testimonialDots');
  if (!slides.length || !dotsContainer) return;

  let current = 0;

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'testimonial-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    slides[current].classList.remove('active');
    dotsContainer.children[current].classList.remove('active');
    current = index;
    slides[current].classList.add('active');
    dotsContainer.children[current].classList.add('active');
  }

  setInterval(() => {
    goTo((current + 1) % slides.length);
  }, 5000);
}

// --- Back to Top ---
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 600);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// --- Newsletter ---
function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const content = form.closest('.newsletter-content');
    if (content) {
      form.innerHTML = '<p class="newsletter-success">✦ Welcome to the inner circle! You\'ll hear from us soon.</p>';
    }
  });
}
