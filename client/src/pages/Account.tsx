const Account = () => {
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("refreshToken");
    window.location.href = "https://accounts.spotify.com/logout";
  };
  return (
    <div className="flex justify-center mb-48">
      <div className="w-full md:w-[90%]  xl:w-[1200px]">
        <div className="bg-customBlue p-8 md:rounded-md">
          <div className="mb-10">
            <h1 className="font-bold text-xl">Sign Out</h1>
            <p className="text-sm text-gray-500">
              Sign out of groovify from this browser.
            </p>
          </div>
          <h6 onClick={logout} className="text-customLightBlue font-bold cursor-pointer">
            Sign Out
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Account;
