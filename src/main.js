import './style.css';
import lilyAvatar from './assets/lily.jpeg';

const ANIM = {
  FADE_DURATION_MS: 300,
  SLIDE_DISTANCE_PX: 30,
  STAGGER_DELAY_MS: 64,
  PAGE_TRANSITION_MS: 180,
  SPRING_BEZIER: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  ENTER_BEZIER: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
  POP_DURATION_MS: 240,
};

document.addEventListener('DOMContentLoaded', () => {
  const faviconLink = document.querySelector("link[rel='icon']");
  if (faviconLink) {
    faviconLink.type = 'image/jpeg';
    faviconLink.href = lilyAvatar;
  }

  const illustrationAvatar = document.getElementById('illustration-avatar');
  if (illustrationAvatar) illustrationAvatar.src = lilyAvatar;

  const navAvatarImg = document.getElementById('nav-avatar-img');
  if (navAvatarImg) navAvatarImg.src = lilyAvatar;

  if (window.lucide) window.lucide.createIcons();

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  generateGitHubCalendar();
  initShareModal();
  initProjectModals();
  initThemeToggle();
  initHeaderScroll();
  initMobileMenu();
  initScrollReveal();
  initStaggerReveal(prefersReducedMotion);
  initContactForm();
  initClock();
  initHeroInteractivity();
  initScrollInteractivity();
  initContactCopy();
  initMouseClickEffect();
  initScrollspy();
  initBackToTop();

  renderProjects();
  renderCertifications();
});

const projectDatabase = {
  'nutriscan-mbg': {
    title: 'NutriScan MBG',
    desc: 'AI-powered web platform for food detection and nutrition analysis using computer vision. Built as a multidisciplinary capstone project focused on reliable image segmentation and nutrition analysis workflows.',
    tags: ['Python', 'TensorFlow', 'Computer Vision', 'U-Net', 'MobileNetV2'],
    focus: 'Capstone project showcase',
    date: 'June 2026',
    year: '2026',
    icon: 'scan-eye',
    iconColor: '#0ea5e9',
    bgColor: '#e0f2fe',
    links: [
      { text: 'Repository', icon: 'github', url: 'https://github.com/delissesu/NutriScan-MBG' },
      { text: 'Live Demo', icon: 'globe', url: 'https://nutriscan-mbg.vercel.app' },
    ]
  },
  'citech': {
    title: 'CITECH',
    desc: 'Web-based registration management system for a carnival technology web design competition. Built to streamline participant registration and simplify admin review.',
    tags: ['Laravel', 'PHP', 'MySQL', 'Google OAuth', 'TailwindCSS'],
    focus: 'Registration workflow',
    date: 'June 2026',
    year: '2026',
    icon: 'globe',
    iconColor: '#a855f7',
    bgColor: '#f3e8ff',
    links: [
      { text: 'Repository', icon: 'github', url: 'https://github.com/delissesu/CITECH' },
      { text: 'Live Demo', icon: 'globe', url: 'https://citech.ukmlaos.com/' },
    ]
  },
  'suara-mawa': {
    title: 'Suara MAWA',
    desc: 'Mobile application for student aspiration management and reporting. Designed to centralize submissions and make follow-up easier for students and administrators.',
    tags: ['Mobile', 'Flutter', 'Dart', 'REST API'],
    focus: 'Aspiration reporting',
    date: 'June 2026',
    year: '2026',
    icon: 'message-square',
    iconColor: '#ec4899',
    bgColor: '#ffe4e6',
    links: [
      { text: 'Repository', icon: 'github', url: 'https://github.com/delissesu/Suara-MAWA' },
      // { text: 'Live Demo', icon: 'globe', url: 'https://github.com/delissesu' },
    ]
  },
  'kopdes-merah-putih': {
    title: 'KOPDES Merah Putih',
    desc: 'Web application focused on CFG-based testing, white-box testing, and black-box testing practices during software verification.',
    tags: ['PHP', 'Software Testing', 'CFG', 'White Box', 'Black Box'],
    focus: 'Testing workflow',
    date: 'June 2026',
    year: '2026',
    icon: 'shield-check',
    iconColor: '#f59e0b',
    bgColor: '#fef3c7',
    links: [
      { text: 'Repository', icon: 'github', url: 'https://github.com/delissesu/KOPDES-Merah-Putih' },
      // { text: 'Live Demo', icon: 'globe', url: 'https://github.com/delissesu' },
    ]
  },
  'asistenku': {
    title: 'ASISTENKU',
    desc: 'Web application for laboratory assistant recruitment management. Built to automate evaluation and selection workflows across departments.',
    tags: ['Web App', 'PHP', 'MySQL', 'Bootstrap'],
    focus: 'Recruitment workflow',
    date: 'January 2026',
    year: '2026',
    icon: 'users',
    iconColor: '#006e2f',
    bgColor: '#cbfbe0',
    links: [
      { text: 'Repository', icon: 'github', url: 'https://github.com/delissesu/ASISTENKU' },
      // { text: 'Live Demo', icon: 'globe', url: 'https://github.com/delissesu' },
    ]
  },
  'flofa': {
    title: 'FLOFA',
    desc: 'Educational game-based learning application for Indonesian flora and fauna recognition with music gamification.',
    tags: ['Game Dev', 'Education', 'Gamification', 'Music'],
    focus: 'Game-based learning',
    date: 'January 2026',
    year: '2026',
    icon: 'leaf',
    iconColor: '#0d8a43',
    bgColor: '#e2f9ec',
    links: [
      { text: 'Repository', icon: 'github', url: 'https://github.com/delissesu/Flofa-Game-Based-Learning' },
      // { text: 'Live Demo', icon: 'globe', url: 'https://github.com/delissesu' },
    ]
  }
};

