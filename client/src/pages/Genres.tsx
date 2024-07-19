import { useEffect, useState } from "react";
import GenresComponent from "../components/genres.component";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { fetchTopGenres } from "../redux/genres";

const Genres = () => {
  const [term, setTerm] = useState("short_term");
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(fetchTopGenres({time_range:term,limit:50, offset:0}))
  },[dispatch,term])
  return (
    <div className="flex justiflex justify-center mb-[10rem]">
      <div className="w-full md:w-[90%]  xl:w-[1200px]">
        <div className="flex px-6 md:px-0 mb-5">
          <div className="grid gap-5 grid-cols-2">
            <div>
              <select
                value={term}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setTerm(e.target.value)
                }
                className="bg-customBlue p-2 rounded-md text-sm"
              >
                <option value="short_term">Short Term</option>
                <option value="medium_term">Medium Term</option>
                <option value="long_term">Long Term</option>
              </select>
            </div>
           
          </div>
        </div>
        <GenresComponent />
      </div>
    </div>
  );
};

export default Genres;
