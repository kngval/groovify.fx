import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Tracks = () => {
  const trackItems = useSelector(
    (state: RootState) => state.tracks.tracks?.items
  );

  return (
    <div className="bg-customBlue rounded-lg flex justify-center">
      {trackItems && trackItems.length > 0 && (
        <div className="grid place-items-center w-[90%] gap-[9rem] py-12">
          <div className="top-3 flex items-center relative">
              <img src={trackItems[1].album.images[1].url}  className="w-[150px]"/>
              <img src={trackItems[0].album.images[1].url} className="w-[150px] absolute -bottom-[4rem] left-[4.7rem]"/>
              <img src={trackItems[2].album.images[1].url} className="w-[150px]"/>
          </div>
          <div className="grid gap-2 px-5 w-[90%]">
            {trackItems.map((track, index) => (
              <div className="flex gap-5  items-center">
                <div className="text-center break-all text-wrap text-customGray">
                  {index + 1}
                </div>
                <img
                  src={track.album.images[2].url}
                  alt=""
                  className="rounded-md object-cover object-center"
                />
                <div>
                  <h1 className="text-sm">{track.name}</h1>
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
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tracks;
