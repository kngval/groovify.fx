const Header = () => {
  return (
    <div className="relative w-full h-[300px] bg-customBlue flex justify-center">
      <div className="wrapper w-[80%] h-full ">
        <div className="grid border-2 border-slate-500 h-[200px]  m-auto"></div>
        <div className="navigations absolute bottom-0 text-sm font-semibold m-auto w-[30%] grid grid-cols-5 gap-5">
          <div className="py-2  border-b-4 border-customLightBlue text-center">
            <button className="">
              Overview
            </button>
          </div>
          <div className="py-2 border-b-4 border-customLightBlue text-center">
            <button>Songs</button>
          </div>
          <div className="py-2 border-b-4 border-customLightBlue text-center">
            <button>Artists</button>
          </div>
          <div className="py-2 border-b-4 border-customLightBlue text-center">
            <button>Albums</button>
          </div>
          <div className="py-2 border-b-4 border-customLightBlue text-center">
            <button>Genres</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
