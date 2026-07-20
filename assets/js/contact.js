/* ============================================================
   CelebrateAble — Contact form
   ------------------------------------------------------------
   - Pre-selects the enquiry dropdown from a ?subject= URL
     parameter (e.g. contact.html?subject=Volunteering), so
     links from other pages arrive with the right option chosen.
   - On submit, validates required fields, hides the form and
     shows a confirmation message. No data is sent anywhere yet
     — wire up to a real handler (Netlify Forms etc.) later.
   ============================================================ */

const prefillSubject = () => {
  const select = document.getElementById('contact-subject');
  if (!select) return;

  const params = new URLSearchParams(window.location.search);
  const subject = params.get('subject');
  if (!subject) return;

  // Only accept a value that matches an existing option.
  const match = Array.from(select.options).some((opt) => opt.value === subject);
  if (match) {
    select.value = subject;
  }
};

export const initContact = () => {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('contact-success');

  if (!form || !success) return;

  prefillSubject();

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Native validation handles required fields and the consent box.
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    form.setAttribute('data-hidden', 'true');
    success.setAttribute('data-visible', 'true');
    success.setAttribute('tabindex', '-1');
    success.focus();
  });
};