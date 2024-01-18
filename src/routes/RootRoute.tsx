import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function RootRoute() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default RootRoute;
