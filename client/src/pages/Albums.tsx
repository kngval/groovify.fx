import { useEffect, useState } from "react";
import AlbumsComponent from "../components/Albums.component";
import { fetchTopAlbums } from "../redux/albums";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import Popularity from "../components/Popularity";
import { fetchTopTracks } from "../redux/tracks";
import { screenshot } from "../utils/screenshot";

const Albums = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [term, setTerm] = useState("short_term");
  const [limit, setLimit] = useState<number>(20);
  useEffect(() => {
    dispatch(fetchTopAlbums({ time_range: term, limit: limit, offset: 0 }));
    dispatch(fetchTopTracks({ time_range: term, limit: limit, offset: 0 }));
  }, [dispatch, limit, term]);
  return (
    <div className="flex justify-center mb-[10rem]">
      <div className="w-full md:w-[90%]  xl:w-[1200px]">
        <div className="flex justify-center md:justify-normal mb-5">
      <div className="relative flex gap-5 grid-cols-3">
            <div>
              <select
                value={term}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setTerm(e.target.value)
                }
                className="bg-customBlue p-2 rounded-md text-xs font-bold md:text-sm"
              >
                <option value="short_term">Short Term</option>
                <option value="medium_term">Medium Term</option>
                <option value="long_term">Long Term</option>
              </select>
            </div>
            <div className="flex gap-5 px-3 items-center bg-customBlue font-bold rounded-md text-xs  md:text-sm">
              <h1>Limit</h1>
              <select
                value={limit}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setLimit(parseInt(e.target.value))
                }
                className="bg-customBlue"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
                <option value={40}>40</option>
                <option value={50}>50</option>
              </select>
            </div>
            <div
              onClick={() => screenshot("ss-tracks")}
              className="cursor-pointer md:absolute md:right-0 bg-customBlue rounded-md  px-2 py-2 flex items-center justify-between md:gap-2 text-sm"
            >
              <svg
                className="w-[20px] h-[20px]"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M13.803 5.33333C13.803 3.49238 15.3022 2 17.1515 2C19.0008 2 20.5 3.49238 20.5 5.33333C20.5 7.17428 19.0008 8.66667 17.1515 8.66667C16.2177 8.66667 15.3738 8.28596 14.7671 7.67347L10.1317 10.8295C10.1745 11.0425 10.197 11.2625 10.197 11.4872C10.197 11.9322 10.109 12.3576 9.94959 12.7464L15.0323 16.0858C15.6092 15.6161 16.3473 15.3333 17.1515 15.3333C19.0008 15.3333 20.5 16.8257 20.5 18.6667C20.5 20.5076 19.0008 22 17.1515 22C15.3022 22 13.803 20.5076 13.803 18.6667C13.803 18.1845 13.9062 17.7255 14.0917 17.3111L9.05007 13.9987C8.46196 14.5098 7.6916 14.8205 6.84848 14.8205C4.99917 14.8205 3.5 13.3281 3.5 11.4872C3.5 9.64623 4.99917 8.15385 6.84848 8.15385C7.9119 8.15385 8.85853 8.64725 9.47145 9.41518L13.9639 6.35642C13.8594 6.03359 13.803 5.6896 13.803 5.33333Z"
                    fill="#fff"
                  ></path>{" "}
                </g>
              </svg>
              <h1 className="hidden md:block">Share</h1>
            </div>
          </div>
          </div>
        <div className="grid gap-5 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <AlbumsComponent />
          </div>
          <div className="lg:sticky top-[20px] h-[100px]">
            <Popularity />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Albums;
