import { useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Button from "../../../components/Button";
import ModalWrapper from "../../../components/ModalWrapper";
import { useSearchParams } from "react-router-dom";
import { useStopScroll } from "../../../hooks/useStopScroll";
import { SdkContext } from "../../../hooks/providers/SdkProvider";
import QRCodeElement from "./QRCodeElement";
import CoinButton from "../../../components/CoinButton";
import { FaCopy } from "react-icons/fa6";
import { getDecodedToken } from "@cashu/cashu-ts";
import WarningBox from "../../../components/WarningBox";

function Confirmation() {
  const [, setParams] = useSearchParams();

  const checkRef = useRef<HTMLInputElement>(null);

  useStopScroll();

  return (
    <ModalWrapper>
      <div className="max-w-screen-sm flex flex-col items-center gap-8 text-white text-center">
        <p className="text-xl font-bold">Create Token?</p>
        <p className="text-justify text-zinc-400">
          Please confirm your withdrawal. In order to optimise mint operations
          npub.cash will mark your proofs as spent once the token is displayed.
          You can always display it again in the History Tab{" "}
        </p>

        <div className="flex gap-2 text-xs">
          <label htmlFor="check">Don't show this again</label>
          <input type="checkbox" id="check" ref={checkRef} />
        </div>
        <div className="flex justify-around gap-8">
          <Button
            text="Confirm"
            onClick={() => {
              if (checkRef.current?.checked) {
                localStorage.setItem("npc_auto_confirm", "true");
              }
              setParams("claim=cashu");
            }}
          />
          <button
            className="px-4 py-2 text-white bg-zinc-700 rounded hover:from-purple-700 hover:to-pink-700 transition"
            onClick={() => {
              setParams("");
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}

function ConfirmationModal() {
  return createPortal(<Confirmation />, document.getElementById("modal")!);
}

export default ConfirmationModal;
