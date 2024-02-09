import { useEffect, useRef, useState } from "react";
import { getToken } from "../utils";
import { createPortal } from "react-dom";
import Button from "../../../components/Button";
import ModalWrapper from "../../../components/ModalWrapper";
import { useSearchParams } from "react-router-dom";
import { useStopScroll } from "../../../hooks/useStopScroll";
import useDecodedToken from "../../../hooks/useDecodedToken";
import useTokenAmount from "../../../hooks/useTokenAmount";
import { CashuMint, CashuWallet, Proof } from "@cashu/cashu-ts";
import LightningChange from "./LightningChange";

function LightningClaim() {
  const [token, setToken] = useState<string>();
  const [error, setError] = useState<string>();
  const [lnError, setLnError] = useState<string>();
  const [lnLoading, setLnLoading] = useState(false);
  const [change, setChange] = useState<{ proofs: Proof[]; mint: string }>();
  const [loading, setLoading] = useState(true);
  const [, setParams] = useSearchParams();

  const inputRef = useRef<HTMLInputElement>(null);

  useStopScroll();

  const decodedToken = useDecodedToken(token);
  const { tokenAmount, lightningFees } = useTokenAmount(decodedToken);

  useEffect(() => {
    claimAllHandler();
  }, []);

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
  async function payInvoice() {
    setLnError("");
    setLnLoading(true);
    try {
      if (!inputRef.current || !inputRef.current.value || !decodedToken) {
        throw new Error("Please paste a valid Lightning invoice");
      }
      const wallet = new CashuWallet(new CashuMint(decodedToken.token[0].mint));
      const proofs = decodedToken.token.map((entry) => entry.proofs).flat();
      const res = await wallet.payLnInvoice(inputRef.current.value, proofs);
      setChange({ proofs: res.change, mint: decodedToken.token[0].mint });
    } catch (e) {
      if (e instanceof Error) {
        setLnError(e.message);
      }
    } finally {
      setLnLoading(false);
    }
  }

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

  if (token && tokenAmount && lightningFees) {
    return (
      <>
        <div className="inset-0 bg-black opacity-80 absolute" />
        <div className="absolute inset-0 flex justify-center items-center">
          <dialog
            open
            className="flex flex-col justify-center items-center gap-4 max-w-xs sm:max-w-sm p-4 rounded bg-zinc-800"
          >
            <div className="flex flex-col items-center text-white text-center">
              <p>
                Please paste an Lightning Invoice for{" "}
                {tokenAmount - lightningFees} SATS
              </p>
              <p className="text-xs text-zinc-500">
                {lightningFees} SATS are reserved for Lightning Fees. Change can
                be claimed using a cashu wallet.
              </p>
            </div>
            <div className="flex flex-col items-center">
              {!change ? (
                <input
                  className={`bg-zinc-900 rounded p-2 text-zinc-500 ${
                    lnError ? "border-red-500 border-2" : ""
                  }`}
                  placeholder="lnbc1..."
                  ref={inputRef}
                />
              ) : (
                <LightningChange change={change} />
              )}
              {lnError ? (
                <p className="text-red-500 text-sm">{lnError}</p>
              ) : undefined}
              {lnLoading ? <p className="text-sm">Paying...</p> : undefined}
            </div>
            <div className="flex gap-4">
              <Button text="Pay Invoice" onClick={payInvoice} />
              <Button text="Close" onClick={() => setParams(undefined)} />
            </div>
          </dialog>
        </div>
      </>
    );
  }
}

function LightningClaimModal() {
  return createPortal(<LightningClaim />, document.getElementById("modal")!);
}

export default LightningClaimModal;
