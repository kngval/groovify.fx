import { useEffect } from "react";
import { fetchTopTracks } from "../redux/tracks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { fetchTopArtists } from "../redux/artists";
import { fetchTopGenres } from "../redux/genres";
import { fetchTopAlbums } from "../redux/albums";

//Components
import TracksComponent from "../components/Tracks.component";
import ArtistsComponent from "../components/Artists.component";
import AlbumsComponent from "../components/Albums.component";
import GenresComponent from "../components/genres.component";

const Overview = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(
      fetchTopTracks({ time_range: "short_term", limit: 10, offset: 0 })
    );
    dispatch(
      fetchTopArtists({ time_range: "short_term", offset: 0, limit: 10 })
    );
    dispatch(fetchTopGenres({ time_range: "short_term", offset: 0, limit: 9 }));
    dispatch(
      fetchTopAlbums({ time_range: "short_term", offset: 0, limit: 11 })
    );
  }, []);

  const wrapperClass =
    "wrapper grid grid-cols-1 lg:grid-cols-2 lg:w-[1000px] gap-[10rem] lg:gap-5 w-full sm:w-[80%]  xl:w-[1200px] ";
  const titleClass = "text-2xl font-extrabold text-center lg:text-start mb-6 ";
  return (
    <div className="">
      <div className="overview-contents grid gap-[5rem] place-items-center  mb-[10rem]">
        <div className={wrapperClass}>
          <div className="top-tracks">
              <h1 className={titleClass}>Top Tracks</h1>
            <TracksComponent />
          </div>

          <div className="top-artists">
            <h1 className={titleClass}>Top Artists</h1>
            <ArtistsComponent />
          </div>
        </div>

        <div className={wrapperClass}>
          <div>
            <h1 className={titleClass}>Top Albums</h1>
            <AlbumsComponent />
          </div>

          <div>
            <h1 className={titleClass}>Top Genres</h1>

            <GenresComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
