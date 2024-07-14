import { useEffect, useState } from "react";
import TracksComponent from "../components/Tracks.component";
import { fetchTopTracks } from "../redux/tracks";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { calculateLength } from "../utils/calc";
import Popularity from "../components/Popularity";

const Tracks = () => {
  const tracks = useSelector((state: RootState) => state.tracks.tracks?.items);
  const dispatch = useDispatch<AppDispatch>();
  const [term, setTerm] = useState("short_term");
  const [limit, setLimit] = useState<number>(10);
  const [duration, setDuration] = useState({
    lessThan4: 0,
    greaterThan4: 0,
  });
  const [explicitness,setExplicitness] = useState({
    clean:0,
    explicit:0
  })
  useEffect(() => {
    if (tracks && tracks.length > 0) {
      let newDurations = { lessThan4: 0, greaterThan4: 0 };
      let newExplicit = {clean:0, explicit:0}
      tracks.forEach((item) => {
        calculateLength(item.duration_ms, newDurations);
        item.explicit === true ? newExplicit.explicit +=1 : newExplicit.clean +=1;
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
        <div className="flex px-6 md:px-0 mb-5">
          <div className="grid gap-5 grid-cols-2">
            <div>
              <select
                value={term}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setTerm(e.target.value)
                }
                className="bg-customBlue p-2 rounded-md text-sm"
              >
                <option value="short_term">Short Term</option>
                <option value="medium_term">Medium Term</option>
                <option value="long_term">Long Term</option>
              </select>
            </div>
            <div className="flex justify-between px-3 items-center bg-customBlue  rounded-md text-sm">
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
          </div>
        </div>
        <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-5   xl:w-[1200px]">
          <div className="lg:col-span-3">
            <TracksComponent />
          </div>

          <div className="lg:sticky top-[20px] h-[400px] lg:col-span-1  flex flex-col gap-5">
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
                    <div style={{width : `${explicitness.clean > explicitness.explicit ? "100%" : `${explicitness.clean}%`}`}} className="bg-customLightBlue rounded-full h-full"></div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex gap-2 items-center ">
                  <span className="text-sm text-end w-[70px] lg:w-[50px] font-semibold whitespace-nowrap">
                    Explicit
                  </span>
                  <div className=" h-[10px] w-full">
                    <div style={{width : `${explicitness.explicit > explicitness.clean ? "100%" : `${explicitness.explicit}%`}`}} className="bg-customLightBlue rounded-full h-full"></div>
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
