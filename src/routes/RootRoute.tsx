import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContext, useEffect, useState } from "react";
import { setupSdk } from "../sdk";
import { SdkContext } from "../hooks/providers/SdkProvider";
import { AnimatePresence } from "framer-motion";

function RootRoute() {
  const [ready, setReady] = useState(false);
  const { setSdk } = useContext(SdkContext);

  useEffect(() => {
    async function setup() {
      const newSdk = await setupSdk();
      setSdk(newSdk);
      setReady(true);
    }
    setup();
  }, [setSdk]);
  if (!ready) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <svg width="0" height="0">
        <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop stopColor="#a855f7" offset="0%" />
          <stop stopColor="#d946ef" offset="100%" />
        </linearGradient>
      </svg>
      <Navbar />
      <div className="flex justify-center items-start min-h-svh">
        <AnimatePresence>
          <Outlet />
        </AnimatePresence>
      </div>
      <Footer />
    </>
  );
}

export default RootRoute;
