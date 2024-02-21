import { useState } from "react";
import LoginSelection from "./components/LoginSelection";
import ConnectSigner from "./components/ConnectSigner";

function SetupRoute() {
  const [method, setMethod] = useState<"nip46" | "nsec" | undefined>();

  let content;
  if (method === "nip46") {
    content = <ConnectSigner setMethod={setMethod} />;
  } else if (method === "nsec") {
    content = <p>Nsec</p>;
  } else {
    content = <LoginSelection setMethod={setMethod} />;
  }

  return (
    <main className="flex justify-center items-center mt-16">{content}</main>
  );
}

export default SetupRoute;
