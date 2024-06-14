const Header = () => {
  return (
    <div className="relative w-full h-[300px] bg-customBlue flex justify-center">
      <div className="wrapper w-[60%]  ">
        <div className="grid border-2 border-slate-500 h-[200px]  m-auto"></div>
        <div className="navigations-wrapper flex gap-[2.2rem] mt-[4.2rem] text-sm  overflow-x-auto  font-semibold m-auto overflow-hidden  hide-scrollbar">
          <div className="">
            <h1 className="pb-2">Overview</h1>
            <div className="line w-[100%] bg-customLightBlue h-1"></div>
          </div>
          <div className="pb-2 border-b-4 border-customLightBlue">Songs</div>
          <div className="pb-2 border-b-4 border-customLightBlue">Artists</div>
          <div className="pb-2 border-b-4 border-customLightBlue">Albums</div>
          <div className="pb-2 border-b-4 border-customLightBlue">Genre</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
