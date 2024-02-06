import { useEffect, useState } from "react";
import AlbyModal from "../../components/AlbyModal";
import { useNostr } from "../../hooks/useNostr";
import { getInfo, getToken } from "./utils";
import Button from "../../components/Button";
import InfoBox from "./components/InfoBox";
import Balance from "./components/Balance";

function ClaimRoute() {
  const [info, setInfo] = useState<{
    mintUrl: string;
    npub: string;
    username?: string;
  }>();
  const [token, setToken] = useState<string>();
  const nostr = useNostr();

  async function claimAllHandler() {
    const token = await getToken();
    setToken(token);
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
    async function setup() {
      const info = await getInfo();
      setInfo(info);
    }
    if (nostr) {
      setup();
    }
  }, [nostr]);
  return (
    <main className="flex flex-col items-center mx-4 mt-6 gap-4">
      <Balance />
      <InfoBox info={info} />
      {token ? (
        <div className="w-full max-w-xl">
          <div className="max-h-64 p-2 text-sm bg-zinc-800 break-words max-w-xl overflow-auto rounded overflow-x-hidden">
            <p>{token}</p>
          </div>
          <div className="flex gap-2 w-full justify-center my-4">
            <Button text="Copy" onClick={copyHandler} />
            <a
              className="bg-purple-500 px-4 py-2 rounded"
              href={`cashu:${token}`}
            >
              Claim in Wallet
            </a>
          </div>
        </div>
      ) : undefined}
      <Button text="Claim Cashu" onClick={claimAllHandler} />
      <AlbyModal isOpen={!nostr} />
    </main>
  );
}

export default ClaimRoute;
