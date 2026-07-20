/* ============================================================
   CelebrateAble — Events map (Leaflet + OpenStreetMap)
   ------------------------------------------------------------
   Drops a pin per event and opens a branded popup on click.
   To add or edit events, update the LMY_EVENTS array below.
   Each event needs: title, date, location, lat, lng, url.

   Leaflet is loaded globally (window.L) via CDN <script> in the
   page head/body. This module reads that global and initialises
   the map only on pages that contain a #events-map element.
   ============================================================ */

const LMY_EVENTS = [
  {
    title: 'Inclusive School Disco',
    date: 'Date TBC',
    location: 'Birmingham',
    lat: 52.4862,
    lng: -1.8904,
    url: 'contact.html'
  },
  {
    title: 'Accessible Prom Experience',
    date: 'Date TBC',
    location: 'Coventry',
    lat: 52.4068,
    lng: -1.5197,
    url: 'contact.html'
  },
  {
    title: 'Community Celebration',
    date: 'Date TBC',
    location: 'Wolverhampton',
    lat: 52.5870,
    lng: -2.1288,
    url: 'contact.html'
  },
  {
    title: 'Inclusive Christmas Party',
    date: 'Date TBC',
    location: 'Solihull',
    lat: 52.4118,
    lng: -1.7776,
    url: 'contact.html'
  },
  {
    title: 'Accessible Networking',
    date: 'Date TBC',
    location: 'Warwick',
    lat: 52.2819,
    lng: -1.5849,
    url: 'contact.html'
  }
];

const escapeMapText = (value) => {
  const div = document.createElement('div');
  div.textContent = value;
  return div.innerHTML;
};

const buildPopupContent = (event) => {
  const date = escapeMapText(event.date);
  const location = escapeMapText(event.location);
  const title = escapeMapText(event.title);
  const url = encodeURI(event.url);

  return (
    '<div class="lmy-map-popup">' +
      '<p class="lmy-map-popup__meta">' + date + ' &middot; ' + location + '</p>' +
      '<h3 class="lmy-map-popup__title">' + title + '</h3>' +
      '<a class="lmy-button lmy-button--primary lmy-button--full" href="' + url + '">Find Out More</a>' +
    '</div>'
  );
};

export const initMap = () => {
  const container = document.getElementById('events-map');

  // No map on this page, or Leaflet failed to load — do nothing.
  if (!container || typeof window.L === 'undefined') return;

  const L = window.L;

  const map = L.map(container, {
    scrollWheelZoom: false
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const markerIcon = L.divIcon({
    className: 'lmy-map-pin',
    html: '<span class="lmy-map-pin__dot"></span>',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -16]
  });

  const bounds = [];

  LMY_EVENTS.forEach((event) => {
    const marker = L.marker([event.lat, event.lng], { icon: markerIcon }).addTo(map);
    marker.bindPopup(buildPopupContent(event), { closeButton: true });
    bounds.push([event.lat, event.lng]);
  });

  const fitToEvents = () => {
    if (bounds.length > 1) {
      map.fitBounds(bounds, { padding: [48, 48] });
    } else if (bounds.length === 1) {
      map.setView(bounds[0], 11);
    } else {
      map.setView([52.4862, -1.8904], 9);
    }
  };

  fitToEvents();

  // Force Leaflet to recalculate its size once layout has settled.
  // Fixes broken/scattered tiles when the container size wasn't
  // final at init (fonts loading, transitions, etc.).
  requestAnimationFrame(() => {
    map.invalidateSize();
    fitToEvents();
  });

  // Enable scroll zoom only after the map is clicked, so the page
  // still scrolls naturally when the pointer passes over the map.
  map.on('click', () => {
    map.scrollWheelZoom.enable();
  });
};