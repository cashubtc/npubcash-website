import { FaCopy } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

type UsernameButtonProps = {
  username?: string;
};

function UsernameButton({ username }: UsernameButtonProps) {
  const navigate = useNavigate();
  if (!username) {
    return (
      <button
        onClick={() => {
          navigate("/username");
        }}
        className="p-0.5 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full"
      >
        <div className="bg-zinc-900 px-2 py-1 rounded-full">
          <p className="flex gap-1 items-center text-xs bg-gradient-to-tr from-purple-500 to-pink-500 text-transparent bg-clip-text hover:text-purple-700 active:text-purple-700">
            No username... Claim one!
          </p>
        </div>
      </button>
    );
  }
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(`${username}@npub.cash`);
      }}
      className="p-0.5 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full"
    >
      <div className="bg-zinc-900 px-2 py-1 rounded-full">
        <p className="flex gap-1 items-center text-xs bg-gradient-to-tr from-purple-500 to-pink-500 text-transparent bg-clip-text hover:text-purple-700 active:text-purple-700">
          {`${username}@npub.cash`}
          <FaCopy className="text-purple-500" />
        </p>
      </div>
    </button>
  );
}

export default UsernameButton;
