// EmailJS contact form handling
const PUBLIC_KEY = "6C1F8nVeYysBzes5c";
const SERVICE_ID = "service_9cybihr";
const TEMPLATE_ID = "template_lt1sxpo";

const form = document.getElementById("contact-form");

if (form && window.emailjs) {
  emailjs.init({ publicKey: PUBLIC_KEY });

  const successBox = document.getElementById("contact-success");
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Honeypot — if filled, silently drop (a bot)
    if (form.website && form.website.value.trim() !== "") {
      return;
    }

    // Native validation (required fields, email format, consent)
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const originalLabel = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form)
      .then(() => {
        form.style.display = "none";
        if (successBox) successBox.style.display = "block";
      })
      .catch((err) => {
        console.error("EmailJS error:", err);
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
        alert("Sorry, something went wrong sending your message. Please email info@celebrateable.co.uk directly.");
      });
  });
}