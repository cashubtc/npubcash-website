import { useEffect, useState } from "react";
import { FaCopy } from "react-icons/fa6";
import AlbyModal from "../../components/AlbyModal";
import { useNostr } from "../../hooks/useNostr";
import { Link } from "react-router-dom";
import { usePubkey } from "../../hooks/usePubkey";
import ProfileBox from "./components/ProfileBox";

function ClaimRoute() {
  const [balance, setBalance] = useState<number>();
  const [info, setInfo] = useState<{
    mintUrl: string;
    npub: string;
    username?: string;
  }>();
  const [token, setToken] = useState<string>();
  const nostr = useNostr();
  const pk = usePubkey();

  async function claimAllHandler() {
    const event = {
      content: "",
      kind: 27235,
      created_at: Math.floor(Date.now() / 1000),
      tags: [
        ["u", "https://cashu-address.com/api/v1/claim"],
        ["method", "GET"],
      ],
    };
    const signedEvent = await window.nostr.signEvent(event);
    const authHeader = `Nostr ${btoa(JSON.stringify(signedEvent))}`;
    const res = await fetch("https://cashu-address.com/api/v1/claim", {
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
          ["u", "https://cashu-address.com/api/v1/balance"],
          ["method", "GET"],
        ],
      };
      const signedEvent = await window.nostr.signEvent(event);
      const authHeader = `Nostr ${btoa(JSON.stringify(signedEvent))}`;
      const res = await fetch("https://cashu-address.com/api/v1/balance", {
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
    async function getInfo() {
      const event = {
        content: "",
        kind: 27235,
        created_at: Math.floor(Date.now() / 1000),
        tags: [
          ["u", "https://cashu-address.com/api/v1/info"],
          ["method", "GET"],
        ],
      };
      const signedEvent = await window.nostr.signEvent(event);
      const authHeader = `Nostr ${btoa(JSON.stringify(signedEvent))}`;
      const res = await fetch("https://cashu-address.com/api/v1/info", {
        headers: {
          Authorization: authHeader,
        },
      });
      const data = (await res.json()) as {
        mintUrl: string;
        npub: string;
        username?: string;
      };
      setInfo(data);
    }
    getBalance();
    getInfo();
  }, []);
  return (
    <main className="flex flex-col items-center mx-4 mt-6 gap-4">
      {pk ? <ProfileBox publicKey={pk} /> : undefined}
      {info ? (
        <div className="p-2 bg-zinc-800 rounded w-full max-w-xl flex flex-col items-center gap-4">
          <div className="flex flex-col items-center">
            <p>Your Cashu-Addresses</p>
            <button
              className="flex gap-1 items-center bg-gradient-to-tr from-purple-500 to-pink-500 text-transparent bg-clip-text text-sm active:text-purple-700"
              onClick={() => {
                navigator.clipboard.writeText(`${info.npub}@cashu-address.com`);
              }}
            >
              {`${info.npub.slice(0, 10)}...@cashu-address.com`}
              <FaCopy className="text-zinc-400" />
            </button>
            {info.username ? (
              <p
                className="flex gap-1 items-center bg-gradient-to-tr from-purple-500 to-pink-500 text-transparent bg-clip-text text-sm active:text-purple-700"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${info.username}@cashu-address.com`,
                  );
                }}
              >
                {`${info.username}@cashu-address.com`}
                <FaCopy className="text-zinc-400" />
              </p>
            ) : (
              <p className="text-sm mt-4">
                No Username set{" "}
                <Link
                  className="bg-gradient-to-tr from-purple-500 to-pink-500 text-transparent bg-clip-text text-sm hover:text-purple-700 active:text-purple-700"
                  to="/username"
                >
                  Claim one now!
                </Link>
              </p>
            )}
          </div>
          <div className="text-center">
            <p>Your Mint</p>
            <p className="bg-gradient-to-tr from-purple-500 to-pink-500 text-transparent bg-clip-text text-sm">
              {info.mintUrl}
            </p>
          </div>
        </div>
      ) : undefined}
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
      <AlbyModal isOpen={!nostr} />
    </main>
  );
}

export default ClaimRoute;
