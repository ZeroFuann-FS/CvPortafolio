    /* =========================================
       THEME TOGGLE
    ========================================= */
    const html = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateThemeIcon(next);
    });

    function updateThemeIcon(theme) {
      themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
    }

    /* =========================================
       MOBILE MENU
    ========================================= */
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });

    function closeMobile() {
      mobileMenu.classList.remove('open');
    }

    /* =========================================
       ACTIVE NAV LINK ON SCROLL
    ========================================= */
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('section[id]');

    const observerNav = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.remove('active'));
          const active = document.querySelector(`.nav-menu a[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -60% 0px' });

    sections.forEach(s => observerNav.observe(s));

    /* =========================================
       SCROLL REVEAL
    ========================================= */
    const revealEls = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => revealObserver.observe(el));

    /* =========================================
       CONTACT FORM (Formspree integration)
    ========================================= */
    async function handleSubmit(e) {
      e.preventDefault();

      const btn = document.getElementById('submitBtn');
      const status = document.getElementById('formStatus');
      const form = document.getElementById('contactForm');

      btn.disabled = true;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

      const formData = new FormData(form);

      // Using Formspree — replace XXXX with your Formspree form ID
      // To activate: sign up at formspree.io, create a form, get the ID
      // Example: https://formspree.io/f/YOUR_FORM_ID
      const FORMSPREE_URL = 'https://formspree.io/f/xzzpgaql'; // Placeholder

      try {
        const response = await fetch(FORMSPREE_URL, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          status.className = 'form-status success';
          status.textContent = '✓ Mensaje enviado correctamente. ¡Pronto estaré en contacto!';
          form.reset();
        } else {
          throw new Error('Error en el servidor');
        }
      } catch (err) {
        status.className = 'form-status error';
        status.textContent = '✕ Algo salió mal. Escríbeme directamente a josejuanjuarezmartinez14@gmail.com';
      }

      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar mensaje';
    }

    /* =========================================
       FOOTER DATE
    ========================================= */
    const months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
    const now = new Date();
    document.getElementById('lastUpdated').textContent =
      `Última actualización: ${now.getDate()} de ${months[now.getMonth()]} de ${now.getFullYear()}`;

    /* =========================================
       DOWNLOAD CV (Placeholder)
    ========================================= */
    document.getElementById('downloadCV').addEventListener('click', (e) => {
      e.preventDefault();
      // Replace with actual CV file path when available
      alert('CV próximamente disponible.\nMientras tanto, contacta vía email: josejuanjuarezmartinez14@gmail.com');
    });
