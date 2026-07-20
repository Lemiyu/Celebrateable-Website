/* ============================================================
   CelebrateAble — Legal page jump nav
   ------------------------------------------------------------
   Highlights the "on this page" link for whichever section is
   currently in view, using IntersectionObserver. Runs only on
   pages that contain a legal jump nav. Respects reduced motion
   via the CSS scroll-behavior handling already in base.css.
   ============================================================ */

export const initLegalNav = () => {
  const nav = document.getElementById('legal-nav');
  const sections = document.querySelectorAll('.lmy-legal__section');

  if (!nav || !sections.length) return;

  const links = new Map();
  nav.querySelectorAll('a[href^="#"]').forEach((link) => {
    const id = link.getAttribute('href').slice(1);
    links.set(id, link);
  });

  const setActive = (id) => {
    links.forEach((link, key) => {
      if (key === id) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    {
      rootMargin: '-96px 0px -60% 0px',
      threshold: 0
    }
  );

  sections.forEach((section) => observer.observe(section));
};