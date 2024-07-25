import { useEffect, useState } from "react";
import TracksComponent from "../components/Tracks.component";
import { fetchTopTracks } from "../redux/tracks";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { calculateLength } from "../utils/calc";
import Popularity from "../components/Popularity";
import { screenshot } from "../utils/screenshot";

const Tracks = () => {
  const tracks = useSelector((state: RootState) => state.tracks.tracks?.items);
  const dispatch = useDispatch<AppDispatch>();
  const [term, setTerm] = useState("short_term");
  const [limit, setLimit] = useState<number>(20);
  const [duration, setDuration] = useState({
    lessThan4: 0,
    greaterThan4: 0,
  });
  const [explicitness, setExplicitness] = useState({
    clean: 0,
    explicit: 0,
  });
  useEffect(() => {
    if (tracks && tracks.length > 0) {
      let newDurations = { lessThan4: 0, greaterThan4: 0 };
      let newExplicit = { clean: 0, explicit: 0 };
      tracks.forEach((item) => {
        calculateLength(item.duration_ms, newDurations);
        item.explicit === true
          ? (newExplicit.explicit += 1)
          : (newExplicit.clean += 1);
      });
      setExplicitness(newExplicit);
      setDuration(newDurations);
    }
  }, [tracks, term, limit, dispatch]);

  useEffect(() => {
    console.log("Durations : ", duration);
    console.log("Explicitness : ", explicitness);
  }, [duration]);
  useEffect(() => {
    dispatch(fetchTopTracks({ limit: limit, offset: 0, time_range: term }));
  }, [dispatch, term, limit]);

  return (
    <div className="flex justify-center mb-[10rem]">
      <div className="w-full md:w-[90%]  xl:w-[1200px]">
        <div className="flex  font-semibold items-center justify-center lg:justify-normal px-6 md:px-0 mb-5">
          <div className="relative flex gap-5 grid-cols-3 font-bold">
            <div>
              <select
                value={term}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setTerm(e.target.value)
                }
                className="bg-customBlue p-2 rounded-md text-xs  md:text-sm"
              >
                <option value="short_term">Short Term</option>
                <option value="medium_term">Medium Term</option>
                <option value="long_term">Long Term</option>
              </select>
            </div>
            <div className="flex gap-5 px-3 items-center bg-customBlue  rounded-md text-xs  md:text-sm">
              <h1>Limit</h1>
              <select
                value={limit}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setLimit(parseInt(e.target.value))
                }
                className="bg-customBlue"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={40}>40</option>
                <option value={50}>50</option>
              </select>
            </div>
            <div
              onClick={() => screenshot("ss-tracks")}
              className="cursor-pointer md:absolute md:right-0 bg-customBlue rounded-md  px-2 py-2 flex items-center justify-between md:gap-2 text-sm"
            >
              <svg
                className="w-[20px] h-[20px]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.803 5.33333C13.803 3.49238 15.3022 2 17.1515 2C19.0008 2 20.5 3.49238 20.5 5.33333C20.5 7.17428 19.0008 8.66667 17.1515 8.66667C16.2177 8.66667 15.3738 8.28596 14.7671 7.67347L10.1317 10.8295C10.1745 11.0425 10.197 11.2625 10.197 11.4872C10.197 11.9322 10.109 12.3576 9.94959 12.7464L15.0323 16.0858C15.6092 15.6161 16.3473 15.3333 17.1515 15.3333C19.0008 15.3333 20.5 16.8257 20.5 18.6667C20.5 20.5076 19.0008 22 17.1515 22C15.3022 22 13.803 20.5076 13.803 18.6667C13.803 18.1845 13.9062 17.7255 14.0917 17.3111L9.05007 13.9987C8.46196 14.5098 7.6916 14.8205 6.84848 14.8205C4.99917 14.8205 3.5 13.3281 3.5 11.4872C3.5 9.64623 4.99917 8.15385 6.84848 8.15385C7.9119 8.15385 8.85853 8.64725 9.47145 9.41518L13.9639 6.35642C13.8594 6.03359 13.803 5.6896 13.803 5.33333Z"
                    fill="#fff"
                  ></path>{" "}
                </g>
              </svg>
              <h1 className="hidden md:block">Share</h1>
            </div>
          </div>
        </div>
        <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-5   xl:w-[1200px]">
          <div className="lg:col-span-3">
            <TracksComponent />
            {tracks && tracks.length > 0 && (
              <div id="ss-tracks" className="hidden bg-customBlue mt-5 py-20 w-[500px]">
                <div className="text-center flex justify-center items-center mb-2 ">
                <h1 className="text-customLightBlue text-md font-bold ">groovify.fx</h1>
                </div>
                <div className="text-center mb-2 text-3xl font-bold">
                  My Top Tracks
                </div>
                <div className="text-center mb-12">
                  {term === "short_term"
                    ? "Short Term"
                    : term === "medium_term"
                    ? "Medium Term"
                    : "Long Term"}
                </div>
                <div>
                  <div className="top-3 flex justify-center gap-2 items-center relative mb-12">
                    <img
                      src={tracks[1].album.images[1].url}
                      className="w-[130px] rounded-full"
                    />
                    <img
                      src={tracks[0].album.images[1].url}
                      className="w-[150px] rounded-full absolute "
                    />
                    <img
                      src={tracks[2].album.images[1].url}
                      className="w-[130px] rounded-full"
                    />
                  </div>
                </div>

                <div className="flex justify-center ">
                  <div className="w-[70%]">
                    {tracks.slice(0, 5).map((track, index) => (
                      <div key={index}>
                        <div className="flex items-center gap-5 p-2">
                          <div className=" flex justify-center items-center text-customGray w-[20px]">
                            <h1 className="font-extrabold">{index + 1}</h1>
                          </div>

                          <div>
                            <h1 className="text-xs sm:text-sm">{track.name}</h1>
                            {track.artists.map((a, i) => (
                              <span
                                key={i}
                                className="text-customGray break-all text-wrap"
                              >
                                <a
                                  href={a.external_urls.spotify}
                                  className="text-xs"
                                >
                                  {a.name}
                                </a>
                                {i < track.artists.length - 1 && ", "}
                              </span>
                            ))}
                          </div>
                        </div>
                        <hr className="border-gray-700" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-12 flex justify-center text-xs">See your Spotify Stats at <span className="ml-1 text-customLightBlue font-bold">groovify.fx</span></div>
              </div>
            )}
          </div>

          <div className="lg:sticky top-[20px] h-[468px] lg:col-span-1  flex flex-col gap-5">
            <div className="bg-customBlue px-6 py-6 w-full md:rounded-md">
              <div className="font-extrabold text-xl mb-5">By Length</div>
              <div>
                <div className="flex gap-2  items-center ">
                  <span className="text-sm    font-semibold whitespace-nowrap ">
                    {"< 4m"}
                  </span>
                  <div className="h-[10px] w-full">
                    <div
                      style={{
                        width: `${
                          duration.lessThan4 > duration.greaterThan4
                            ? "100%"
                            : `${
                                (duration.lessThan4 / duration.greaterThan4) *
                                100
                              }%`
                        }`,
                      }}
                      className="bg-customLightBlue rounded-full h-full"
                    ></div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex gap-2  items-center ">
                  <span className="text-sm   font-semibold whitespace-nowrap">
                    {"> 4m"}
                  </span>
                  <div className=" h-[10px] w-full">
                    {/* calculation
                      
                    */}
                    <div
                      style={{
                        width: `${
                          duration.greaterThan4 > duration.lessThan4
                            ? "100%"
                            : `${
                                (duration.greaterThan4 / duration.lessThan4) *
                                100
                              }%`
                        }`,
                      }}
                      className="bg-customLightBlue rounded-full h-full"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <Popularity />
            <div className="bg-customBlue px-6 py-6 w-full md:rounded-md">
              <div className="font-extrabold text-xl mb-5 ">
                By Explicitness
              </div>

              <div>
                <div className="flex  items-center gap-2">
                  <span className="text-sm text-end w-[70px] lg:w-[70px] font-semibold whitespace-nowrap">
                    Clean
                  </span>

                  <div className=" h-[10px] w-full">
                    <div
                      style={{
                        width: `${
                          explicitness.clean > explicitness.explicit
                            ? "100%"
                            : `${explicitness.clean}%`
                        }`,
                      }}
                      className="bg-customLightBlue rounded-full h-full"
                    ></div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex gap-2 items-center ">
                  <span className="text-sm text-end w-[70px] lg:w-[50px] font-semibold whitespace-nowrap">
                    Explicit
                  </span>
                  <div className=" h-[10px] w-full">
                    <div
                      style={{
                        width: `${
                          explicitness.explicit > explicitness.clean
                            ? "100%"
                            : `${explicitness.explicit}%`
                        }`,
                      }}
                      className="bg-customLightBlue rounded-full h-full"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracks;
