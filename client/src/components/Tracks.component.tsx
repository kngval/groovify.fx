import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";

const TracksComponent = () => {
  const trackItems = useSelector(
    (state: RootState) => state.tracks.tracks?.items
  );

  return (
    <div className="bg-customBlue md:rounded-md flex justify-center">
      {trackItems && trackItems.length > 0 && (
        <div className="grid w-[90%] sm:w-[80%]  py-12">
          <div className="top-3 flex justify-center gap-2 items-center relative mb-[9rem]">
            <img
              src={trackItems[1].album.images[1].url}
              className="w-[150px]"
            />
            <img
              src={trackItems[0].album.images[1].url}
              className="w-[150px] absolute -bottom-[4rem] "
            />
            <img
              src={trackItems[2].album.images[1].url}
              className="w-[150px]"
            />
          </div>
          <div className=" grid gap-2   mb-12">
            {trackItems.map((track, index) => (
              <div key={index}>
                <div className="flex items-center gap-5 p-2">
                  <div className=" flex justify-center items-center text-customGray w-[20px]">
                    <h1 className="font-extrabold">{index + 1}</h1>
                  </div>
                  <img
                    src={track.album.images[2].url}
                    alt=""
                    className="w-[50px] md:w-[60px] rounded-md object-cover object-center"
                  />
                  <div>
                    <h1 className="text-xs sm:text-sm">{track.name}</h1>
                    {track.artists.map((a, i) => (
                      <span
                        key={i}
                        className="text-customGray break-all text-wrap"
                      >
                        <a href={a.external_urls.spotify} className="text-xs">
                          {a.name}
                        </a>
                        {i < track.artists.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                </div>
                <hr className="border-gray-700" />
              </div>
            ))}
          </div>
          <div
            className={`${
              location.pathname === "/my-stats/tracks" ? "hidden" : "flex"
            } justify-center items-center`}
          >
            <Link to="/my-stats/tracks" className="text-customLightBlue">
              See all
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default TracksComponent;
