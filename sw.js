/* Time Híbrido — service worker
   Objetivo: o app abrir e funcionar sem internet, mas ainda assim pegar
   atualizações quando houver rede.

   Estratégia:
   - navegação (abrir o app)  → rede primeiro, cache como rede de segurança
   - demais arquivos          → cache primeiro, com atualização em segundo plano

   Ao publicar uma versão nova, suba o número de VERSAO: isso descarta o
   cache antigo e força o download dos arquivos atualizados.                */

const VERSAO = 'th-1';
const ARQUIVOS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', evento => {
  evento.waitUntil(
    caches.open(VERSAO)
      .then(cache => cache.addAll(ARQUIVOS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', evento => {
  evento.waitUntil(
    caches.keys()
      .then(chaves => Promise.all(chaves.filter(k => k !== VERSAO).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', evento => {
  const req = evento.request;
  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== location.origin) return;

  // Abrir o app: tenta a rede para pegar versão nova; sem rede, usa o cache.
  if (req.mode === 'navigate') {
    evento.respondWith(
      fetch(req)
        .then(resp => {
          const copia = resp.clone();
          caches.open(VERSAO).then(c => c.put('./index.html', copia));
          return resp;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Ícones e manifesto: cache primeiro, revalidando por trás.
  evento.respondWith(
    caches.match(req).then(cacheado => {
      const daRede = fetch(req)
        .then(resp => {
          if (resp && resp.ok) {
            const copia = resp.clone();
            caches.open(VERSAO).then(c => c.put(req, copia));
          }
          return resp;
        })
        .catch(() => cacheado);
      return cacheado || daRede;
    })
  );
});
