import Artists from "../components/Artists.component";
import Tracks from "../components/Tracks.component";
import { useEffect } from "react";
import { fetchTopTracks } from "../redux/tracks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";

const Overview = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchTopTracks({ time_range: "short_term", limit: "10" }));
  }, []);

  return (
    <div>
      <div className="overview-contents flex justify-center mb-[10rem]">
        <div className="wrapper grid grid-cols-1 lg:grid-cols-2 lg:w-[1000px] gap-5 w-full  xl:w-[1200px]  mt-[12rem]">
          <div className="top-tracks">
            <h1 className="text-2xl font-bold text-center mb-2 lg:text-start">Top Tracks</h1>

            <Tracks />
          </div>

          <div className="top-artists">
            <h1 className="text-2xl font-bold text-center mb-2 lg:text-start">Top Artists</h1>
            <Artists />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
