import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Button from "../../../components/Button";
import ModalWrapper from "../../../components/ModalWrapper";
import { useSearchParams } from "react-router-dom";
import { useStopScroll } from "../../../hooks/useStopScroll";
import { SdkContext } from "../../../hooks/providers/SdkProvider";
import QRCodeElement from "./QRCodeElement";

function CashuClaim() {
  const [token, setToken] = useState<string>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [, setParams] = useSearchParams();
  const { sdk } = useContext(SdkContext);

  useStopScroll();

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
    if (sdk) {
      sdk
        .getToken()
        .then((data) => setToken(data))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [sdk]);

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
    <ModalWrapper>
      <div className="flex flex-col gap-4 items-center">
        <QRCodeElement value={token} />
        <div>
          <div className="max-h-32 p-2 text-sm max-w-xs lg:max-w-lg bg-zinc-900 break-words overflow-auto rounded overflow-x-hidden text-white font-xs">
            <p>{token}</p>
          </div>
          <div className="flex gap-2 w-full justify-center mt-2">
            <Button text="Copy" onClick={copyHandler} />
            <a
              className="bg-purple-500 px-4 py-2 rounded"
              href={`cashu:${token}`}
            >
              Claim in Wallet
            </a>
          </div>
        </div>
        <Button
          text="Close"
          onClick={() => {
            setParams(undefined);
          }}
        />
      </div>
    </ModalWrapper>
  );
}

function CashuClaimModal() {
  return createPortal(<CashuClaim />, document.getElementById("modal")!);
}

export default CashuClaimModal;
