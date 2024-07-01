import Tracks from "../components/Tracks.component";
import { useEffect } from "react";
import { fetchTopTracks } from "../redux/tracks";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchTopArtists } from "../redux/artists";
import ArtistsComponent from "../components/Artists.component";
import axios from "axios";
import GenresComponent from "../components/genres.component";

const Overview = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchTopTracks({ time_range: "short_term", limit: "10" }));
    dispatch(
      fetchTopArtists({ time_range: "short_term", offset: 0, limit: 10 })
    );
    fetchGenres();
  }, []);
  const { accessToken, jwtToken } = useSelector(
    (state: RootState) => state.auth
  );
  const fetchGenres = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/top-genres?time_range=short_term&offset=0&limit=10&accessToken=${accessToken}`,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      console.log("TOP GENRES : ", response);
    } catch (error) {
      console.error(error);
    }
  };

  const wrapperClass = "wrapper grid grid-cols-1 lg:grid-cols-2 lg:w-[1000px] gap-[10rem] lg:gap-5 w-full sm:w-[600px] md:w-[700px] xl:w-[1200px]  mt-[12rem]";
  const titleClass = "text-2xl font-bold text-center mb-6 lg:text-start";
  return (
    <div>
      <div className="overview-contents grid place-items-center  mb-[10rem]">
        <div className={wrapperClass}>
          <div className="top-tracks">
            <h1 className={titleClass}>
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


        <div className={wrapperClass}>
          <div>
            <h1 className={titleClass}>
              Top Genres (4 weeks)
            </h1>

            <GenresComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
