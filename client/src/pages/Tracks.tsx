import { useEffect, useState } from "react";
import TracksComponent from "../components/Tracks.component";
import { fetchTopTracks } from "../redux/tracks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";

const Tracks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [term, setTerm] = useState("short_term");
  const [limit, setLimit] = useState<number>(10);

  useEffect(() => {
    dispatch(fetchTopTracks({ limit: limit, offset: 0, time_range: term }));
  }, [dispatch, term,limit]);

  return (
    <div className="flex justify-center mb-[10rem]">
      <div className="w-full md:w-[90%] lg:w-[900px] xl:w-[1200px]">
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
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={40}>40</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5  lg:w-[900px] xl:w-[1200px]">
          <div className="lg:col-span-3">
            <TracksComponent />
          </div>

          <div className=" ">
            <div>By Length</div>
            <div>By Length</div>
            <div>By Length</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracks;
