// ===== Menu mobile toggle =====
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

// Tutup menu mobile saat link diklik
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== Highlight menu aktif saat scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#navMenu a');

function highlightNav(){
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if(window.scrollY >= sectionTop){
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if(link.getAttribute('href') === '#' + current){
      link.classList.add('active');
    }
  });
}
window.addEventListener('scroll', highlightNav);

// ===== Animasi reveal saat scroll =====
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// ===== Lightbox galeri =====
const galleryItems = document.querySelectorAll('#galleryGrid .photo-frame');
const lightbox = document.getElementById('lightbox');
const lightboxPhoto = document.getElementById('lightboxPhoto');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');

galleryItems.forEach(item => {
  item.addEventListener('click', () => openLightbox(item));
  item.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      openLightbox(item);
    }
  });
});

function openLightbox(item){
  const img = item.querySelector('img');
  if(img){
    lightboxPhoto.innerHTML = `<img src="${img.src}" alt="${img.alt}" style="width:100%;height:100%;object-fit:contain;">`;
  } else {
    lightboxPhoto.innerHTML = item.innerHTML;
  }
  lightboxCaption.textContent = item.getAttribute('data-caption') || '';
  lightbox.classList.add('open');
  lightboxClose.focus();
}

function closeLightbox(){
  lightbox.classList.remove('open');
}
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if(e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') closeLightbox();
});

// ===== Accordion Fakta/Mitos =====
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
});

// ===== Flip kartu Fakta/Mitos + animasi stagger =====
const mitosCards = document.querySelectorAll('.mitos-card');
mitosCards.forEach((card, i) => {
  card.style.transitionDelay = (i * 0.08) + 's';
  card.addEventListener('click', () => card.classList.toggle('flipped'));
  card.setAttribute('tabindex', '0');
  card.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      card.classList.toggle('flipped');
    }
  });
});