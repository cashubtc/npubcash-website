import { useEffect, useState } from "react";

function ClaimRoute() {
  const [balance, setBalance] = useState<number>();
  const [token, setToken] = useState<string>();

  async function claimAllHandler() {
    const event = {
      content: "",
      kind: 27235,
      created_at: Math.floor(Date.now() / 1000),
      tags: [
        ["u", "https://cashu.my2sats.space/claim"],
        ["method", "GET"],
      ],
    };
    const signedEvent = await window.nostr.signEvent(event);
    const authHeader = `Nostr ${btoa(JSON.stringify(signedEvent))}`;
    const res = await fetch("http://192.168.2.101:8000/claim", {
      headers: {
        Authorization: authHeader,
      },
    });
    const data = await res.json();
    if (data.error) {
      return;
    }
    setToken(data.data.token);
  }

  async function copyHandler() {
    if (!token) {
      return;
    }
    try {
      await navigator.clipboard.writeText(token);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function getBalance() {
      const event = {
        content: "",
        kind: 27235,
        created_at: Math.floor(Date.now() / 1000),
        tags: [
          ["u", "https://cashu.my2sats.space/balance"],
          ["method", "GET"],
        ],
      };
      const signedEvent = await window.nostr.signEvent(event);
      const authHeader = `Nostr ${btoa(JSON.stringify(signedEvent))}`;
      const res = await fetch("http://192.168.2.101:8000/balance", {
        headers: {
          Authorization: authHeader,
        },
      });
      const data = (await res.json()) as {
        error: boolean;
        data: number;
      };
      if (!data.error) {
        setBalance(data.data);
      }
    }
    getBalance();
  }, []);
  return (
    <main className="flex flex-col items-center">
      <div className="p-2 bg-zinc-800 rounded w-full m-2 max-w-xl flex flex-col items-center">
        <p>Available balance:</p>
        <p className="bg-gradient-to-tr from-purple-500 to-pink-500 inline-block p-2 rounded text-transparent font-bold text-xl bg-clip-text shadow-black">
          {`${balance ? balance : 0} ${
            balance && balance > 1 ? "SATS" : "SAT"
          }`}
        </p>
      </div>
      {token ? (
        <div className="w-full max-w-xl">
          <div className="max-h-64 p-2 text-sm bg-zinc-800 break-words max-w-xl overflow-auto rounded overflow-x-hidden">
            <p>{token}</p>
          </div>
          <div className="flex gap-2 w-full justify-center my-4">
            <button
              className="bg-purple-500 px-4 py-2 rounded"
              onClick={copyHandler}
            >
              Copy
            </button>
            <a
              className="bg-purple-500 px-4 py-2 rounded"
              href={`cashu:${token}`}
            >
              Claim in Wallet
            </a>
          </div>
        </div>
      ) : undefined}
      <button
        className="px-4 py-2 bg-gradient-to-tr from-purple-500 to-pink-500 rounded hover:from-purple-700 hover:to-pink-700 transition"
        onClick={claimAllHandler}
      >
        Claim All
      </button>
    </main>
  );
}

export default ClaimRoute;
