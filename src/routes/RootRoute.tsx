import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useContext, useEffect, useState } from "react";
import { sdk, setupSdk } from "../sdk";
import { SdkContext } from "../hooks/providers/SdkProvider";

function RootRoute() {
  const [ready, setReady] = useState(false);
  const { setSdk } = useContext(SdkContext);

  useEffect(() => {
    async function setup() {
      const newSdk = await setupSdk();
      console.log(newSdk);
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
      <div className="min-h-svh">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default RootRoute;
