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
    <main className="p-0.5 shadow-lg bg-gradient-to-tr from-purple-500 to-pink-500 rounded-xl items-center mt-6">
      <div className="bg-zinc-800 p-8 flex flex-col gap-8 rounded-xl">
        <Balance />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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
        </div>
        <InfoBox info={info} />
        {claimMode === "cashu" ? <CashuClaimModal /> : undefined}
        {claimMode === "ln" ? <LightningClaimModal /> : undefined}
        <CoinButton
          title="Logout"
          icon={<FaDoorOpen style={{ fill: "white" }} />}
          onClick={() => {
            logout();
          }}
        />
      </div>
    </main>
  );
}

export default ClaimRoute;
