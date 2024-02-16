import { useRef, useState } from "react";
import AlbyModal from "../../components/AlbyModal";
import { useNostr } from "../../hooks/useNostr";
import {
  authedJsonRequest,
  createAuthHeader,
  requestUsernameInvoice,
} from "../claim/utils";
import PaymentModal from "./components/PaymentModal";
import UsernameInput from "./components/UsernameInput";

function UsernameRoute() {
  const nostr = useNostr();
  const [username, setUsername] = useState("");
  const [invoice, setInvoice] = useState<string>();
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState<string>("");

  const intervalRef = useRef<NodeJS.Timeout>();

  async function clickHandler() {
    let authHeader: string;
    authHeader = await createAuthHeader(
      "https://cashu-address.com/api/v1/info/username",
      "PUT",
    );
    try {
      const res = await requestUsernameInvoice(username, authHeader);
      setInvoice(res.data.paymentRequest);
      let count = 1;
      intervalRef.current = setInterval(async () => {
        if (count % 5 === 0) {
          authHeader = await createAuthHeader(
            "https://cashu-address.com/api/v1/info/username",
            "PUT",
          );
        }
        if (count > 100) {
          return clearInterval(intervalRef.current);
        }
        const payRes = await authedJsonRequest(
          "https://cashu-address.com/api/v1/info/username",
          authHeader,
          {
            body: JSON.stringify({
              username,
              paymentToken: res.data.paymentToken,
            }),
            method: "PUT",
          },
        );
        const payData = await payRes.json();
        if (!payData.error) {
          setPaid(true);
          clearInterval(intervalRef.current);
        }
        count++;
      }, 6000);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  }

  return (
    <main className="flex flex-col justify-center items-center mt-16 gap-8 mx-4">
      <div className="flex flex-col gap-2 max-w-3xl">
        <h2 className="text-center font-bold text-4xl md:text-5xl bg-gradient-to-tr from-purple-500 to-pink-500 bg-clip-text text-transparent">
          npub.cash Username
        </h2>
        <p className="text-center">
          npub.cash works with your nostr public key out of the box. But you can
          claim an additional, human-readable username and receive payments on
          both your public key and username.
        </p>
      </div>
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center">
          <label htmlFor="username">Choose your username:</label>
          <UsernameInput username={username} setUsername={setUsername} />
        </div>
        {error ? <p className="font-bold text-red-500">{error}</p> : undefined}
        <button
          className="px-4 py-2 bg-gradient-to-tr from-purple-500 to-pink-500 rounded hover:from-purple-700 hover:to-pink-700 transition"
          onClick={clickHandler}
        >
          Claim Username (5000 SATS)
        </button>
      </div>
      <PaymentModal
        invoice={invoice}
        onCancel={() => {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
          }
          setInvoice("");
        }}
        paid={paid}
      />
      <AlbyModal isOpen={!nostr} />
    </main>
  );
}

export default UsernameRoute;