const projectKeys = Object.keys(projectDatabase);
let lastFocusedElement = null;

function setModalState(modal, isOpen) {
  if (!modal) return;
  modal.classList.toggle('active', isOpen);
  modal.setAttribute('aria-hidden', String(!isOpen));
  if (isOpen) {
    lastFocusedElement = document.activeElement;
    const focusTarget = modal.querySelector('button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])');
    if (focusTarget) focusTarget.focus();
  } else if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
}

const certifications = [
  { title: 'Membangun Proyek Deep Learning Tingkat Mahir', issuer: 'Dicoding Indonesia', date: 'June 2026' },
  { title: 'Belajar Penerapan Data Science dengan Microsoft Fabric', issuer: 'Dicoding Indonesia', date: 'June 2026' },
  { title: 'Belajar Back-End Pemula dengan JavaScript', issuer: 'Dicoding Indonesia', date: 'February 2026' },
  { title: 'Use Machine Learning APIs on Google Cloud', issuer: 'Google', date: 'January 2026' },
  { title: 'Build Serverless Applications with Cloud Run Functions', issuer: 'Google', date: 'January 2026' },
  { title: 'Python for Data Science, AI & Development', issuer: 'Coursera & IBM', date: 'February 2025' },
];

const PROJECTS_PER_PAGE = 3;
const CERTS_PER_PAGE = 3;
let currentProjectPage = 0;
let currentCertPage = 0;

