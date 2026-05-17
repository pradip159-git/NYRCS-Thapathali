// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mainNav = document.querySelector('.main-nav');
if (hamburger && mainNav) {
  hamburger.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    hamburger.classList.toggle('active');
  });
  // Mobile dropdowns
  document.querySelectorAll('.has-dropdown > a').forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        link.parentElement.classList.toggle('open');
      }
    });
  });
}

// ===== HERO SLIDER =====
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let current = 0, autoSlide;

function goTo(n) {
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  current = (n + slides.length) % slides.length;
  slides[current].classList.add('active');
  dots[current].classList.add('active');
}
function startAuto() { autoSlide = setInterval(() => goTo(current + 1), 5000); }
function resetAuto() { clearInterval(autoSlide); startAuto(); }

if (slides.length) {
  document.getElementById('prevBtn')?.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  document.getElementById('nextBtn')?.addEventListener('click', () => { goTo(current + 1); resetAuto(); });
  dots.forEach(d => d.addEventListener('click', () => { goTo(+d.dataset.index); resetAuto(); }));
  startAuto();
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
  document.querySelectorAll('.counter').forEach(el => {
    const target = +el.dataset.target;
    const step = target / 80;
    let count = 0;
    const timer = setInterval(() => {
      count += step;
      if (count >= target) { el.textContent = target.toLocaleString() + '+'; clearInterval(timer); }
      else { el.textContent = Math.floor(count).toLocaleString(); }
    }, 20);
  });
}
const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { animateCounters(); observer.disconnect(); }
  }, { threshold: 0.3 });
  observer.observe(statsSection);
}

// ===== GALLERY LIGHTBOX =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const src = item.querySelector('img').src;
    lightboxImg.src = src;
    lightbox.classList.add('active');
  });
});
document.getElementById('lightboxClose')?.addEventListener('click', () => lightbox.classList.remove('active'));
lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('active'); });

// ===== NEWS TABS =====
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ===== STICKY HEADER SHADOW =====
window.addEventListener('scroll', () => {
  const header = document.querySelector('.site-header');
  if (header) header.style.boxShadow = window.scrollY > 10 ? '0 4px 20px rgba(0,0,0,.15)' : '0 2px 12px rgba(0,0,0,.1)';
});

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.program-card,.news-card,.gallery-item,.stat-item,.involve-card');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity .5s ease, transform .5s ease';
  revealObserver.observe(el);
});

// ===== ACTIVE NAV LINK =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.main-nav a').forEach(link => {
  if (link.getAttribute('href') === currentPage) link.classList.add('active');
});
