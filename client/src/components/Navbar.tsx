import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";

const Navbar = () => {
  const jwtToken = useSelector((state: RootState) => state.auth.jwtToken);

  return (
    <div className="py-6  flex justify-center items-center ">
      <div className="w-[90%]  xl:w-[1200px] flex justify-between items-center">
        <Link
          to="/"
          className="nav-title font-extrabold flex items-center  text-lg sm:text-xl h-full gap-1 cursor-pointer"
        >
          <h1 className="text-xl">groovify.fx</h1>
        </Link>
        {!jwtToken && (
          <div>
            <button
              onClick={() =>
                (window.location.href = `${import.meta.env.VITE_URL}/login`)
              }
              type="button"
              className=" lg:block px-4 py-2 text-xs bg-customLightBlue font-bold rounded-full"
            >
              Sign in with Spotify
            </button>
          </div>
        )}

        {jwtToken && (
          <div className="font-bold text-sm flex gap-5 items-center">
            <Link to="/settings">Settings</Link>
            <Link to="/account">Account</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
