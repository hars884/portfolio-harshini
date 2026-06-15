// Typewriter effect
const lines = [
  "Harshini A — Full-Stack Developer",
  "CS Student @ KGiSL Institute of Technology",
  "Building scalable web apps with Flask & React"
];
let lineIndex = 0;
let charIndex = 0;
let isDeleting = false;
const target = document.getElementById('typewriter');

function typeWriter() {
  const currentLine = lines[lineIndex];

  if (!isDeleting) {
    target.textContent = currentLine.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentLine.length) {
      setTimeout(() => { isDeleting = true; typeWriter(); }, 2000);
      return;
    }
  } else {
    target.textContent = currentLine.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      lineIndex = (lineIndex + 1) % lines.length;
    }
  }

  setTimeout(typeWriter, isDeleting ? 40 : 70);
}

typeWriter();

// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.style.boxShadow = '0 4px 32px rgba(0,0,0,0.4)';
  } else {
    nav.style.boxShadow = 'none';
  }
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close nav on link click
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Scroll-reveal
const revealEls = document.querySelectorAll('.skill-card, .project-card, .edu-card, .contact-card, .cert-item');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '0';
      entry.target.style.transform = 'translateY(24px)';
      setTimeout(() => {
        entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, 80 * (Array.from(revealEls).indexOf(entry.target) % 4));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 80;
    if (window.scrollY >= top) current = section.getAttribute('id');
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? '#F8F7FF' : '';
  });
});