function renderProjects() {
  const container = document.getElementById('projects-list-container');
  const paginationContainer = document.getElementById('projects-pagination');
  if (!container) return;

  if (projectKeys.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="text-align: center; padding: 48px; border: 3px dashed var(--outline-color); border-radius: 16px; background-color: var(--surface-container); margin: 16px 0;">
        <i data-lucide="folder-open" style="width: 48px; height: 48px; margin: 0 auto 16px auto; color: var(--text-muted); display: block;"></i>
        <p style="font-family: var(--font-heading); font-weight: 700; font-size: 16px; margin: 0;">Tidak ada proyek saat ini.</p>
      </div>`;
    if (paginationContainer) paginationContainer.innerHTML = '';
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  const totalPages = Math.ceil(projectKeys.length / PROJECTS_PER_PAGE);
  const start = currentProjectPage * PROJECTS_PER_PAGE;
  const pageKeys = projectKeys.slice(start, start + PROJECTS_PER_PAGE);

  container.style.opacity = '0';
  container.style.transform = 'translateY(12px)';

  setTimeout(() => {
    container.innerHTML = '';
    pageKeys.forEach((key, idx) => {
      const data = projectDatabase[key];
      const isFirst = idx === 0 && currentProjectPage === 0;
      container.innerHTML += `
        <div class="project-row clicky-interactive" data-project="${key}" style="cursor: pointer;">
          <div class="project-row-left">
            <span class="project-year">${data.year}</span>
            <h3 class="project-name">${data.title}</h3>
            <div class="project-row-links">
              ${data.links.map(l => `<a href="${l.url}" target="_blank" rel="noopener noreferrer">${l.text} ↗</a>`).join('')}
            </div>
          </div>
          <div class="project-row-right">
            <p class="project-desc">${data.desc}</p>
            <div class="project-tags-row">
              ${data.tags.map(t => `<span class="skill-tag-minimal">${t}</span>`).join('')}
            </div>
          </div>
        </div>`;
    });

    container.querySelectorAll('.project-row').forEach(row => {
      row.addEventListener('click', (e) => {
        if (e.target.closest('.project-row-links')) return;
        openProjectModal(row.getAttribute('data-project'));
      });
    });

    container.style.opacity = '1';
    container.style.transform = 'translateY(0)';

    const rows = container.querySelectorAll('.project-row');
    rows.forEach((row, idx) => {
      row.style.opacity = '0';
      row.style.transform = `translateY(${ANIM.SLIDE_DISTANCE_PX}px)`;
      setTimeout(() => {
        row.style.transition = `opacity ${ANIM.FADE_DURATION_MS}ms ${ANIM.ENTER_BEZIER}, transform ${ANIM.FADE_DURATION_MS}ms ${ANIM.SPRING_BEZIER}`;
        row.style.opacity = '1';
        row.style.transform = 'translateY(0)';
      }, idx * ANIM.STAGGER_DELAY_MS);
    });
  }, ANIM.PAGE_TRANSITION_MS);

  if (paginationContainer) {
    renderPagination(paginationContainer, totalPages, currentProjectPage, (page) => {
      currentProjectPage = page;
      renderProjects();
    });
  }
}

function renderCertifications() {
  const container = document.getElementById('certs-list-container');
  const paginationContainer = document.getElementById('certs-pagination');
  if (!container) return;

  if (certifications.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="text-align: center; padding: 32px; border: 3px dashed var(--outline-color); border-radius: 16px; background-color: var(--surface-container); margin: 16px 0;">
        <i data-lucide="award" style="width: 40px; height: 40px; margin: 0 auto 12px auto; color: var(--text-muted); display: block;"></i>
        <p style="font-family: var(--font-heading); font-weight: 700; font-size: 14px; margin: 0;">Tidak ada sertifikasi saat ini.</p>
      </div>`;
    if (paginationContainer) paginationContainer.innerHTML = '';
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  const totalPages = Math.ceil(certifications.length / CERTS_PER_PAGE);
  const start = currentCertPage * CERTS_PER_PAGE;
  const pageCerts = certifications.slice(start, start + CERTS_PER_PAGE);

  container.style.opacity = '0';
  container.style.transform = 'translateY(12px)';

  setTimeout(() => {
    container.innerHTML = '';
    pageCerts.forEach(cert => {
      container.innerHTML += `
        <div class="education-item clicky-interactive">
          <span class="education-date">${cert.date}</span>
          <h3>${cert.title}</h3>
          <div class="education-school">${cert.issuer}</div>
        </div>`;
    });

    container.style.opacity = '1';
    container.style.transform = 'translateY(0)';

    const items = container.querySelectorAll('.education-item');
    items.forEach((item, idx) => {
      item.style.opacity = '0';
      item.style.transform = `translateY(${ANIM.SLIDE_DISTANCE_PX}px)`;
      setTimeout(() => {
        item.style.transition = `opacity ${ANIM.FADE_DURATION_MS}ms ${ANIM.ENTER_BEZIER}, transform ${ANIM.FADE_DURATION_MS}ms ${ANIM.SPRING_BEZIER}`;
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, idx * ANIM.STAGGER_DELAY_MS);
    });
  }, ANIM.PAGE_TRANSITION_MS);

  if (paginationContainer) {
    renderPagination(paginationContainer, totalPages, currentCertPage, (page) => {
      currentCertPage = page;
      renderCertifications();
    });
  }
}

function renderPagination(container, totalPages, currentPage, onPageChange) {
  if (totalPages <= 1) { container.innerHTML = ''; return; }

  container.innerHTML = '';

  const prevBtn = document.createElement('button');
  prevBtn.className = 'pagination-btn clicky-interactive';
  prevBtn.innerHTML = '<i data-lucide="chevron-left"></i>';
  prevBtn.setAttribute('aria-label', 'Previous page');
  prevBtn.disabled = currentPage === 0;
  prevBtn.addEventListener('click', () => onPageChange(currentPage - 1));
  container.appendChild(prevBtn);

  for (let i = 0; i < totalPages; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.className = `pagination-btn pagination-num clicky-interactive ${i === currentPage ? 'active' : ''}`;
    pageBtn.textContent = i + 1;
    pageBtn.setAttribute('aria-label', `Go to page ${i + 1}`);
    if (i === currentPage) pageBtn.setAttribute('aria-current', 'page');
    pageBtn.addEventListener('click', () => onPageChange(i));
    container.appendChild(pageBtn);
  }

  const nextBtn = document.createElement('button');
  nextBtn.className = 'pagination-btn clicky-interactive';
  nextBtn.innerHTML = '<i data-lucide="chevron-right"></i>';
  nextBtn.setAttribute('aria-label', 'Next page');
  nextBtn.disabled = currentPage === totalPages - 1;
  nextBtn.addEventListener('click', () => onPageChange(currentPage + 1));
  container.appendChild(nextBtn);

  if (window.lucide) window.lucide.createIcons();
}

function openProjectModal(projectId) {
  const detailModal = document.getElementById('project-detail-modal');
  const data = projectDatabase[projectId];
  if (!data || !detailModal) return;

  document.getElementById('project-detail-title').innerText = data.title;
  document.getElementById('project-detail-desc').innerText = data.desc;
  document.getElementById('project-detail-date').innerText = data.date;
  document.getElementById('project-detail-focus').innerText = data.focus;

  const visualContainer = document.getElementById('project-detail-visual-container');
  visualContainer.style.backgroundColor = data.bgColor;
  visualContainer.innerHTML = `<i data-lucide="${data.icon}" style="color: ${data.iconColor}; width: 80px; height: 80px;"></i>`;

  const tagsContainer = document.getElementById('project-detail-tags');
  tagsContainer.innerHTML = '';
  const pastelClasses = ['tag-pastel-green', 'tag-pastel-blue', 'tag-pastel-yellow', 'tag-pastel-pink', 'tag-pastel-purple', 'tag-pastel-orange'];
  data.tags.forEach((tag, idx) => {
    const span = document.createElement('span');
    span.className = `tech-tag ${pastelClasses[idx % pastelClasses.length]}`;
    span.innerText = tag;
    tagsContainer.appendChild(span);
  });

  const linksContainer = document.getElementById('project-detail-links');
  linksContainer.innerHTML = '';
  data.links.forEach(link => {
    if (link.url) {
      const a = document.createElement('a');
      a.className = 'btn btn-primary clicky-interactive';
      a.href = link.url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.innerHTML = `${link.text} <i data-lucide="${link.icon}" style="width: 16px; height: 16px;"></i>`;
      linksContainer.appendChild(a);
    }
  });

  if (window.lucide) window.lucide.createIcons();
  setModalState(detailModal, true);
}

function initProjectModals() {
  const detailModal = document.getElementById('project-detail-modal');
  const closeBtn = document.getElementById('project-detail-close');
  if (!detailModal) return;

  const closeModalFunc = () => setModalState(detailModal, false);
  if (closeBtn) closeBtn.addEventListener('click', closeModalFunc);
  detailModal.addEventListener('click', (e) => {
    if (e.target === detailModal) closeModalFunc();
  });
}

function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const bodyElement = document.body;
  const syncThemeButton = () => {
    const isDark = bodyElement.classList.contains('dark-theme');
    if (!themeToggleBtn) return;
    themeToggleBtn.setAttribute('aria-pressed', String(isDark));
    themeToggleBtn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
  };
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    bodyElement.classList.remove('light-theme');
    bodyElement.classList.add('dark-theme');
  } else {
    bodyElement.classList.remove('dark-theme');
    bodyElement.classList.add('light-theme');
  }
  syncThemeButton();
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      if (bodyElement.classList.contains('dark-theme')) {
        bodyElement.classList.remove('dark-theme');
        bodyElement.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
      } else {
        bodyElement.classList.remove('light-theme');
        bodyElement.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
      }
      syncThemeButton();
    });
  }
}

