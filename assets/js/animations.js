/* animations.js — Scroll-triggered fade-in via IntersectionObserver */

const initAnimations = () => {
  // Respect user preference for reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) return;

  const fadeElements = document.querySelectorAll('.lmy-fade-in');

  if (!fadeElements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('lmy-fade-in--visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  fadeElements.forEach(el => observer.observe(el));
};

export { initAnimations };
