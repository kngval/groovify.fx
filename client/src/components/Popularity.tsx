import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";

const Popularity = () => {
  const tracks = useSelector((state: RootState) => state.tracks.tracks?.items);
  const artists = useSelector(
    (state: RootState) => state.artists.artists?.items
  );
  const [popularity, setPopularity] = useState({
    obscure: 0,
    average: 0,
    popular: 0,
  });
  useEffect(() => {
    if (tracks || artists) {
      const newPopularity = {
        obscure: 0,
        average: 0,
        popular: 0,
      };
      const items = location.pathname === "/my-stats/tracks" || location.pathname === "/my-stats/albums" ? tracks : artists;
      items?.forEach((item) => {
        if (item.popularity <= 45) {
          newPopularity.obscure += 1;
        } else if (item.popularity <= 70) {
          newPopularity.average += 1;
        } else {
          newPopularity.popular += 1;
        }
      });
      setPopularity(newPopularity);
    }
  }, [tracks, artists]);

  useEffect(() => {
    console.log("Popularity :", popularity);
  }, [popularity]);

  const maxPopularity = Math.max(
    popularity.obscure,
    popularity.average,
    popularity.popular
  );

  return (
    <div className="bg-customBlue p-6 w-full md:rounded-md">
      <div className="font-extrabold text-xl mb-5 ">By Popularity</div>
      <div>
        <div className="flex  items-center gap-2">
          <span className="text-sm w-[70px] lg:w-[100px] font-semibold whitespace-nowrap ">
            Obscure
          </span>
          <div className=" h-[10px] w-full">
            <div
              style={{
                width: `${
                  popularity.obscure > popularity.average &&
                  popularity.obscure > popularity.popular
                    ? "100%"
                    : `${(popularity.obscure / maxPopularity) * 100}%`
                }`,
              }}
              className="bg-customLightBlue rounded-full h-full"
            ></div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex  items-center gap-2">
          <span className="text-sm  w-[70px] lg:w-[100px] font-semibold whitespace-nowrap">
            Average
          </span>

          <div className=" h-[10px] w-full">
            <div
              style={{
                width: `${
                  popularity.average > popularity.obscure &&
                  popularity.average > popularity.popular
                    ? "100%"
                    : `${(popularity.average / maxPopularity) * 100}%`
                }`,
              }}
              className="bg-customLightBlue rounded-full h-full"
            ></div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex gap-2 items-center ">
          <span className="text-sm w-[70px] lg:w-[100px] font-semibold whitespace-nowrap">
            Popular
          </span>
          <div className=" h-[10px] w-full">
            <div
              style={{
                width: `${
                  popularity.popular > popularity.obscure &&
                  popularity.popular > popularity.average
                    ? "100%"
                    : `${(popularity.popular / maxPopularity) * 100}%`
                }`,
              }}
              className="bg-customLightBlue rounded-full h-full"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popularity;
