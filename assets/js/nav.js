/* nav.js — Mobile nav toggle with smooth slide transition */

const initNav = () => {
  const nav     = document.getElementById('main-nav');
  const toggle  = document.getElementById('nav-toggle');
  const menu    = document.getElementById('mobile-menu');

  if (!nav || !toggle || !menu) return;

  const openNav = () => {
    nav.classList.add('lmy-nav--open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation menu');
  };

  const closeNav = () => {
    nav.classList.remove('lmy-nav--open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open navigation menu');
  };

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    nav.classList.contains('lmy-nav--open') ? closeNav() : openNav();
  });

  // Close on any link click inside mobile menu
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) closeNav();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('lmy-nav--open')) {
      closeNav();
      toggle.focus();
    }
  });
};

export { initNav };
