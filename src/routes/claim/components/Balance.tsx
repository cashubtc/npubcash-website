import { useContext, useEffect, useState } from "react";
import { SdkContext } from "../../../hooks/providers/SdkProvider";

function Balance() {
  const [balance, setBalance] = useState<number>();
  const [error, setError] = useState<string>();
  const { sdk } = useContext(SdkContext);
  useEffect(() => {
    if (sdk) {
      sdk.getBalance().then((data) => setBalance(data));
    }
  }, [sdk]);
  console.log(balance);
  if (error) {
    return (
      <div className="p-2 bg-zinc-800 rounded w-full m-2 max-w-xl flex flex-col items-center">
        <p>Unable to get balance...</p>
      </div>
    );
  }
  return (
    <div className="p-2 rounded w-full m-2 max-w-xl flex flex-col items-center">
      <p className="bg-gradient-to-tr from-purple-500 to-pink-500 inline-block p-2 rounded text-transparent font-bold text-3xl bg-clip-text shadow-black">
        {`${balance ? balance : 0} ${balance && balance > 1 ? "SATS" : "SAT"}`}
      </p>
    </div>
  );
}

export default Balance;
