import { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Button from "../../../components/Button";
import ModalWrapper from "../../../components/ModalWrapper";
import { useSearchParams } from "react-router-dom";
import { useStopScroll } from "../../../hooks/useStopScroll";
import { SdkContext } from "../../../hooks/providers/SdkProvider";
import QRCodeElement from "./QRCodeElement";
import CoinButton from "../../../components/CoinButton";
import { FaCopy } from "react-icons/fa6";

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
        <div>
          <QRCodeElement value={token} />
          <p className="text-center text-zinc-500 text-xs">
            Long-press for QR options
          </p>
        </div>
        <div>
          <div className="max-h-20 p-2 text-xs max-w-xs lg:max-w-lg bg-zinc-900 break-words overflow-auto rounded overflow-x-hidden text-white font-xs">
            <p>{token}</p>
          </div>
          <div className="flex gap-2 w-full justify-around mt-4 text-white">
            <CoinButton
              icon={<FaCopy style={{ fill: "white" }} />}
              title="Copy"
              onClick={copyHandler}
            />
            <CoinButton
              icon={<FaCopy style={{ fill: "white" }} />}
              title="Open In Wallet"
              onClick={() => {
                window.location.href = `cashu:${token}`;
              }}
            />
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
