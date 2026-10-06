/**
 * Shravanth M - Portfolio Interactive JavaScript
 * High performance, smooth UX, modern interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initThemeToggle();
  initTypingEffect();
  initNavbarScroll();
  initMobileMenu();
  initSkillFiltering();
  initProjectModals();
  initClipboardCopy();
  initContactForm();
  initScrollReveal();
  initDynamicYear();
});

/* ==========================================================================
   1. THEME TOGGLE (DARK / LIGHT)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const htmlElement = document.documentElement;

  // Retrieve saved preference or check OS preference
  const savedTheme = localStorage.getItem('shravanth-portfolio-theme');
  if (savedTheme) {
    htmlElement.className = savedTheme;
    updateThemeIcon(savedTheme === 'light');
  } else {
    // Default to dark mode
    htmlElement.className = 'dark';
    updateThemeIcon(false);
  }

  themeToggleBtn.addEventListener('click', () => {
    const isLight = htmlElement.classList.contains('light');
    if (isLight) {
      htmlElement.classList.remove('light');
      htmlElement.classList.add('dark');
      localStorage.setItem('shravanth-portfolio-theme', 'dark');
      updateThemeIcon(false);
    } else {
      htmlElement.classList.remove('dark');
      htmlElement.classList.add('light');
      localStorage.setItem('shravanth-portfolio-theme', 'light');
      updateThemeIcon(true);
    }
  });

  function updateThemeIcon(isLight) {
    if (isLight) {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    } else {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
    }
  }
}

/* ==========================================================================
   2. TYPING EFFECT IN HERO
   ========================================================================== */
function initTypingEffect() {
  const typedTextSpan = document.getElementById('typed-text');
  if (!typedTextSpan) return;

  const textArray = [
    'AI & Machine Learning Engineering',
    'Data Analytics & Power BI Dashboards',
    'Predictive Modeling (Random Forest)',
    'Python Automation & REST APIs',
    'Full-Stack ML Integration (FastAPI + React)'
  ];

  const typingDelay = 80;
  const erasingDelay = 40;
  const newTextDelay = 1800; // Pause after typing
  let textArrayIndex = 0;
  let charIndex = 0;

  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } else {
      setTimeout(erase, newTextDelay);
    }
  }

  function erase() {
    if (charIndex > 0) {
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      textArrayIndex++;
      if (textArrayIndex >= textArray.length) textArrayIndex = 0;
      setTimeout(type, typingDelay + 300);
    }
  }

  setTimeout(type, 500);
}

/* ==========================================================================
   3. NAVBAR SCROLL & ACTIVE LINK HIGHLIGHT
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Add glass shadow on scroll
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Active link highlighting
    let current = '';
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   4. MOBILE MENU DRAWER
   ========================================================================== */
function initMobileMenu() {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!menuToggle || !navMenu) return;

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    menuToggle.classList.toggle('active');
  });

  // Close when clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      menuToggle.classList.remove('active');
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      navMenu.classList.remove('open');
      menuToggle.classList.remove('active');
    }
  });
}

/* ==========================================================================
   5. SKILL FILTERING TABS
   ========================================================================== */
