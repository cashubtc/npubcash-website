import { useLoaderData } from "react-router-dom";
import CardWrapper from "../../components/CardWrapper";
import AddressButton from "../claim/components/AddressButton";
import QRCode from "react-qr-code";
import { useEffect, useState } from "react";
import { pool } from "../../main";
import CoinButton from "../../components/CoinButton";
import { FaBolt } from "react-icons/fa6";
import StaticPayModal from "./components/StaticPayModal";
import { nip19 } from "nostr-tools";

function PayRoute() {
  const data = useLoaderData() as { pubkey: string; username?: string };
  const [profile, setProfile] = useState<{ picture?: string }>();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function getProfile() {
      const profileEvent = await pool.get(["wss://relay.damus.io"], {
        authors: [data.pubkey],
        kinds: [0],
      });
      if (!profileEvent) {
        return;
      }
      const profileData = JSON.parse(profileEvent?.content);
      setProfile(profileData);
    }
    getProfile();
  }, []);

  return (
    <div className="w-full flex justify-center mt-12">
      <CardWrapper>
        <div className="bg-gradient-to-tr from-purple-500 to-pink-500 shadow absolute top-[-48px] rounded-full p-0.5">
          {profile ? (
            <img
              src={profile.picture}
              className="h-24 w-24 rounded-full bg-zinc-800"
            />
          ) : (
            <div className="bg-zinc-800 w-24 h-24 rounded-full">
              <div className="bg-zinc-600 h-24 w-24 rounded-full animate-pulse" />
            </div>
          )}
        </div>
        <div className="text-center mt-8">
          <h2 className="text-2xl font-bold bg-gradient-to-tr from-purple-500 to-pink-500 text-transparent bg-clip-text">
            {data.username ? data.username : data.pubkey.slice(0, 10)}
          </h2>
        </div>
        <div className="p-4 rounded-xl bg-white">
          <QRCode size={160} value={`${data.pubkey}@npub.cash`} />
        </div>
        <div className="flex flex-col w-full gap-2">
          <AddressButton
            address={`${data.username}@npub.cash`}
            onClick={() => {
              window.navigator.clipboard.writeText(
                `${data.username}@npub.cash`,
              );
            }}
          />
          <AddressButton
            address={`${nip19
              .npubEncode(data.pubkey)
              .slice(0, 10)}...@npub.cash`}
            onClick={() => {
              window.navigator.clipboard.writeText(
                `${nip19.npubEncode(data.pubkey)}@npub.cash`,
              );
            }}
          />
        </div>
        <CoinButton
          title="Send Payment"
          icon={<FaBolt style={{ fill: "white" }} />}
          onClick={() => {
            setModalOpen(true);
          }}
        />
      </CardWrapper>
      {modalOpen ? (
        <StaticPayModal
          onClose={() => {
            setModalOpen(false);
          }}
        />
      ) : undefined}
    </div>
  );
}

export default PayRoute;
