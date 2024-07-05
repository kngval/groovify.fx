import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const AlbumsComponent = () => {
  const albums = useSelector(
    (state: RootState) => state.albums.albums?.sortedAlbums
  );
  return (
    <div className="bg-customBlue rounded-lg flex justify-center">
      {albums && albums.length > 0 && (
        <div className="grid gap-[5rem]  w-[80%]  py-12">
          <div className="grid gap-2">
          <div className="top-3 flex justify-center gap-2 items-center relative mb-[9rem]">
            <img src={albums[1].images[1].url} alt="" className="w-[150px]" />
            <img
              src={albums[0].images[1].url}
              alt=""
              className="w-[150px] absolute -bottom-[4rem]"
            />
            <img src={albums[2].images[1].url} alt="" className="w-[150px]" />
          </div>
          {albums.map((album, index) => (
            <div className="flex items-center">
              <div className="flex items-center justify-center w-[50px] ">
                <h1 className="text-customGray">{index + 1}</h1>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src={album.images[2].url}
                  alt=""
                  className="rounded-md object-cover object-center"
                />
                <div>
                  <h1>{album.name}</h1>
                  {album.artist.map((art, i) => (
                    <span className="text-sm text-customGray break-all text-wrap">
                      <a href={art.link}>{art.name}</a>
                      {i < album.artist.length - 1 && ", "}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
          </div>
          <div className="flex justify-center items-center">
            <a href="/" className="text-customLightBlue">
              See all
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumsComponent;
