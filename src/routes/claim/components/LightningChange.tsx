import { Proof, getEncodedToken } from "@cashu/cashu-ts";
import { useMemo } from "react";

type LightningChangeProps = {
  change: { proofs: Proof[]; mint: string };
};

function LightningChange({ change }: LightningChangeProps) {
  const amount = useMemo(() => {
    return change.proofs.reduce((a, c) => a + c.amount, 0);
  }, [change]);
  return (
    <div className="flex flex-col gap-2 items-center text-white text-center">
      <div>
        <p className="font-bold">Payment Successfull</p>
        <p>There are {amount} SATS left from fee reserve</p>
      </div>
      <div className="max-h-64 p-2 text-sm max-w-xs lg:max-w-lg bg-zinc-700 break-words overflow-auto rounded overflow-x-hidden">
        <p>
          {getEncodedToken({
            memo: "",
            token: [{ mint: change.mint, proofs: change.proofs }],
          })}
        </p>
      </div>
    </div>
  );
}

export default LightningChange;
