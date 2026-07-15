const projectsByLang = {
  kk: [
    {
      title: 'Сөйлеу бұзылығын анықтау жүйесі',
      badge: 'AI / ML',
      description: 'Hugging Face Spaces жобасы: аудио немесе мәтін арқылы сөйлеу бұзылығын анықтап, нәтижені интерактивті интерфейс арқылы көрсетеді.',
      technologies: 'Python · Gradio · Hugging Face Spaces',
      image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80',
      github: '',
      demo: 'https://ruslanhiniz-speech-disorder-detection.hf.space/'
    },
    {
      title: 'Онлайн қызмет көрсету сайты',
      badge: 'Web',
      description: 'Пайдаланушыға арналған қызметтерді көрсету, формалар мен әкімшілік бөлімі бар толыққанды веб-платформа.',
      technologies: 'HTML · CSS · JavaScript',
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80',
      github: '',
      demo: '#'
    },
    {
      title: 'Python автоматтандыру боты',
      badge: 'Automation',
      description: 'Рутиндік тапсырмаларды автоматтандыру үшін жазылған Python негізіндегі бот және API интеграциялары.',
      technologies: 'Python · Telegram API · Requests',
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&q=80',
      github: '',
      demo: '#'
    }
  ],
  en: [
    {
      title: 'Speech disorder detection system',
      badge: 'AI / ML',
      description: 'A Hugging Face Spaces project that detects speech disorders from audio or text input and presents the outcome in an interactive interface.',
      technologies: 'Python · Gradio · Hugging Face Spaces',
      image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80',
      github: '',
      demo: 'https://ruslanhiniz-speech-disorder-detection.hf.space/'
    },
    {
      title: 'Online service website',
      badge: 'Web',
      description: 'A full web platform for presenting services, collecting requests, and managing an admin area.',
      technologies: 'HTML · CSS · JavaScript',
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80',
      github: '',
      demo: '#'
    },
    {
      title: 'Python automation bot',
      badge: 'Automation',
      description: 'A Python-based bot for routine task automation with API integrations and simple workflow logic.',
      technologies: 'Python · Telegram API · Requests',
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&q=80',
      github: '',
      demo: '#'
    }
  ],
  ru: [
    {
      title: 'Система определения нарушений речи',
      badge: 'AI / ML',
      description: 'Проект на Hugging Face Spaces, который определяет нарушения речи по аудио или текстовому вводу и отображает результат в понятном интерфейсе.',
      technologies: 'Python · Gradio · Hugging Face Spaces',
      image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80',
      github: '',
      demo: 'https://ruslanhiniz-speech-disorder-detection.hf.space/'
    },
    {
      title: 'Сайт онлайн-услуг',
      badge: 'Web',
      description: 'Полноценная веб-платформа для презентации услуг, форм обратной связи и административной панели.',
      technologies: 'HTML · CSS · JavaScript',
      image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80',
      github: '',
      demo: '#'
    },
    {
      title: 'Python-бот для автоматизации',
      badge: 'Automation',
      description: 'Автоматизационный бот на Python с интеграциями API и простой логикой рабочих процессов.',
      technologies: 'Python · Telegram API · Requests',
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&w=1200&q=80',
      github: '',
      demo: '#'
    }
  ]
};

function renderProjects(lang = 'kk') {
  const container = document.getElementById('projects-list');
  const projects = projectsByLang[lang] || projectsByLang.kk;
  const demoLabel = {
    kk: 'Демоны ашу',
    en: 'Open demo',
    ru: 'Открыть демо'
  }[lang] || 'Open demo';
  if (!container) return;

  container.innerHTML = projects.map((project) => `
    <article class="project-card reveal">
      <div class="project-media">
        <img src="${project.image}" alt="${project.title}" />
      </div>
      <div class="project-card-content">
        <div class="project-topline">
          <span class="project-badge">${project.badge}</span>
        </div>
        <h3>${project.title}</h3>
        <p class="project-meta">${project.technologies}</p>
        <p>${project.description}</p>
        <div class="project-links">
          ${project.github ? `<a class="btn btn-secondary" href="${project.github}" target="_blank" rel="noreferrer">GitHub</a>` : ''}
          ${project.demo && project.demo !== '#' ? `<a class="btn btn-primary" href="${project.demo}" target="_blank" rel="noreferrer">${demoLabel}</a>` : ''}
        </div>
      </div>
    </article>
  `).join('');

  window.observeRevealElements?.(container.querySelectorAll('.reveal'));
}

window.renderProjects = renderProjects;

document.addEventListener('DOMContentLoaded', () => {
  renderProjects(window.currentLang || 'kk');
});