function initMobileMenu() {
  const mobileToggleBtn = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  if (!mobileToggleBtn || !navMenu) return;

  const menuIcon = mobileToggleBtn.querySelector('.menu-icon');
  const closeIcon = mobileToggleBtn.querySelector('.close-icon');
  const syncMenuButton = () => {
    const isOpen = navMenu.classList.contains('active');
    mobileToggleBtn.setAttribute('aria-expanded', String(isOpen));
    mobileToggleBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  };

  mobileToggleBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
    syncMenuButton();
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
      syncMenuButton();
    });
  });
  syncMenuButton();
}

function initHeaderScroll() {
  const mainHeader = document.getElementById('main-header');
  if (!mainHeader) return;
  window.addEventListener('scroll', () => {
    mainHeader.classList.toggle('scrolled', window.scrollY > 50);
  });
}

function initScrollReveal() {
  const revealElements = document.querySelectorAll('.scroll-reveal');
  const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;
    revealElements.forEach(el => {
      if (el.getBoundingClientRect().top < triggerBottom) {
        el.classList.add('revealed');
      }
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();
}

function generateGitHubCalendar() {
  const calendar = document.getElementById('github-calendar');
  if (!calendar) return;

  const totalCells = 53 * 7;
  const now = new Date();
  const startDate = new Date();
  startDate.setDate(now.getDate() - totalCells);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  for (let i = 0; i < totalCells; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    const cell = document.createElement('div');
    cell.classList.add('calendar-cell');

    const dayOfWeek = currentDate.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    let level = 0;
    const rand = Math.random();
    if (rand > 0.8) level = isWeekend ? Math.floor(Math.random() * 2) : Math.floor(Math.random() * 5);
    else if (rand > 0.5) level = isWeekend ? 0 : Math.floor(Math.random() * 3);
    else if (rand > 0.2) level = isWeekend ? 0 : Math.floor(Math.random() * 2);

    cell.setAttribute('data-level', level);
    const dateStr = `${currentDate.getDate()} ${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
    const contributions = level === 0 ? 'No contributions' : `${level * 3 + Math.floor(Math.random() * 3)} contributions`;
    cell.setAttribute('data-tooltip', `${contributions} on ${dateStr}`);
    calendar.appendChild(cell);
  }
}

function initShareModal() {
  const shareBtn = document.getElementById('share-btn');
  const shareModal = document.getElementById('share-modal');
  const closeBtn = document.getElementById('share-modal-close');
  const copyBtn = document.getElementById('share-copy-btn');
  const copyInput = document.getElementById('share-url-input');
  if (!shareModal) return;

  const openShare = () => {
    if (copyInput) copyInput.value = window.location.href;
    setModalState(shareModal, true);
  };

  if (shareBtn) shareBtn.addEventListener('click', openShare);
  const heroShareBtn = document.getElementById('hero-share-btn');
  if (heroShareBtn) heroShareBtn.addEventListener('click', openShare);

  const closeModalFunc = () => setModalState(shareModal, false);
  if (closeBtn) closeBtn.addEventListener('click', closeModalFunc);
  shareModal.addEventListener('click', (e) => { if (e.target === shareModal) closeModalFunc(); });

  if (copyBtn && copyInput) {
    copyBtn.addEventListener('click', () => {
      copyInput.select();
      navigator.clipboard.writeText(copyInput.value).then(() => {
        const originalText = copyBtn.innerText;
        copyBtn.innerText = 'Copied!';
        copyBtn.setAttribute('aria-label', 'Profile URL copied');
        copyBtn.style.backgroundColor = '#6bff8f';
        copyBtn.style.color = '#007432';
        setTimeout(() => { copyBtn.innerText = originalText; copyBtn.removeAttribute('aria-label'); copyBtn.style.backgroundColor = ''; copyBtn.style.color = ''; }, 2000);
      }).catch(err => console.error('Failed to copy text: ', err));
    });
  }

  shareModal.querySelectorAll('.share-btn-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const platform = btn.getAttribute('data-platform');
      const shareUrl = encodeURIComponent(window.location.href);
      const shareText = encodeURIComponent("Check out Aditya Dwi Ferdiansyah's portfolio - AI Engineer & Backend Developer!");
      let finalUrl = '';
      switch (platform) {
        case 'twitter': finalUrl = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`; break;
        case 'linkedin': finalUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`; break;
        case 'facebook': finalUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`; break;
        case 'whatsapp': finalUrl = `https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`; break;
        case 'mail': finalUrl = `mailto:?subject=${shareText}&body=Please visit:%20${shareUrl}`; break;
      }
      if (finalUrl) {
        const shareWindow = window.open(finalUrl, '_blank', 'noopener,noreferrer');
        if (shareWindow) shareWindow.opener = null;
      }
    });
  });
}

