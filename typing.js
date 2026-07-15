const typedElement = document.getElementById('typed');
if (typedElement) {
  const phrasesByLang = {
    kk: ['Python әзірлеуші', 'Толық стек әзірлеуші', 'Веб әзірлеуші'],
    en: ['Python Developer', 'Full Stack Developer', 'Web Developer'],
    ru: ['Python-разработчик', 'Full Stack разработчик', 'Веб-разработчик']
  };

  let index = 0;
  let charIndex = 0;
  let deleting = false;
  let timer = null;

  const animate = () => {
    const phrases = phrasesByLang[window.currentLang || 'kk'] || phrasesByLang.kk;
    const current = phrases[index];
    typedElement.textContent = current.slice(0, charIndex);

    if (!deleting && charIndex < current.length) {
      charIndex++;
      timer = setTimeout(animate, 90);
    } else if (!deleting && charIndex === current.length) {
      deleting = true;
      timer = setTimeout(animate, 1100);
    } else if (deleting && charIndex > 0) {
      charIndex--;
      timer = setTimeout(animate, 60);
    } else {
      deleting = false;
      index = (index + 1) % phrases.length;
      timer = setTimeout(animate, 300);
    }
  };

  window.updateTypedText = (lang) => {
    if (timer) clearTimeout(timer);
    window.currentLang = lang;
    index = 0;
    charIndex = 0;
    deleting = false;
    typedElement.textContent = '';
    animate();
  };

  animate();
}
