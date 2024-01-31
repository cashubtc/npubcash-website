import { NavLink } from "react-router-dom";
import Marquee from "./Marquee";

const Navbar = () => {
  return (
    <>
      <nav className="w-full h-20 bg-zinc-800">
        <div className="container mx-auto px-4 h-full">
          <div className="flex justify-between items-center h-full">
            <NavLink
              className="text-white font-black text-xl md:text-2xl"
              to="/"
            >
              <p>Cashu Address</p>
            </NavLink>
            <ul className="flex gap-x-4 text-white items-center">
              <li>
                <NavLink to={{ pathname: "/" }}>Home</NavLink>
              </li>
              <li>
                <NavLink
                  to={{ pathname: "/claim" }}
                  className="px-2 py-2 bg-gradient-to-tr from-purple-500 to-pink-500 rounded hover:from-purple-700 hover:to-pink-700 transition"
                >
                  Try it!
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Marquee />
    </>
  );
};

export default Navbar;
