import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";

const Footer = () => {
  const jwtToken = useSelector((state: RootState) => state.auth.jwtToken);

  return (
    <div className=" flex justify-center">
      <div className="grid grid-cols-3 w-full sm:w-[90%] bg-customBlue xl:w-[1200px] py-12 ">
        <div className="grid gap-5">
          <Link to="/" className="font-extrabold   cursor-pointer">
            <h1 className="text-sm">groovify</h1>
          </Link>
          <p className="text-xs ">
            Track your spotify stats & never stop the groove with groovify
            spotify stats
          </p>
          <p className="text-xs text-gray-500">
            Music data, artist images, album covers, and song previews are
            provided by Spotify. Spotify is a trademark of Spotify AB.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
