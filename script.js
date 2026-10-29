/**
 * SAFI AHMAD - CYBERNETIC MULTI-PAGE CV & PORTFOLIO
 * Vanilla JavaScript Controller (Multi-Page Architecture)
 * Navigation Highlighting, Mobile Drawer, Copy-to-Clipboard, Form Submissions & Skills Filter
 */

document.addEventListener('DOMContentLoaded', () => {

  // -------------------------------------------------------------------------
  // 01. ACTIVE PAGE NAVIGATION AUTO-HIGHLIGHT
  // -------------------------------------------------------------------------
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });

  // -------------------------------------------------------------------------
  // 02. MOBILE NAVIGATION DRAWER TOGGLE
  // -------------------------------------------------------------------------
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (mobileDrawer.classList.contains('open') && 
          !mobileDrawer.contains(e.target) && 
          !mobileToggle.contains(e.target)) {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // -------------------------------------------------------------------------
  // 03. COPY EMAIL TO CLIPBOARD
  // -------------------------------------------------------------------------
  const copyBtn = document.getElementById('btn-copy-email');
  const copyText = document.getElementById('copy-text');
  const emailAddress = 'safiahmad.dev@gmail.com';

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(emailAddress);
        } else {
          const temp = document.createElement('textarea');
          temp.value = emailAddress;
          document.body.appendChild(temp);
          temp.select();
          document.execCommand('copy');
          document.body.removeChild(temp);
        }

        if (copyText) copyText.textContent = 'Copied!';
        copyBtn.classList.add('copied');

        setTimeout(() => {
          if (copyText) copyText.textContent = 'Copy';
          copyBtn.classList.remove('copied');
        }, 2500);
      } catch (err) {
        if (copyText) copyText.textContent = 'Copied!';
        setTimeout(() => {
          if (copyText) copyText.textContent = 'Copy';
        }, 2500);
      }
    });
  }

  // -------------------------------------------------------------------------
  // 04. SKILLS FILTER TABS (ON SKILLS.HTML)
  // -------------------------------------------------------------------------
  const filterTabs = document.querySelectorAll('.filter-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  if (filterTabs.length > 0 && skillCards.length > 0) {
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const filter = tab.getAttribute('data-filter');

        // Toggle active button style
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Filter cards
        skillCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
              card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
            }, 20);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // -------------------------------------------------------------------------
  // 05. CONTACT FORM DISPATCH (ON CONTACT.HTML)
  // -------------------------------------------------------------------------
  const contactForm = document.getElementById('portfolio-contact-form');
  const submitBtn = document.getElementById('btn-submit-message');
  const submitText = document.getElementById('submit-button-text');
  const successToast = document.getElementById('form-success-toast');

  if (contactForm && submitBtn && submitText && successToast) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      submitBtn.disabled = true;
      submitText.textContent = 'Sending...';

      setTimeout(() => {
        submitText.textContent = 'Sent';
        successToast.classList.add('visible');
        contactForm.reset();

        setTimeout(() => {
          submitBtn.disabled = false;
          submitText.textContent = 'Send Message';
          successToast.classList.remove('visible');
        }, 4000);
      }, 850);
    });
  }

  // -------------------------------------------------------------------------
  // 06. RESUME DOWNLOAD TRIGGER
  // -------------------------------------------------------------------------
  const resumeCtas = document.querySelectorAll('.btn-resume-trigger');
  resumeCtas.forEach(cta => {
    cta.addEventListener('click', () => {
      window.print();
    });
  });

  // -------------------------------------------------------------------------
  // 07. INTERACTIVE MOUSE-TRACKING SPOTLIGHT
  // -------------------------------------------------------------------------
  const panels = document.querySelectorAll('.glass-panel');
  panels.forEach(panel => {
    panel.addEventListener('mousemove', (e) => {
      const rect = panel.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      panel.style.background = `radial-gradient(circle 280px at ${x}px ${y}px, rgba(0, 242, 254, 0.08), rgba(22, 27, 34, 0.78) 70%)`;
    });

    panel.addEventListener('mouseleave', () => {
      panel.style.background = '';
    });
  });

});
