import { bytesToHex } from "@noble/hashes/utils";
import { NCSDK, Nip46Signer } from "cashu-address-sdk";
import React, { useContext, useRef, useState } from "react";
import { SdkContext } from "../../../hooks/providers/SdkProvider";
import { useNavigate } from "react-router-dom";

function ConnectSigner({
  setMethod,
}: {
  setMethod: React.Dispatch<React.SetStateAction<"nsec" | "nip46" | undefined>>;
}) {
  const [signerConnecting, setSignerConnecting] = useState(false);
  const [error, setError] = useState<Error | null>();
  const inputRef = useRef<HTMLInputElement>(null);
  const { setSdk } = useContext(SdkContext);
  const navigate = useNavigate();

  async function connectHandler() {
    setError(null);
    try {
      if (
        !inputRef.current?.value ||
        !inputRef.current.value.startsWith("bunker")
      ) {
        throw new Error("Invalid Connection String...");
      }
      const array = new Uint8Array(32);
      const clientSecret = window.crypto.getRandomValues(array);
      const hex = bytesToHex(clientSecret);
      localStorage.setItem("sdk-method", "nip46");
      localStorage.setItem(
        "nip46-config",
        JSON.stringify({
          connectionString: inputRef.current!.value,
          clientSecret: hex,
        }),
      );
      const signer = new Nip46Signer(inputRef.current!.value, clientSecret);
      setSignerConnecting(true);
      await signer.connect();
      setSignerConnecting(false);
      const sdk = new NCSDK("https://npub.cash", signer);
      setSdk(sdk);
      navigate("/claim");
    } catch (e) {
      if (e instanceof Error) {
        setError(e);
      }
    } finally {
      setSignerConnecting(false);
    }
  }

  return (
    <div className="flex flex-col justify-center items-center gap-4 p-4 bg-zinc-800 rounded">
      <h1>Enter your connection string</h1>
      <div className="flex w-full flex-col justify-center gap-2">
        <input ref={inputRef} className="p-1 bg-zinc-900 rounded" />
      </div>
      {signerConnecting ? (
        <p className="text-sm text-white">Connecting...</p>
      ) : undefined}
      {error ? (
        <p className="text-sm text-red-500">{error.message}</p>
      ) : undefined}
      <div className="flex flex-col gap-4">
        <button
          onClick={connectHandler}
          className="px-2 py-1 bg-purple-600 from-purple-500 to-pink-500 rounded"
        >
          Connect Signer
        </button>
        <button
          onClick={() => {
            setMethod(undefined);
          }}
          className="border-2 border-zinc-400 px-2 py-1 rounded"
        >
          Back
        </button>
      </div>
    </div>
  );
}

export default ConnectSigner;
