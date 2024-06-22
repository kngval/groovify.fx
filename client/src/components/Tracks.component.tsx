import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Tracks = () => {
  const trackItems = useSelector(
    (state: RootState) => state.tracks.tracks?.items
  );

  return (
    <div className="bg-customBlue">
      {trackItems && trackItems.length > 0 && (
        <div>
          {trackItems.map((track) => (
            <div className="flex gap-5 justify-center items-center">
              <div>
                <img src={track.album.images[2].url} alt="" />
              </div>
              <div>
                <h1>{track.name}</h1>
                {track.artists.map((a, i) => (
                  <span key={i}>
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
      )}
    </div>
  );
};

export default Tracks;
