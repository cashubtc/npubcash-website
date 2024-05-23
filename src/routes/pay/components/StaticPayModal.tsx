import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import Button from "../../../components/Button";
import ModalWrapper from "../../../components/ModalWrapper";
import { useLoaderData } from "react-router-dom";
import { useStopScroll } from "../../../hooks/useStopScroll";
import QRCode from "react-qr-code";
import { nip19 } from "nostr-tools";

function PayModal({ onClose }: { onClose: () => void }) {
  const [invoice, setInvoice] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const data = useLoaderData() as { pubkey: string; username?: string };

  useStopScroll();

  async function getInvoice() {
    if (!inputRef.current?.value) {
      return;
    }
    const res = await fetch(
      `${import.meta.env.VITE_SERVER_DOMAIN}/.well-known/lnurlp/${
        data.username || nip19.npubEncode(data.pubkey)
      }?amount=${Number(inputRef.current.value) * 1000}`,
    );
    const resData = await res.json();
    setInvoice(resData.pr);
  }

  if (!invoice) {
    return (
      <ModalWrapper>
        <div className="flex flex-col gap-4 items-center">
          <p className="text-white">Enter an amount</p>
          <div className="flex gap-2 text-white items-center bg-zinc-700 p-2 rounded">
            <input
              ref={inputRef}
              type="number"
              className="w-36 bg-zinc-700 rounded"
            />
            <p>SATS</p>
          </div>
          <div className="flex gap-2">
            <Button text="Close" onClick={onClose} />
            <Button text="Request Invoice" onClick={getInvoice} />
          </div>
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
          className="flex flex-col justify-center text-white gap-2 items-center p-4 rounded bg-zinc-800"
        >
          <p>Pay this Invoice...</p>
          <div className="p-4 bg-white rounded">
            <QRCode value={invoice} />
          </div>
          <Button text="Close" onClick={onClose} />
        </dialog>
      </div>
    </>
  );
}

function StaticPayModal({ onClose }: { onClose: () => void }) {
  return createPortal(
    <PayModal onClose={onClose} />,
    document.getElementById("modal")!,
  );
}

export default StaticPayModal;
