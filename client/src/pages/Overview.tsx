import Tracks from "../components/Tracks.component";
import { useEffect } from "react";
import { fetchTopTracks } from "../redux/tracks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { fetchTopArtists } from "../redux/artists";
import ArtistsComponent from "../components/Artists.component";

const Overview = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchTopTracks({ time_range: "short_term", limit: "10" }));
    dispatch(fetchTopArtists({time_range: "short_term",offset:0,limit:10}))
    fetch;
  }, []);

  return (
    <div>
      <div className="overview-contents flex justify-center mb-[10rem]">
        <div className="wrapper grid grid-cols-1 lg:grid-cols-2 lg:w-[1000px] gap-[10rem] lg:gap-5 w-full sm:w-[600px] md:w-[700px] xl:w-[1200px]  mt-[12rem]">
          <div className="top-tracks">
            <h1 className="text-2xl font-bold text-center mb-6 lg:text-start">
              Top Tracks (4 weeks)
            </h1>

            <Tracks />
          </div>

          <div className="top-artists">
            <h1 className="text-2xl font-bold text-center mb-6 lg:text-start">
              Top Artists (4 weeks)
            </h1>
            <ArtistsComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
