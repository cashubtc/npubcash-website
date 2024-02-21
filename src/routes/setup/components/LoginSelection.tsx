import { useContext, useState } from "react";
import { SdkContext } from "../../../hooks/providers/SdkProvider";
import { useNavigate } from "react-router-dom";
import { NCSDK, Nip07Signer } from "cashu-address-sdk";
import { FaKey, FaShield, FaSignature } from "react-icons/fa6";
import AlbyModal from "../../../components/AlbyModal";

function LoginSelection({
  setMethod,
}: {
  setMethod: React.Dispatch<React.SetStateAction<"nsec" | "nip46" | undefined>>;
}) {
  const [modal, setModal] = useState(false);
  const { setSdk } = useContext(SdkContext);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center gap-4 p-4 bg-zinc-800 rounded shadow-lg">
      <h1>Choose a Login Method</h1>
      <div className="flex w-full flex-col justify-center gap-2">
        <button
          className="flex items-center justify-center gap-2 bg-pink-600 font-bold px-2 py-1 rounded hover:bg-pink-700 active:bg-pink-700"
          onClick={() => {
            if (!window.nostr?.signEvent) {
              setModal(true);
              return;
            }
            const sdk = new NCSDK("https://npub.cash", new Nip07Signer());
            localStorage.setItem("sdk-method", "nip07");
            setSdk(sdk);
            navigate("/claim");
          }}
        >
          <FaSignature />
          NIP-07
        </button>
        <button
          className="flex items-center justify-center gap-2 font-bold bg-fuchsia-600 px-2 py-1 rounded hover:bg-fuchsia-700 active:bg-fuchsia-700"
          onClick={() => {
            setMethod("nip46");
          }}
        >
          <FaShield />
          NIP-46
        </button>
      </div>
      <AlbyModal isOpen={modal} />
    </div>
  );
}

export default LoginSelection;
