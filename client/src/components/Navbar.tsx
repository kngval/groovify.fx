const Navbar = () => {
  return (
    <div className="py-6  flex justify-center items-center ">
      <div className="w-[70%] flex justify-between items-center">
        <div className="nav-title font-extrabold flex items-center text-lg sm:text-xl h-full">
          groovify
        </div>
        <div>
          <button
            type="button"
            className="hidden lg:block w-[180px] py-2 text-sm bg-customLightBlue font-bold rounded-full"
          >
            Sign in with Spotify
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
