import {  useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";

const AlbumsComponent = () => {
  const albums = useSelector(
    (state: RootState) => state.albums.albums?.sortedAlbums
  );

  return (
    <div className="bg-customBlue md:rounded-lg flex justify-center">
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
              <div className="">
                <div className="flex items-center p-2">
                  <div className="flex items-center justify-center w-[50px] ">
                    <h1 className="text-customGray font-extrabold">
                      {index + 1}
                    </h1>
                  </div>
                  <div className="flex items-center gap-4">
                    <img
                      src={album.images[2].url}
                      alt=""
                      className="w-[50px] md:w-[60px] rounded-md object-cover object-center"
                    />
                    <div>
                      <h1 className="text-sm">{album.name}</h1>
                      {album.artist.map((art, i) => (
                        <span className="text-sm text-customGray break-all text-wrap">
                          <a href={art.link} className="text-xs">
                            {art.name}
                          </a>
                          {i < album.artist.length - 1 && ", "}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <hr className="border-gray-700" />
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center">
            <Link
              style={{
                display: `${
                  location.pathname === "/my-stats/overview" ? "block" : "none"
                }`,
              }}
              to="/my-stats/albums"
              className="text-customLightBlue"
            >
              See all
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumsComponent;
