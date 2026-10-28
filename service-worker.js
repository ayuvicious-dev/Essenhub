const CACHE = 'essenhub-v1';
const SHELL = ['./', './index.html', './firebase-config.js', './manifest.json',
  './icons/icon-192.png', './icons/icon-512.png', './icons/favicon-32.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const r = e.request, u = new URL(r.url);
  if (r.method !== 'GET') return;
  // Biarkan Firestore & Auth lewat jaringan langsung
  if (/googleapis\.com|firebaseio\.com|firebaseapp\.com/.test(u.host) && !/fonts\./.test(u.host)) return;
  const sameOrigin = u.origin === location.origin;
  const cdn = /gstatic\.com|fonts\.googleapis\.com/.test(u.host);
  if (!sameOrigin && !cdn) return;
  if (r.mode === 'navigate') {
    // Halaman: jaringan dulu, cache sebagai cadangan offline
    e.respondWith(fetch(r).then(res => { caches.open(CACHE).then(c => c.put('./index.html', res.clone())); return res; })
      .catch(() => caches.match('./index.html')));
    return;
  }
  // Aset lain: cache dulu sambil diperbarui di belakang layar
  e.respondWith(caches.match(r).then(hit => {
    const net = fetch(r).then(res => { if (res.ok) caches.open(CACHE).then(c => c.put(r, res.clone())); return res; }).catch(() => hit);
    return hit || net;
  }));
});
