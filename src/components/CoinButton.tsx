import { ReactNode } from "react";

type CoinButtonProps = {
  icon: ReactNode;
  title: string;
  onClick: () => void;
};

function CoinButton({ icon, title, onClick }: CoinButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col gap-2 items-center max-w-16 hover:text-purple-700 active:text-purple-700"
    >
      <div className="bg-gradient-to-tr from-purple-500 to-pink-500 p-2 rounded-full">
        {icon}
      </div>
      <p className="text-sm">{title}</p>
    </button>
  );
}

export default CoinButton;
