import { useEffect, useState } from "react";
import { getToken } from "../utils";
import { createPortal } from "react-dom";
import Button from "../../../components/Button";
import ModalWrapper from "../../../components/ModalWrapper";
import { useSearchParams } from "react-router-dom";
import { useStopScroll } from "../../../hooks/useStopScroll";

function CashuClaim() {
  const [token, setToken] = useState();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [, setParams] = useSearchParams();

  useStopScroll();

  async function claimAllHandler() {
    try {
      const token = await getToken();
      setToken(token);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
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
    claimAllHandler();
  }, []);

  if (loading) {
    return (
      <ModalWrapper>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-white">Loading Token...</p>
          <Button text="Close" onClick={() => setParams(undefined)} />
        </div>
      </ModalWrapper>
    );
  }

  if (error) {
    return (
      <ModalWrapper>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-white">{error}</p>
          <Button text="Close" onClick={() => setParams(undefined)} />
        </div>
      </ModalWrapper>
    );
  }

  return (
    <>
      <div className="inset-0 bg-black opacity-80 absolute" />
      <div className="absolute inset-0 flex justify-center items-center">
        <dialog
          open
          className="flex flex-col justify-center items-center p-4 rounded bg-zinc-800"
        >
          <div>
            <div className="max-h-64 p-2 text-sm max-w-xs lg:max-w-lg bg-zinc-700 break-words overflow-auto rounded overflow-x-hidden">
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
          <Button text="Close" onClick={() => setParams(undefined)} />
        </dialog>
      </div>
    </>
  );
}

function CashuClaimModal() {
  return createPortal(<CashuClaim />, document.getElementById("modal")!);
}

export default CashuClaimModal;
