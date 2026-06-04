// Navbar scroll + top button
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
  document.getElementById('topBtn').classList.toggle('show', window.scrollY > 300);
});

// Top btn
document.getElementById('topBtn').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Active nav link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 140) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

// Fade in on scroll
const fades = document.querySelectorAll('.fade-in');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
fades.forEach(el => io.observe(el));

// Animate skill bars when they enter viewport
const bars = document.querySelectorAll('.skill-bar-fill');
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const bar = e.target;
      const w = bar.getAttribute('data-w');
      bar.style.setProperty('--target-width', w + '%');
      setTimeout(() => { bar.style.width = w + '%'; }, 100);
      barObserver.unobserve(bar);
    }
  });
}, { threshold: 0.3 });
bars.forEach(b => barObserver.observe(b));

// ── MOBILE MENU ──
const mobileBtn = document.getElementById('mobileMenu');
const drawer = document.getElementById('mobileDrawer');
const overlay = document.getElementById('drawerOverlay');

function openDrawer() {
  drawer.classList.add('open');
  overlay.classList.add('open');
  mobileBtn.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeDrawer() {
  drawer.classList.remove('open');
  overlay.classList.remove('open');
  mobileBtn.classList.remove('open');
  document.body.style.overflow = '';
}

mobileBtn.addEventListener('click', () => {
  drawer.classList.contains('open') ? closeDrawer() : openDrawer();
});
overlay.addEventListener('click', closeDrawer);

// Close drawer when a link is clicked
document.querySelectorAll('.drawer-link').forEach(link => {
  link.addEventListener('click', () => {
    closeDrawer();
  });
});

// Theme toggle (desktop + mobile)
function toggleTheme() {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  document.getElementById('themeToggle').textContent = isLight ? 'ESCURO' : 'TEMA';
  document.getElementById('themeToggleMobile').textContent = isLight ? '☀️ Alternar Tema' : '🌙 Alternar Tema';
}
document.getElementById('themeToggle').addEventListener('click', toggleTheme);
document.getElementById('themeToggleMobile').addEventListener('click', toggleTheme);