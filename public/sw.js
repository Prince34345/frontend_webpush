self.addEventListener('push', (event) => {
  let data = { title: 'Test', body: 'Default message', url: '/' };

  if (event.data) {
    try { data = event.data.json(); }
    catch { data.body = event.data.text(); }
  }

  const title = data.title || 'Notification';
  const body = data.body || 'You have a message';
  const url = data.url || '/';

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      icon: '/logo192.png',
      data: { url },
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification && event.notification.data && event.notification.data.url) || '/';
  event.waitUntil(clients.openWindow(url));
});