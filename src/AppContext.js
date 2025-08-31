import { createContext , useState } from "react";
import { getVapidPublicKey, sendNotification, sendSubscription } from "./helper";
import { urlBase64ToUint8Array } from "./utils";
export const AppContext = createContext();

export default function AppProvider({children}) {
  const [subscribed, setSubscribed] = useState(false);

  async function subscribeToPush() {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      const reg = await navigator.serviceWorker.register("/sw.js");
      const { publicKey } = await getVapidPublicKey();
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });
      console.log("Subscription object:", sub.toJSON())

      await sendSubscription(sub.toJSON());
      setSubscribed(true);
    } else {
      alert("Push not supported in this browser!");
    }
  }

  async function sendTest() {
    const payload = {
    title: "Hello 🚀",
    body: "This is a test notification from React!",
    url: "/"
  };

  try {
    const res = await sendNotification(payload);
    console.log("Notification sent:", await res.json());
  } catch (err) {
    console.error("Failed to send notification:", err);
  }
  }

    return (
        <AppContext.Provider value={{subscribed, subscribeToPush, sendTest}}>
            {children}
        </AppContext.Provider>
    )
}