var CACHE_NAME = 'cache-v1';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registro do Service Worker bem-sucedido
    }, function(err) {
      // Falha no registro do Service Worker
    });
  });
}


self.addEventListener('install', function(event) {
});


self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          // Retorna verdadeiro se o cacheName começa com 'cache-'
          return cacheName.startsWith('cache-') && cacheName !== CACHE_NAME;
        }).map(function(cacheName) {
          // Remove o cache antigo
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// Define a lógica para execução de tarefas em intervalos regulares
setInterval(function() {
  // Coloque aqui a lógica para executar as tarefas em intervalos regulares
  cafe();
}, 600000); 

setInterval(function() {
  // Coloque aqui a lógica para executar as tarefas em intervalos regulares;
  almoco();
}, 3600000); 
