import { useState } from "react";
import LoginSelection from "./components/LoginSelection";
import ConnectSigner from "./components/ConnectSigner";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

function SetupRoute() {
  const [method, setMethod] = useState<"nip46" | "nsec" | undefined>();
  const location = useLocation();

  let content;
  if (method === "nip46") {
    content = <ConnectSigner setMethod={setMethod} />;
  } else if (method === "nsec") {
    content = <p>Nsec</p>;
  } else {
    content = <LoginSelection setMethod={setMethod} />;
  }

  return (
    <motion.main
      initial={{ opacity: 0, translateX: -100 }}
      animate={{ opacity: 1, translateX: 0 }}
      exit={{ opacity: 0, translateX: 100 }}
      className="flex justify-center items-center mt-16"
      key={location.pathname}
    >
      {content}
    </motion.main>
  );
}

export default SetupRoute;
