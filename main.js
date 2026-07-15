const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');
const progressBar = document.querySelector('.scroll-progress');
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const progress = height > 0 ? (scrollTop / height) * 100 : 0;
  if (progressBar) {
    progressBar.style.width = `${progress}%`;
  }
  backToTop?.classList.toggle('visible', scrollTop > 600);

  sections.forEach((section) => {
    const top = section.offsetTop - 120;
    const bottom = top + section.offsetHeight;
    if (scrollTop >= top && scrollTop < bottom) {
      navItems.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${section.id}`);
      });
    }
  });
});

backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

window.observeRevealElements = (elements = document.querySelectorAll('.reveal')) => {
  elements.forEach((el) => {
    if (!el.classList.contains('active')) {
      revealObserver.observe(el);
    }
  });
};

window.observeRevealElements();

const counters = document.querySelectorAll('.counter');
if (counters.length > 0) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const target = Number(entry.target.dataset.target);
      let current = 0;
      const step = Math.max(1, Math.floor(target / 60));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        entry.target.textContent = `${current}+`;
      }, 30);
      counterObserver.unobserve(entry.target);
    });
  }, { threshold: 0.7 });
  counters.forEach((counter) => counterObserver.observe(counter));
}

const testimonials = Array.from(document.querySelectorAll('.testimonial-card'));
let testimonialIndex = 0;
if (testimonials.length > 0) {
  setInterval(() => {
    testimonials.forEach((card) => card.classList.remove('active'));
    testimonialIndex = (testimonialIndex + 1) % testimonials.length;
    testimonials[testimonialIndex]?.classList.add('active');
  }, 4000);
}

const contactForm = document.getElementById('contact-form');
contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const button = contactForm.querySelector('button');
  const defaultText = button.textContent;
  const successText = {
    kk: 'Хабар жіберілді',
    en: 'Message sent',
    ru: 'Сообщение отправлено'
  }[window.currentLang || 'kk'] || 'Message sent';

  button.textContent = successText;
  button.disabled = true;
  setTimeout(() => {
    button.textContent = defaultText;
    button.disabled = false;
    contactForm.reset();
  }, 1800);
});
