import { useEffect, useState } from "react";
import TracksComponent from "../components/Tracks.component";
import { fetchTopTracks } from "../redux/tracks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";

const Tracks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [term, setTerm] = useState("short_term");
  useEffect(() => {
    dispatch(fetchTopTracks({ limit: 50, offset: 0, time_range: term }));
  }, [dispatch, term]);

  return (
    <div className="flex justify-center mb-[10rem]">
      <div className="w-full md:w-[90%] lg:w-[900px] xl:w-[1200px]">
        <div className="px-6 md:px-0">
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
          </div>

          <div>
            <div>sss</div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5  lg:w-[900px] xl:w-[1200px]">
          <div className="lg:col-span-3">
            <TracksComponent />
          </div>

          <div className=" lg:col-span-1 grid grid-cols-1">
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
