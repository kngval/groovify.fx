import Artists from "../components/Artists.component";
import Tracks from "../components/Tracks.component";
import { useEffect } from "react";
import { fetchTopTracks } from "../redux/tracks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";

const Overview = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchTopTracks({ time_range: "short_term", limit: "5" }));
  }, []);

  return (
    <div>
      <div className="overview-contents flex justify-center">
        <div className="wrapper grid grid-cols-1 lg:grid-cols-2 gap-5 w-[80%] lg:w-[900px] xl:w-[1200px]  mt-[12rem]">
          <div className="top-tracks">
            <h1 className="text-2xl font-bold">Top Tracks</h1>

            <Tracks />
          </div>

          <div className="top-artists">
            <h1 className="text-2xl font-bold">Top Artists</h1>
            <Artists />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
