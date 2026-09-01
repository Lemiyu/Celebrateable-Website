// Cookie consent + conditional GA loading
const GA_ID = "G-JXFV1ZX2JM";
const CONSENT_COOKIE = "cb_consent";
const CONSENT_DAYS = 180;

function setConsentCookie(value) {
  const d = new Date();
  d.setTime(d.getTime() + CONSENT_DAYS * 24 * 60 * 60 * 1000);
  document.cookie = `${CONSENT_COOKIE}=${value}; expires=${d.toUTCString()}; path=/; SameSite=Lax`;
}

function getConsentCookie() {
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=([^;]*)`));
  return match ? match[1] : null;
}

function loadGA() {
  if (window.gaLoaded) return;
  window.gaLoaded = true;

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", GA_ID);
}

function hideBanner() {
  const banner = document.getElementById("cookie-banner");
  if (banner) banner.hidden = true;
}

function showBanner() {
  const banner = document.getElementById("cookie-banner");
  if (banner) banner.hidden = false;
}

function initCookieConsent() {
  const consent = getConsentCookie();

  if (consent === "accepted") {
    loadGA();
    hideBanner();
  } else if (consent === "rejected") {
    hideBanner();
  } else {
    showBanner();
  }

  const acceptBtn = document.getElementById("cookie-accept");
  const rejectBtn = document.getElementById("cookie-reject");
  const reopenLink = document.getElementById("cookie-settings-link");

  if (acceptBtn) {
    acceptBtn.addEventListener("click", () => {
      setConsentCookie("accepted");
      loadGA();
      hideBanner();
    });
  }

  if (rejectBtn) {
    rejectBtn.addEventListener("click", () => {
      setConsentCookie("rejected");
      hideBanner();
    });
  }

  if (reopenLink) {
    reopenLink.addEventListener("click", (e) => {
      e.preventDefault();
      showBanner();
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCookieConsent);
} else {
  initCookieConsent();
}