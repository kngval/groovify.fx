import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { Profile } from "../types/profile.types";
import { CurrentlyPlaying } from "../types/currentlyPlaying.types";
import { FaSpotify } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [currentlyPlaying, setCurrentlyPlaying] =
    useState<CurrentlyPlaying | null>(null);
  const location = useLocation();
  const { jwtToken, accessToken } = useSelector(
    (state: RootState) => state.auth
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (jwtToken) {
      fetchProfile();
      fetchCurrentlyPlaying();
      const intervalId = setInterval(fetchCurrentlyPlaying, 30000);

      return () => clearInterval(intervalId);
    }
  }, [jwtToken, accessToken]);
  const fetchProfile = async (): Promise<Profile> => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/api/profile?accessToken=${accessToken}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      if (res && res.data && res.data.data) {
        setProfile(res.data.data);
        return res.data.data as Profile;
      } else {
        throw new Error("No Profile Data");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  function navTo(endpoint: string): void {
    navigate(`/my-stats/${endpoint}`);
  }

  const fetchCurrentlyPlaying = async (): Promise<CurrentlyPlaying> => {
    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_URL
        }/api/currently-playing?accessToken=${accessToken}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      if (res && res.data && res.data.data && res.data.data.item) {
        setCurrentlyPlaying(res.data.data.item);
        return res.data.data.item as CurrentlyPlaying;
      } else {
        throw new Error("No response data");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  return (
    <div
      className={`relative ${
        !jwtToken ? "hidden" : "block"
      } bg-customBlue px-4 grid place-items-center mb-20`}
    >
      <div className="wrapper w-[90%]  xl:w-[1200px]  relative pt-20 ">
        <div className="grid lg:grid-cols-2 gap-7 place-items-center  lg:flex lg:justify-between lg:items-center  m-auto ">
          <div className="grid lg:grid-cols-2 text-center gap-11 ">
            <div className="pfp rounded-full border-4 border-white w-[150px] h-[150px] overflow-hidden self-end">
              <img
                src={profile?.images[1].url}
                className="w-full h-full object-cover object-center rounded-full"
                alt=""
              />
            </div>

            <div className="text-2xl font-extrabold relative">
              <span className="lg:absolute bottom-0 left-0 lg:text-4xl">
                {profile?.display_name}
              </span>
            </div>
          </div>

          <div className="w-full lg:self-end lg:w-auto grid place-items-center lg:place-items-end  gap-5">
            <div className="text-center flex items-center gap-2">
              <FaSpotify className="text-xl" />
              <a href={profile?.external_urls.spotify} className="font-medium">
                Open in Spotify
              </a>
            </div>
            {currentlyPlaying && (
              <div className="currently-playing   bg-customLightBlue rounded-lg p-4 lg:pr-">
                <div className="flex gap-4 items-center">
                  <img
                    src={currentlyPlaying?.album.images[0].url}
                    alt=""
                    className="w-[50px] h-[50px]"
                  />

                  <div>
                    <div className="flex gap-2 items-center">
                      <a
                        className="h-full flex flex-col justify-end text-sm  align-text-bottom"
                        href={currentlyPlaying?.external_urls.spotify}
                      >
                        {currentlyPlaying?.name}
                      </a>
                      <div className="bars flex gap-1 items-end h-[10px]">
                        <div
                          className={` w-[3px] wave  bg-white animate-wave`}
                        ></div>
                        <div
                          className={` w-[3px] wave2  bg-white animate-wave2`}
                        ></div>
                        <div
                          className={` w-[3px] wave3  bg-white animate-wave3`}
                        ></div>
                      </div>
                    </div>
                    <div>
                      {currentlyPlaying?.album.artists.map((a, index) => (
                        <a
                          href={a.external_urls.spotify}
                          className="text-xs text-customBlue "
                          key={index}
                        >
                          {a.name !==
                          currentlyPlaying.album.artists[
                            currentlyPlaying.album.artists.length - 1
                          ].name
                            ? `${a.name}, `
                            : `${a.name}`}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="h-28"></div>
        <div className="absolute -bottom-1 left-0 w-[100%] navigations flex  lg:justify-normal text-sm  overflow-x-auto  hide-scrollbar ">
          <div className="flex  gap-[2.2rem]  text-sm font-medium">
            <div
              className="pb-1 cursor-pointer flex flex-col items-center gap-2"
              onClick={() => navTo("overview")}
            >
              Overview
              <div
                className={`line  ${
                  location.pathname === "/my-stats/overview" ? "w-full" : "w-0"
                } transition-all duration-500 ease-in-out bg-customLightBlue h-1`}
              ></div>
            </div>
            <div
              className={`pb-1 cursor-pointer flex flex-col items-center gap-2`}
              onClick={() => navTo("tracks")}
            >
              Tracks
              <div
                className={`line  ${
                  location.pathname === "/my-stats/tracks" ? "w-full" : "w-0"
                } transition-all duration-500 ease-in-out bg-customLightBlue h-1`}
              ></div>
            </div>
            <div
              className="pb-1 cursor-pointer flex flex-col items-center gap-2"
              onClick={() => navTo("artists")}
            >
              Artists
              <div
                className={`line  ${
                  location.pathname === "/my-stats/artists" ? "w-full" : "w-0"
                } transition-all duration-500 ease-in-out bg-customLightBlue h-1`}
              ></div>
            </div>
            <div
              className="pb-1 cursor-pointer flex flex-col items-center gap-2"
              onClick={() => navTo("albums")}
            >
              Albums
              <div
                className={`line  ${
                  location.pathname === "/my-stats/albums" ? "w-full" : "w-0"
                } transition-all duration-500 ease-in-out bg-customLightBlue h-1`}
              ></div>
            </div>
            <div
              className="pb-1 cursor-pointer flex flex-col items-center gap-2"
              onClick={() => navTo("genres")}
            >
              Genre
              <div
                className={`line  ${
                  location.pathname === "/my-stats/genres" ? "w-full" : "w-0"
                } transition-all duration-500 ease-in-out bg-customLightBlue h-1`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