function initSkillFiltering() {
  const skillTabs = document.querySelectorAll('.skill-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  skillTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      skillTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ==========================================================================
   6. PROJECT ARCHITECTURE MODALS
   ========================================================================== */
const projectData = {
  dropout: {
    title: 'AI-Based Student Dropout Prediction and Reporting System',
    badge: 'Machine Learning • Multi-Output Random Forest • Automation',
    description: `A comprehensive academic predictive framework designed to identify at-risk students before critical dropout events. Built using high-dimensional historical and ongoing behavioural and academic parameters.`,
    flow: [
      { step: 1, title: 'Data Ingestion & Preprocessing', desc: 'Ingests multidimensional academic scores, attendance records, behavioral logs, and socio-demographic indicators using Pandas & Scikit-learn pipelines.' },
      { step: 2, title: 'Multi-Output Random Forest Regressor', desc: 'Evaluates simultaneous risk factors across multiple continuous targets, yielding fine-grained dropout probabilities with ensemble robustness.' },
      { step: 3, title: 'Automated Diagnostic PDF Generation', desc: 'Uses FPDF to dynamically compile personalized visual scorecards and risk breakdowns for each student.' },
      { step: 4, title: 'SMTP Real-Time Alert Distribution', desc: 'Dispatches targeted automated email notifications with attached PDFs to students, faculty mentors, and parents for timely intervention.' }
    ],
    tech: ['Python', 'Multi-Output Random Forest', 'Scikit-learn', 'Pandas', 'NumPy', 'FPDF', 'SMTP Email Pipeline', 'Data Visualization']
  },
  crop: {
    title: 'AI-Powered Crop Advisory System with Soil & Weather Integration',
    badge: 'Smart Agriculture • IoT Telemetry • FastAPI & React',
    description: `An end-to-end intelligent agricultural decision support system that combines soil chemistry sensors and real-time meteorological forecasting to recommend optimal crop choices and cultivation sustainability.`,
    flow: [
      { step: 1, title: 'IoT Sensor Telemetry', desc: 'Captures real-time soil Nitrogen (N), Phosphorus (P), Potassium (K), moisture, and pH levels from connected IoT sensors.' },
      { step: 2, title: 'Live Meteorological Integration', desc: 'Fetches real-time weather forecasts, humidity, and rainfall estimates via RESTful Weather APIs.' },
      { step: 3, title: 'FastAPI Prediction Engine', desc: 'Processes environmental variables through an ML classification model to rank suitable crops and calculate sustainability indices.' },
      { step: 4, title: 'Interactive React.js Dashboard', desc: 'Provides agricultural workers and farmers with intuitive visual summaries, soil health cards, and crop lifecycle advisory.' }
    ],
    tech: ['Python', 'Machine Learning', 'React.js', 'FastAPI', 'IoT Telemetry', 'RESTful APIs', 'Weather APIs', 'Scikit-learn']
  }
};

function initProjectModals() {
  const modal = document.getElementById('project-modal');
  const modalContent = document.getElementById('modal-content');
  const modalClose = document.getElementById('modal-close-btn');
  const triggers = document.querySelectorAll('.project-modal-trigger');

  if (!modal || !modalContent) return;

  triggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      const data = projectData[projKey];
      if (!data) return;

      modalContent.innerHTML = `
        <span class="modal-badge">${data.badge}</span>
        <h3>${data.title}</h3>
        <p style="color: var(--text-secondary); margin-top: 0.5rem; line-height: 1.6;">${data.description}</p>
        
        <h4 style="margin-top: 1.5rem; font-size: 1.1rem; color: var(--text-primary);">System Architecture &amp; Workflow:</h4>
        <div class="modal-flow-chart">
          ${data.flow.map(f => `
            <div class="flow-step">
              <div class="flow-step-num">${f.step}</div>
              <div style="flex: 1;">
                <strong style="color: var(--text-primary);">${f.title}:</strong>
                <span style="color: var(--text-secondary); display: block; font-size: 0.85rem; margin-top: 0.2rem;">${f.desc}</span>
              </div>
            </div>
          `).join('')}
        </div>

        <h4 style="margin-top: 1.25rem; font-size: 0.95rem; color: var(--text-primary);">Technologies Applied:</h4>
        <div class="project-tech-stack" style="margin-top: 0.5rem; margin-bottom: 0;">
          ${data.tech.map(t => `<span class="tech-tag" style="background: rgba(59, 130, 246, 0.12); color: var(--accent-cyan); border-color: rgba(59, 130, 246, 0.25);">${t}</span>`).join('')}
        </div>
      `;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   7. CLIPBOARD COPY WITH TOAST NOTIFICATION
   ========================================================================== */
function initClipboardCopy() {
  const copyBtns = document.querySelectorAll('.copy-btn');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  copyBtns.forEach(btn => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      try {
        await navigator.clipboard.writeText(textToCopy);
        showToast(`Copied: "${textToCopy}" to clipboard!`);
        
        // Button visual feedback
        const icon = btn.querySelector('i');
        if (icon) {
          icon.className = 'fa-solid fa-check';
          setTimeout(() => {
            icon.className = 'fa-regular fa-copy';
          }, 2000);
        }
      } catch (err) {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`Copied to clipboard!`);
      }
    });
  });

  function showToast(msg) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
}

/* ==========================================================================
   8. CONTACT FORM SUBMISSION
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('portfolio-contact-form');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !subject || !message) {
      alert('Please fill out all fields.');
      return;
    }

    // Construct mailto link
    const mailtoLink = `mailto:1hk23ai049@hkbk.edu.in?subject=${encodeURIComponent(`[Portfolio] ${subject}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;

    // Open mail client
    window.location.href = mailtoLink;

    if (toast && toastMessage) {
      toastMessage.textContent = 'Opening your email client to send message...';
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 4000);
    }

    contactForm.reset();
  });
}

/* ==========================================================================
   9. INTERSECTION OBSERVER FOR SCROLL REVEALS
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-fade');

  if (!('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // Reveal once
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   10. DYNAMIC YEAR IN FOOTER
   ========================================================================== */
function initDynamicYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}
