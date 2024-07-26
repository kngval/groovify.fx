import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";

const ArtistsComponent = () => {
  const artistsItems = useSelector(
    (state: RootState) => state.artists.artists?.items
  );

  return (
    <div className="bg-customBlue md:rounded-lg flex justify-center">
      {artistsItems && artistsItems.length > 0 && (
        <div className="grid place-items-center w-[90%]  py-12">
          <div className="top-3 flex items-center relative mb-[8rem]">
            <img
              src={artistsItems[1].images[2].url}
              className="w-[150px] h-[150px] rounded-full"
            />
            <img
              src={artistsItems[0].images[2].url}
              className="w-[150px] h-[150px] absolute -bottom-[4rem] left-[4.7rem] rounded-full"
            />
            <img
              src={artistsItems[2].images[2].url}
              className="w-[150px] h-[150px] rounded-full"
            />
          </div>
          <div className="grid gap-2 px-5 w-[90%]">
            {artistsItems.map((artist, index) => (
              <div className="flex gap-5  items-center" key={index}>
                <div className="font-extrabold w-[25px] text-center break-all text-wrap text-customGray">
                  {index + 1}
                </div>
                <img
                  src={artist.images[2].url}
                  alt=""
                  className="rounded-full object-cover object-center w-[50px] h-[50px] md:w-[60px] md:h-[60px]"
                />
                <div>
                  <h1 className="text-xs sm:text-sm">{artist.name}</h1>
                </div>
              </div>
            ))}
          </div>
          <div
            className={`${
              location.pathname === "/my-stats/artists" ? "hidden" : "block"
            } mt-4 text-customLightBlue`}
          >
            <Link to="/my-stats/artists">See All</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistsComponent;
