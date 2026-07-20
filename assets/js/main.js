/* main.js — Bootstraps all modules */

import { initNav } from './nav.js';
import { initAnimations } from './animations.js';

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initAnimations();
  initDonation();
  initFaq();
});

/* Donation module */
const initDonation = () => {
  const amountBtns  = document.querySelectorAll('.lmy-donate__amount-btn');
  const customInput = document.getElementById('donate-custom');
  const submitBtn   = document.getElementById('donate-submit');

  if (!amountBtns.length) return;

  let selectedAmount = 10;

  amountBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      amountBtns.forEach(b => b.classList.remove('lmy-donate__amount-btn--active'));
      btn.classList.add('lmy-donate__amount-btn--active');
      selectedAmount = parseFloat(btn.dataset.amount);
      if (customInput) customInput.value = '';
    });
  });

  if (customInput) {
    customInput.addEventListener('input', () => {
      amountBtns.forEach(b => b.classList.remove('lmy-donate__amount-btn--active'));
      selectedAmount = parseFloat(customInput.value) || 0;
    });
  }

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const amount = customInput && customInput.value
        ? parseFloat(customInput.value)
        : selectedAmount;

      if (!amount || amount < 1) {
        alert('Please enter a donation amount of at least £1.');
        return;
      }

      // Placeholder — replace with real payment handler
      alert(`Thank you. Payment integration coming soon. You chose to donate £${amount}.`);
    });
  }
};

/* FAQ accordion */
const initFaq = () => {
  const questions = document.querySelectorAll('.lmy-faq__question');

  if (!questions.length) return;

  questions.forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      const answer = btn.nextElementSibling;

      // Close all
      questions.forEach(q => {
        q.setAttribute('aria-expanded', 'false');
        if (q.nextElementSibling) q.nextElementSibling.hidden = true;
      });

      // Open clicked if it was closed
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        answer.hidden = false;
      }
    });

    // Keyboard support
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });
};
