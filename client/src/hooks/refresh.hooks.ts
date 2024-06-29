import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import axios from "axios";
import { setAccToken } from "../redux/authSlice";

export const useTokenRefresh = () => {
  const { refreshToken, jwtToken } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();

  const refreshAccessToken = async () => {
    console.log("REFRESHING TOKEN FRONTEND...");
    try {
      if (refreshToken) {
        const response = await axios.post(
          "http://localhost:3000/refresh_token",
          {
            refreshToken,
          },
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        console.log("RESPONSE DATA FRONTEND : ", response.data);
        console.log("RESPONSE FROM REF TOKEN : ", response.data);
        if (response && response.data) {
          dispatch(setAccToken(response.data.access_token));
        }
        console.log(
          "Updated localStorage Access Token:",
          localStorage.getItem("accessToken")
        );
      }
    } catch (error: any) {
      console.error(
        "Error refreshing access token:",
        error.response?.data || error.message
      );
    }
  };

  return refreshAccessToken;
};