function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('form-submit-btn');
  const statusMsg = document.getElementById('form-status-msg');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const name = formData.get('name') || '';
    const email = formData.get('email') || '';
    const subject = formData.get('subject') || 'Portfolio inquiry';
    const message = formData.get('message') || '';
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailtoUrl = `mailto:21adtydwf@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const formElements = contactForm.querySelectorAll('input, textarea, button');
    formElements.forEach(el => el.disabled = true);
    submitBtn.setAttribute('aria-busy', 'true');

    submitBtn.innerHTML = 'Opening email app... <i data-lucide="loader" class="animate-spin" style="width: 16px; height: 16px; display: inline-block;"></i>';
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      window.location.href = mailtoUrl;
      statusMsg.className = 'form-status success';
      statusMsg.textContent = 'Your email app should open with the message ready to send.';
      statusMsg.classList.remove('hidden');

      formElements.forEach(el => el.disabled = false);
      submitBtn.setAttribute('aria-busy', 'false');
      submitBtn.innerHTML = 'Send Message';
      if (window.lucide) window.lucide.createIcons();
      setTimeout(() => statusMsg.classList.add('hidden'), 5000);
    }, 250);
  });
}

function initClock() {
  const timeElement = document.getElementById('nav-time');
  if (!timeElement) return;
  function updateClock() {
    try {
      const formatter = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', hour12: false });
      timeElement.innerText = `${formatter.format(new Date())} WIB`;
    } catch {
      const now = new Date();
      timeElement.innerText = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;
    }
  }
  setInterval(updateClock, 1000);
  updateClock();
}

function initHeroInteractivity() {
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual) {
    const elements = [
      { el: document.getElementById('hero-browser-card'), factor: -0.06 },
      { el: document.getElementById('hero-profile-card'), factor: 0.04 },
      { el: heroVisual.querySelector('.quote-circle'), factor: -0.09 },
      { el: heroVisual.querySelector('.art-code-pill'), factor: 0.07 },
      { el: heroVisual.querySelector('.star-1'), factor: 0.12 },
      { el: heroVisual.querySelector('.star-2'), factor: -0.08 }
    ];

    heroVisual.addEventListener('mousemove', (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      elements.forEach(item => {
        if (item.el) {
          item.el.style.transform = `translate(${x * item.factor}px, ${y * item.factor}px)`;
          item.el.style.transition = 'transform 0.05s ease-out';
        }
      });
    });

    heroVisual.addEventListener('mouseleave', () => {
      elements.forEach(item => {
        if (item.el) { item.el.style.transform = ''; item.el.style.transition = 'transform 0.5s ease-in-out'; }
      });
    });
  }

  const browserCard = document.getElementById('hero-browser-card');
  const browserUrl = document.getElementById('hero-browser-url');
  if (browserCard && browserUrl) {
    const urls = ['github.com/delissesu', 'linkedin.com/in/adtydwf', 'unej.ac.id'];
    let index = 0;
    browserCard.addEventListener('click', () => {
      index = (index + 1) % urls.length;
      browserUrl.innerText = urls[index];
      browserCard.classList.add('pop-anim');
      setTimeout(() => browserCard.classList.remove('pop-anim'), ANIM.POP_DURATION_MS);
    });
  }

  const profileCard = document.getElementById('hero-profile-card');
  if (profileCard) {
    const roles = ['AI Engineer', 'Backend Developer', 'Teaching Assistant', 'Software Engineer'];
    let roleIndex = 0;
    profileCard.addEventListener('click', () => {
      roleIndex = (roleIndex + 1) % roles.length;
      const nameEl = profileCard.querySelector('.profile-card-name');
      if (nameEl) {
        nameEl.innerText = roles[roleIndex];
        profileCard.classList.add('pop-anim');
        setTimeout(() => profileCard.classList.remove('pop-anim'), ANIM.POP_DURATION_MS);
      }
    });
  }
}

function initScrollInteractivity() {
  window.addEventListener('scroll', () => {
    const asterisks = document.querySelectorAll('.asterisk-glyph');
    const rotation = window.scrollY * 0.15;
    asterisks.forEach(el => {
      el.style.transform = `rotate(${rotation}deg)`;
      el.style.display = 'inline-block';
    });
  });
}

function initContactCopy() {
  document.querySelectorAll('.contact-detail-item').forEach(item => {
    item.addEventListener('click', () => {
      const valueEl = item.querySelector('p');
      if (!valueEl) return;
      navigator.clipboard.writeText(valueEl.innerText.trim()).then(() => {
        const heading = item.querySelector('h4');
        if (!heading) return;
        const originalText = heading.innerText;
        heading.innerText = 'Copied!';
        heading.style.color = 'var(--primary-container)';
        item.classList.add('pop-anim');
        setTimeout(() => { heading.innerText = originalText; heading.style.color = ''; item.classList.remove('pop-anim'); }, 1500);
      }).catch(err => console.error('Failed to copy text: ', err));
    });
  });
}

function initStaggerReveal(prefersReducedMotion) {

  const staggerContainers = document.querySelectorAll(
    '.about-focus-list, .skill-tags-minimal-wrapper, .layout-two-col, .contact-social-row, .hero-actions, .hero-contact-info'
  );

  if (prefersReducedMotion) {

    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const children = entry.target.children;
      Array.from(children).forEach((child, idx) => {
        child.style.opacity = '0';
        child.style.transform = `translateY(${ANIM.SLIDE_DISTANCE_PX}px)`;

        setTimeout(() => {
          child.style.transition = `opacity ${ANIM.FADE_DURATION_MS}ms ${ANIM.ENTER_BEZIER}, transform ${ANIM.FADE_DURATION_MS}ms ${ANIM.SPRING_BEZIER}`;
          child.style.opacity = '1';
          child.style.transform = 'translateY(0)';
        }, idx * ANIM.STAGGER_DELAY_MS);
      });

      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.15,
    rootMargin: '-50px'
  });

  staggerContainers.forEach(container => observer.observe(container));
}

function initMouseClickEffect() {
  document.addEventListener('click', (e) => {

    const ring = document.createElement('div');
    ring.className = 'brutal-click-ring';

    ring.style.left = `${e.pageX}px`;
    ring.style.top = `${e.pageY}px`;

    document.body.appendChild(ring);

    setTimeout(() => {
      ring.remove();
    }, 400);
  });
}

function initScrollspy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (sections.length === 0 || navLinks.length === 0) return;

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const activeModals = document.querySelectorAll('.modal-overlay.active');
    activeModals.forEach(modal => setModalState(modal, false));
  }
});
