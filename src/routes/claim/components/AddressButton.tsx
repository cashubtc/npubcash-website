import { MouseEventHandler } from "react";
import { FaCopy } from "react-icons/fa6";

type AddressButtonProps = {
  address: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

function AddressButton({ address, onClick }: AddressButtonProps) {
  return (
    <button
      onClick={onClick}
      className="p-0.5 w-full bg-gradient-to-tr from-purple-500 to-pink-500 rounded"
    >
      <div className="bg-zinc-800 px-2 py-1 rounded">
        <p className="flex gap-4 items-center justify-between text-sm bg-gradient-to-tr from-purple-500 to-pink-500 text-transparent bg-clip-text hover:text-purple-700 active:text-purple-700">
          {address}
          <FaCopy style={{ fill: "url(#blue-gradient)" }} />
        </p>
      </div>
    </button>
  );
}

export default AddressButton;
