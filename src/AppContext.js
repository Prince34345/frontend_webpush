import { createContext, useState } from "react";
import { getVapidPublicKey, sendSubscription, sendNotification } from "./helper";
import { urlBase64ToUint8Array } from "./utils";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [subscribed, setSubscribed] = useState(false);

async function subscribeToPush() {
  if (!("serviceWorker" in navigator && "PushManager" in window)) {
    alert("Push not supported");
    return;
  }

  const registration = await navigator.serviceWorker.register('/sw.js', { scope: '/' });

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    alert('Notification permission denied');
    return;
  }

  const { publicKey } = await getVapidPublicKey();

  const sub = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicKey),
  });

  await sendSubscription(sub);

  setSubscribed(true);
}

  async function sendTest() {
    await sendNotification({
      title: "Hello 🚀",
      body: "This is a test notification!",
      url: "/"
    });
  }

  return (
    <AppContext.Provider value={{ subscribed, subscribeToPush, sendTest }}>
      {children}
    </AppContext.Provider>
  );
}
