import { useContext } from "react";
import { AppContext } from "./AppContext";

export default function App() {
  const {subscribed, subscribeToPush, sendTest} = useContext(AppContext);
  return (
    <div style={{ padding: "2rem" }}>
      <h1>React Web Push Demo</h1>
      {!subscribed ? (
        <button onClick={subscribeToPush}>Enable Notifications</button>
      ) : (
        <>
          <p>✅ Subscribed!</p>
          <button onClick={() => {
            sendTest()
          }}>Send Test Notification</button>
        </>
      )}
    </div>
  );
}
