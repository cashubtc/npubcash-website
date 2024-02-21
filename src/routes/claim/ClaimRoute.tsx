import InfoBox from "./components/InfoBox";
import Balance from "./components/Balance";
import CoinButton from "../../components/CoinButton";
import { FaBolt, FaCoins, FaDoorOpen } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";
import CashuClaimModal from "./components/CashuClaim";
import LightningClaimModal from "./components/LightningClaimModal";
import useInfo from "./hooks/useInfo";
import useLogout from "../../hooks/useLogout";

function ClaimRoute() {
  const [searchParams, setSearchParams] = useSearchParams();
  const claimMode = searchParams.get("claim");
  const info = useInfo();
  const logout = useLogout();

  return (
    <main className="flex flex-col items-center mx-4 mt-6 gap-8">
      <Balance />
      <InfoBox info={info} />
      <div className="flex gap-8 border-t-2 border-zinc-800 pt-8">
        <CoinButton
          title="Claim on Lightning"
          icon={<FaBolt style={{ fill: "white" }} />}
          onClick={() => {
            setSearchParams("claim=ln");
          }}
        />
        <CoinButton
          title="Claim on Cashu"
          icon={<FaCoins style={{ fill: "white" }} />}
          onClick={() => {
            setSearchParams("claim=cashu");
          }}
        />
        <CoinButton
          title="Logout"
          icon={<FaDoorOpen style={{ fill: "white" }} />}
          onClick={() => {
            logout();
          }}
        />
      </div>
      {claimMode === "cashu" ? <CashuClaimModal /> : undefined}
      {claimMode === "ln" ? <LightningClaimModal /> : undefined}
    </main>
  );
}

export default ClaimRoute;
