import { useEffect, useState } from "react";
import GenresComponent from "../components/genres.component";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchTopGenres } from "../redux/genres";
import { screenshot } from "../utils/screenshot";

const Genres = () => {
  const genres = useSelector((state:RootState) => state.genres.genres?.sortedGenres);
  const [term, setTerm] = useState("short_term");
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchTopGenres({time_range:term,limit:50, offset:0}))
  },[dispatch,term])
  return (
    <div className="flex justiflex justify-center mb-[10rem]">
      <div className="w-full md:w-[90%]  xl:w-[1200px]">
      <div className="relative flex font-bold justify-center gap-5 md:justify-between  px-6 md:px-0 mb-5">
          <div className="flex gap-5 ">
            
            <div>
              <select
                value={term}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setTerm(e.target.value)
                }
                className="bg-customBlue p-2 rounded-md text-sm outline-none"
              >
                <option value="short_term">Short Term</option>
                <option value="medium_term">Medium Term</option>
                <option value="long_term">Long Term</option>
              </select>
            </div>
          
          </div>
            <div
              onClick={() => screenshot("ss-genres")}
              className="outline-none cursor-pointer  bg-customBlue rounded-md  px-4 py-2 flex items-center justify-between gap-2 text-sm"
            >
              <svg
                className="w-[20px]"
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
              <h1>Share</h1>
            </div>
        </div>
        <GenresComponent />
        {genres && genres.length > 0 && (
              <div
                id="ss-genres"
                className="hidden bg-customBlue mt-5 py-20 w-[500px] "
              >
                <div className="flex justify-center mb-2">
                  <h1 className="text-customLightBlue text-md font-bold ">
                    groovify.fx
                  </h1>
                </div>
                <div className="text-center mb-2 text-3xl font-bold">
                  My Top Genres
                </div>
                <div className="text-center mb-12">
                  {term === "short_term"
                    ? "Short Term"
                    : term === "medium_term"
                    ? "Medium Term"
                    : "Long Term"}
                </div>
                 

                <div className="flex justify-center ">
                  <div className="">
                    {genres.slice(0, 5).map((genre, index) => (
                      <div key={index}>
                        <div className="flex items-center gap-5 p-2">
                          <div className=" flex justify-center items-center text-customGray w-[20px]">
                            <h1 className="font-extrabold">{index + 1}</h1>
                          </div>

                          <div>
                            <h1 className="text-sm">{genre[0]}</h1>
                    
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-12 flex justify-center text-xs">
                  See your Spotify Stats at{" "}
                  <span className="ml-1 text-customLightBlue font-bold">
                    groovify.fx
                  </span>
                </div>
              </div>
            )}
      </div>
    </div>
  );
};

export default Genres;
