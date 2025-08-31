export const API_BASE = "http://localhost:8000";

export async function getVapidPublicKey() {
  const res = await fetch(`${API_BASE}/vapid/public`);
  return res.json();
}

export async function sendSubscription(sub) {
  return fetch(`${API_BASE}/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sub),
  });
}

export async function sendNotification(payload) {
  return fetch(`${API_BASE}/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
}
