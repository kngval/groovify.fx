import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import axios from "axios";

export const useTokenRefresh = () => {
  const { refreshToken, jwtToken } = useSelector(
    (state: RootState) => state.auth
  );

  const refreshAccessToken = async () => {
    try {
      if (refreshToken) {
        console.log('REFRESHING TOKEN FRONTEND...')
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
        console.log("RESPONSE FROM REF TOKEN : ", response.data);
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
