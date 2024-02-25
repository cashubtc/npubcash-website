import { useEffect } from "react";
import ConfettiExplosion, { ConfettiProps } from "react-confetti-explosion";
import { createPortal } from "react-dom";
import { FaCheckCircle } from "react-icons/fa";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";

const confettiProps: ConfettiProps = {
  force: 0.6,
  duration: 3000,
  particleCount: 300,
  width: 1000,
  colors: ["#9A0023", "#FF003C", "#AF739B", "#FAC7F3", "#F7DBF4"],
};

function ModalContent({
  invoice,
  onCancel,
  paid,
}: {
  invoice: string;
  onCancel: () => void;
  paid: boolean;
}) {
  const navigate = useNavigate();
  useEffect(() => {
    if (paid) {
      setTimeout(() => {
        onCancel();
        navigate("/claim");
      }, 6000);
    }
  }, [paid, onCancel, navigate]);
  return (
    <>
      <div className="inset-0 bg-black opacity-80 absolute" />
      <div className="absolute inset-0 flex justify-center items-center">
        <dialog
          open
          className="flex flex-col justify-center items-center p-4 rounded bg-zinc-800 gap-2"
        >
          {paid ? <ConfettiExplosion {...confettiProps} /> : undefined}
          <div className="p-4 bg-white rounded relative">
            {paid ? (
              <div className="absolute inset-0 flex justify-center items-center z-2 bg-white/80">
                <FaCheckCircle className="text-pink-500 text-9xl bg-white rounded-full" />
              </div>
            ) : undefined}
            <QRCode
              value={invoice}
              onClick={() => {
                navigator.clipboard.writeText(invoice);
              }}
            />
            <p className="text-xs text-black text-center">
              Click QR Code to copy
            </p>
          </div>
          <p className="text-sm">Pay this invoice to claim your username</p>
          <button
            className="px-2 py-1 bg-gradient-to-tr from-purple-500 to-pink-500 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
        </dialog>
      </div>
    </>
  );
}

function PaymentModal({
  invoice,
  paid,
  onCancel,
}: {
  invoice?: string;
  paid: boolean;
  onCancel: () => void;
}) {
  if (!invoice) {
    return null;
  }
  return createPortal(
    <ModalContent invoice={invoice} onCancel={onCancel} paid={paid} />,
    document.getElementById("modal")!,
  );
}

export default PaymentModal;
