import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { isTokenExpired } from "../utils/token";
import { Profile } from "../types/profile.types";

const Header = () => {
  const jwtToken = useSelector((state: RootState) => state.auth.jwtToken);
  console.log("JWT TOKEN : ",isTokenExpired(jwtToken))
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    fetchProfile();
  }, []);
  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/profile", {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      console.log(res.data.data);
      setProfile(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative  h-[500px] bg-customBlue px-4">
      <div className="wrapper w-[300px] m-auto">
        <div className="grid gap-7 place-items-center    m-auto">
          <div className="grid place-items-center gap-11">
            <div className="pfp rounded-full border-4 border-white w-[150px] h-[150px] overflow-hidden">
              <img
                src={profile?.images[1].url}
                className="w-full h-full object-cover object-center rounded-full"
                alt=""
              />
            </div>

            <div className="text-2xl font-extrabold">
              {profile?.display_name}
            </div>
          </div>

          <div className="w-full grid place-items-center gap-5">
            <div className="text-center">
              <a href={profile?.external_urls.spotify} className="font-medium">
                Open in Spotify
              </a>
            </div>

            <div className="currently-playing w-full h-[70px] mb-10 bg-customLightBlue rounded-lg"></div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-[80%] navigations-wrapper   text-sm  overflow-x-auto  m-auto ">
        <div className="flex gap-[2.2rem]  text-sm font-medium">
          <div className="">
            <h1 className="pb-1">Overview</h1>
            <div className="line w-[100%] bg-customLightBlue h-1"></div>
          </div>
          <div className="pb-1">Songs</div>
          <div className="pb-1">Artists</div>
          <div className="pb-1">Albums</div>
          <div className="pb-1">Genre</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
