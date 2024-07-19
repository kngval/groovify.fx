import { useEffect, useState } from "react";
import AlbumsComponent from "../components/Albums.component";
import { fetchTopAlbums } from "../redux/albums";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import Popularity from "../components/Popularity";

const Albums = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [term, setTerm] = useState("short_term");
  const [limit, setLimit] = useState<number>(10);
  useEffect(() => {
    dispatch(fetchTopAlbums({ time_range: term, limit: limit, offset: 0 }));
  }, [dispatch, limit, term]);
  return (
    <div className="flex justify-center mb-[10rem]">
      <div className="w-full md:w-[90%]  xl:w-[1200px]">
        <div className="flex gap-5 mb-5 px-6 md:px-0">
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
          <div className="flex  px-3 gap-10 items-center bg-customBlue  rounded-md text-sm">
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
        </div>
        <div className="grid gap-5 lg:grid-cols-4">
          <div className="lg:col-span-3">
        <AlbumsComponent />
        </div>
        <div className="">
        <Popularity />
        </div>
        </div>
      </div>
    </div>
  );
};

export default Albums;
