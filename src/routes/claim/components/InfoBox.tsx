import AddressButton from "./AddressButton";
import UsernameButton from "./UsernameButton";

type InfoBoxProps = {
  info?: {
    mintUrl: string;
    npub: string;
    username?: string;
  };
};

function InfoBox({ info }: InfoBoxProps) {
  if (!info) {
    return (
      <div className="p-0.5 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full">
        <div className="bg-zinc-900 px-2 py-1 rounded-full">
          <p className="flex gap-1 items-center text-xs bg-gradient-to-tr from-purple-500 to-pink-500 text-transparent bg-clip-text active:text-purple-700">
            Loading...
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex w-full flex-col items-center gap-2">
      <AddressButton
        address={`${info.npub.slice(0, 10)}...@npub.cash`}
        onClick={() => {
          window.navigator.clipboard.writeText(`${info.npub}@npub.cash`);
        }}
      />
      <UsernameButton username={info.username} />
    </div>
  );
}

export default InfoBox;
