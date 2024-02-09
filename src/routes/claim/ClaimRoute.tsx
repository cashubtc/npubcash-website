import { useEffect, useState } from "react";
import AlbyModal from "../../components/AlbyModal";
import { useNostr } from "../../hooks/useNostr";
import { getInfo } from "./utils";
import InfoBox from "./components/InfoBox";
import Balance from "./components/Balance";
import CoinButton from "../../components/CoinButton";
import { FaBolt, FaCoins } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";
import CashuClaimModal from "./components/CashuClaim";
import LightningClaimModal from "./components/LightningClaimModal";

function ClaimRoute() {
  const [info, setInfo] = useState<{
    mintUrl: string;
    npub: string;
    username?: string;
  }>();
  const nostr = useNostr();
  const [searchParams, setSearchParams] = useSearchParams();
  const claimMode = searchParams.get("claim");

  useEffect(() => {
    async function setup() {
      const info = await getInfo();
      setInfo(info);
    }
    if (nostr) {
      setup();
    }
  }, [nostr]);
  return (
    <main className="flex flex-col items-center mx-4 mt-6 gap-8">
      {claimMode ? <p>{claimMode}</p> : undefined}
      <Balance />
      <InfoBox info={info} />
      <div className="flex gap-8">
        <CoinButton
          title="Claim on Lightning"
          icon={<FaBolt style={{ fill: "white" }} />}
          onClick={() => {
            setSearchParams("claim=ln");
          }}
        />
        <CoinButton
          title="Claim on Cashu"
          icon={<FaCoins />}
          onClick={() => {
            setSearchParams("claim=cashu");
          }}
        />
      </div>
      <AlbyModal isOpen={!nostr} />
      {claimMode === "cashu" ? <CashuClaimModal /> : undefined}
      {claimMode === "ln" ? <LightningClaimModal /> : undefined}
    </main>
  );
}

export default ClaimRoute;
