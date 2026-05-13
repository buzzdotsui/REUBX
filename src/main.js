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
  initAmbientOrbs();
  initCounterAnimation();
  initMagneticButtons();
  initGoldenSweepOnScroll();
  initStaggeredCards();
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
              setTimeout(() => child.classList.add('visible'), i * 120);
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
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    navbar.classList.toggle('scrolled', scrollY > 80);
    lastScroll = scrollY;
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

  for (let i = 0; i < 40; i++) {
    const particle = document.createElement('div');
    particle.className = 'gold-particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 10 + 's';
    particle.style.animationDuration = (5 + Math.random() * 10) + 's';
    particle.style.width = particle.style.height = (2 + Math.random() * 5) + 'px';
    particle.style.opacity = (0.15 + Math.random() * 0.6).toString();
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

// --- Ambient Golden Orbs ---
function initAmbientOrbs() {
  const sections = document.querySelectorAll('.categories, .manifesto, .featured, .contact-cta');
  sections.forEach((section) => {
    section.style.position = 'relative';
    section.style.overflow = 'hidden';

    const orb1 = document.createElement('div');
    orb1.className = 'ambient-orb';
    orb1.style.width = orb1.style.height = (150 + Math.random() * 200) + 'px';
    orb1.style.top = Math.random() * 60 + '%';
    orb1.style.left = Math.random() * 80 + '%';
    orb1.style.animationDelay = Math.random() * 5 + 's';
    orb1.style.animationDuration = (10 + Math.random() * 8) + 's';
    section.appendChild(orb1);

    const orb2 = document.createElement('div');
    orb2.className = 'ambient-orb';
    orb2.style.width = orb2.style.height = (100 + Math.random() * 150) + 'px';
    orb2.style.bottom = Math.random() * 40 + '%';
    orb2.style.right = Math.random() * 60 + '%';
    orb2.style.animationDelay = (3 + Math.random() * 5) + 's';
    orb2.style.animationDuration = (12 + Math.random() * 6) + 's';
    section.appendChild(orb2);
  });
}

// --- Counter Animation ---
function initCounterAnimation() {
  const statNumber = document.querySelector('.stat-number');
  if (!statNumber) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(statNumber, 0, 100, 2000);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  observer.observe(statNumber);
}

function animateCounter(el, start, end, duration) {
  const startTime = performance.now();
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.round(start + (end - start) * eased);
    el.textContent = value + '%';
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.classList.add('animated');
    }
  }
  requestAnimationFrame(update);
}

// --- Magnetic Button Effect ---
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.btn-primary, .btn-outline, .nav-cta');
  buttons.forEach(btn => {
    btn.classList.add('btn-magnetic');
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.15;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
}

// --- Golden Sweep on Scroll ---
function initGoldenSweepOnScroll() {
  const sections = document.querySelectorAll('.trust-strip, .process');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sweep = document.createElement('div');
        sweep.style.cssText = `
          position: absolute; top: 0; left: -100%; width: 50%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(212,175,55,0.04), transparent);
          pointer-events: none; z-index: 1;
        `;
        entry.target.style.position = 'relative';
        entry.target.style.overflow = 'hidden';
        entry.target.appendChild(sweep);
        sweep.animate([
          { transform: 'translateX(0)' },
          { transform: 'translateX(400%)' }
        ], { duration: 1500, easing: 'ease-out' });
        setTimeout(() => sweep.remove(), 1600);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  sections.forEach(s => observer.observe(s));
}

// --- Staggered Card Entrance ---
function initStaggeredCards() {
  const grids = document.querySelectorAll('.categories-grid, .products-grid');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const cards = entry.target.children;
        Array.from(cards).forEach((card, i) => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(40px) scale(0.95)';
          card.style.transition = `opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 150}ms, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${i * 150}ms`;
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0) scale(1)';
            });
          });
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  grids.forEach(g => observer.observe(g));
}
