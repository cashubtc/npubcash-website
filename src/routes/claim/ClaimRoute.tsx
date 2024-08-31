import InfoBox from "./components/InfoBox";
import Balance from "./components/Balance";
import CoinButton from "../../components/CoinButton";
import {
  FaBitcoinSign,
  FaCoins,
  FaDoorOpen,
  FaMoneyBill,
} from "react-icons/fa6";
import { useNavigate, useSearchParams } from "react-router-dom";
import CashuClaimModal from "./components/CashuClaim";
import useInfo from "./hooks/useInfo";
import useLogout from "../../hooks/useLogout";
import CardWrapper from "../../components/CardWrapper";
import { useProfile } from "../../hooks/useProfile";

function ClaimRoute() {
  const [searchParams, setSearchParams] = useSearchParams();
  const claimMode = searchParams.get("claim");
  const info = useInfo();
  const logout = useLogout();
  const profile = useProfile(info?.npub);
  const navigate = useNavigate();
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
        <Balance />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CoinButton
            title="Cashu"
            icon={<FaCoins style={{ fill: "white" }} />}
            onClick={() => {
              setSearchParams("claim=cashu");
            }}
          />
          <CoinButton
            title="History"
            icon={<FaMoneyBill style={{ fill: "white" }} />}
            onClick={() => {
              if (!info) {
                return;
              }
              navigate("/history");
            }}
          />
        </div>
        <InfoBox info={info} />
        {claimMode === "cashu" ? <CashuClaimModal /> : undefined}
        <CoinButton
          title="Logout"
          icon={<FaDoorOpen style={{ fill: "white" }} />}
          onClick={() => {
            logout();
          }}
        />
      </CardWrapper>
    </div>
  );
}

export default ClaimRoute;
