import { useEffect } from "react";
import login from "../assets/login.svg";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import axios from "axios";
import { setJwtToken, setRefreshToken, setAccToken } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const query = new URLSearchParams(window.location.search);
  const code = query.get("code") as string;
  console.log("CODE URL : ", code);
  useEffect(() => {
    if (code) {
      fetchCode();
    }
  }, [code, navigate, dispatch]);

  const fetchCode = async () => {
    try {
      console.log("CODE ", code);
      const response = await axios.get(
        `${import.meta.env.VITE_URL}/callback?code=${code}`
      );

      dispatch(setJwtToken(response.data.jwtToken));
      dispatch(setRefreshToken(response.data.refresh_token));
      dispatch(setAccToken(response.data.access_token));
    } catch (error: any) {
      console.error(
        "Error fetching access token:",
        error.response?.data || error.message
      ); // Enhanced error logging
    }
  };
  useEffect(() => {
    if (code) {
      navigate("/my-stats/overview");
    }
  }, []);
  return (
    <div className="w-full flex justify-center items-center my-20 lg:my-36">
      <div className="main-container w-[70%] md:w-[90%]  xl:w-[1200px] grid grid-cols-1 gap-20 lg:grid-cols-2 lg:gap-5 place-items-center">
        <div className="grid place-items-center">
          <div className=" font-extrabold text-2xl sm:text-3xl xl:text-3xl text-center">
            Groove hard and track your spotify stats with{" "}
            <span className="text-customLightBlue">groovify.fx</span>
          </div>

          <button
            type="button"
            onClick={() =>
              (window.location.href = `${import.meta.env.VITE_URL}/login`)
            }
            className="bg-customLightBlue px-6 py-2 mt-5 text-sm rounded-full font-bold"
          >
            Sign in with Spotify
          </button>
        </div>

        <img
          src={login}
          alt=""
          className="w-[350px] lg:w-[400px] xl:w-[400px]"
        />
      </div>
    </div>
  );
};

export default Login;
