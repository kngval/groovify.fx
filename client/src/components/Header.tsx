import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { checkTokenExpiry, isTokenExpired } from "../utils/token";
import { Profile } from "../types/profile.types";
import { CurrentlyPlaying } from "../types/currentlyPlaying.types";
import { FaSpotify } from "react-icons/fa6";

const Header = () => {
  const jwtToken = useSelector((state: RootState) => state.auth.jwtToken);
  if (jwtToken) {
    console.log("TOKEN EXP : ", isTokenExpired(jwtToken));
  }
  const [profile, setProfile] = useState<Profile | null>(null);
  const [currentlyPlaying, setCurrentlyPlaying] =
    useState<CurrentlyPlaying | null>(null);
  useEffect(() => {
    checkTokenExpiry();
    fetchProfile();
    fetchCurrentlyPlaying();
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

  const fetchCurrentlyPlaying = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/currently-playing",
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      if (res) {
        console.log("CURRENTLY  : PLAYING", res.data.data.item);
        setCurrentlyPlaying(res.data.data.item);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="relative bg-customBlue px-4 grid place-items-center">
      <div className="wrapper w-[80%] lg:w-[900px] xl:w-[1200px]  relative pt-20">
        <div className="grid lg:grid-cols-2 gap-7 place-items-center  lg:flex lg:justify-between lg:items-center  m-auto">
          <div className="grid lg:grid-cols-2 text-center gap-11 ">
            <div className="pfp rounded-full border-4 border-white w-[150px] h-[150px] overflow-hidden">
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

          <div className="w-full lg:w-auto grid place-items-center lg:place-items-end gap-5 lg:justify-end">
            <div className="text-center flex items-center gap-2">
              <FaSpotify className="text-xl" />
              <a href={profile?.external_urls.spotify} className="font-medium">
                Open in Spotify
              </a>
            </div>
            {currentlyPlaying && (
              <div className="currently-playing   bg-customLightBlue rounded-lg p-4 ">
                <div className="flex gap-5">
                  <img
                    src={currentlyPlaying?.album.images[0].url}
                    alt=""
                    className="w-[50px] h-[50px]"
                  />

                  <div>
                    <a
                      className="text-sm"
                      href={currentlyPlaying?.external_urls.spotify}
                    >
                      {currentlyPlaying?.name}
                    </a>
                    <div>
                      {currentlyPlaying?.album.artists.map((a) => (
                        <a
                          href={a.external_urls.spotify}
                          className="text-xs text-customBlue"
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
        <div className="absolute bottom-0 left-0 w-[100%] navigations-wrapper   text-sm  overflow-x-auto   ">
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
    </div>
  );
};

export default Header;
