/* main.js — Bootstraps all modules */

import { initNav } from './nav.js';
import { initAnimations } from './animations.js';
import { initFaq } from './faq.js';
import { initMap } from './map.js';
import { initContact } from './contact.js';
import { initLegalNav } from './legal.js';


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

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initAnimations();
  initDonation();
  initFaq();
  initMap();
  initContact();
  initLegalNav();
});