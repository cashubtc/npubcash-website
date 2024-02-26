import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";
import CardWrapper from "../../../components/CardWrapper";
import * as nip49 from "nostr-tools/nip49";
import { hexToBytes } from "@noble/hashes/utils";
import { nip19 } from "nostr-tools";
import { NCSDK, NsecSigner } from "cashu-address-sdk";
import { SdkContext } from "../../../hooks/providers/SdkProvider";

function NcryptSetup({
  setMethod,
}: {
  setMethod: React.Dispatch<
    React.SetStateAction<"ncrypt" | "nip46" | undefined>
  >;
}) {
  const [skInput, setSkInput] = useState("");
  const [sk, setSk] = useState<Uint8Array>();
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const passRef = useRef<HTMLInputElement>(null);
  const passRef2 = useRef<HTMLInputElement>(null);
  const { setSdk } = useContext(SdkContext);

  useEffect(() => {
    setError("");
    setSk("");
    const timer = setTimeout(() => {
      if (skInput && !skInput.startsWith("nsec")) {
        setError("Invalid private key. Expected nsec / ncrypt / hex");
      } else {
        try {
          const bytes = nip19.decode(skInput as `nsec1${string}`).data;
          setSk(bytes);
        } catch (e) {
          setError("Error while parsing");
        }
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [skInput]);

  async function loginHandler() {
    setError("");
    if (!passRef?.current || !passRef2.current) {
      return;
    }
    if (passRef.current.value !== passRef2.current.value) {
      setError("Passphrases do not match");
      return;
    }
    const encrypted = nip49.encrypt(sk, passRef.current.value);
    localStorage.setItem("sdk-method", "ncrypt");
    localStorage.setItem("ncrypt-config", encrypted);
    const sdk = new NCSDK("https://npub.cash", new NsecSigner(sk));
    setSdk(sdk);
    // navigate("/claim")
  }

  return (
    <div className="w-full flex justify-center ">
      <CardWrapper>
        <h2>Login with nsec / ncrypt </h2>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex w-full flex-col gap-1 justify-center">
            <label className="text-xs">Private Key</label>
            <input
              ref={inputRef}
              type="password"
              className="p-1 bg-zinc-900 rounded"
              onChange={(e) => {
                setSkInput(e.target.value);
              }}
            />
          </div>
          <AnimatePresence>
            {sk ? (
              <motion.div
                initial={{ opacity: 0, translateY: -50 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-1 "
              >
                <label className="text-xs">Choose Passphrase</label>
                <input
                  ref={passRef}
                  className="p-1 bg-zinc-900 rounded"
                  type="password"
                />

                <label className="text-xs">Confirm Passphrase</label>
                <input
                  ref={passRef2}
                  className="p-1 bg-zinc-900 rounded"
                  type="password"
                />
              </motion.div>
            ) : undefined}
          </AnimatePresence>
        </div>
        {error ? <p className="text-sm text-red-500">{error}</p> : undefined}
        <div className="flex flex-col gap-4">
          <button
            onClick={loginHandler}
            className="px-2 py-1 bg-purple-600 from-purple-500 to-pink-500 rounded"
          >
            Login
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
      </CardWrapper>
    </div>
  );
}

export default NcryptSetup;
