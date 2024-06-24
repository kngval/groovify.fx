import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./redux/store";
import Overview from "./pages/Overview";
import Tracks from "./pages/Tracks";
import Artists from "./pages/Artists";
import Albums from "./pages/Albums";
import Genres from "./pages/Genres";
import Header from "./components/Header";
import { useEffect } from "react";
import axios from "axios";
import { setAuthTokens, decrementExpiresIn } from "./redux/authSlice";

function App() {
  const { jwtToken, refresh_token, expires_at } = useSelector(
    (state: RootState) => state.auth
  );
  console.log("ref token : ", refresh_token);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log("Auth State: ", { jwtToken, refresh_token, expires_at });
  }, [jwtToken, refresh_token, expires_at]);

  // Function to refresh access token
  const refreshAccessToken = async () => {
    try {
      console.log("Running refreshAccessToken function");
      if (refresh_token) {
        console.log("token state in refAccTok : ", refresh_token);
        const res = await axios.get(
          `http://localhost:3000/refresh-token?refresh_token=${refresh_token}`,
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          }
        );
        if (res) {
          console.log(res.data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // UseEffect to set timeout for token refresh
  useEffect(() => {
    if (expires_at) {
      const interval = setInterval(() => {
        dispatch(decrementExpiresIn());
      }, 1000);
      if (expires_at <= 20) {
        refreshAccessToken();
      }
      return () => clearInterval(interval); // Cleanup function to clear timeout
    }
  }, [expires_at, refresh_token, jwtToken, dispatch]);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              jwtToken ? (
                <Navigate to="/my-stats/overview" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/my-stats/overview"
            element={jwtToken ? <Overview /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={
              !jwtToken ? <Login /> : <Navigate to="/my-stats/overview" />
            }
          />
          <Route
            path="/my-stats/tracks"
            element={jwtToken ? <Tracks /> : <Navigate to="/login" />}
          />
          <Route
            path="/my-stats/artists"
            element={jwtToken ? <Artists /> : <Navigate to="/login" />}
          />
          <Route
            path="/my-stats/albums"
            element={jwtToken ? <Albums /> : <Navigate to="/login" />}
          />
          <Route
            path="/my-stats/genres"
            element={jwtToken ? <Genres /> : <Navigate to="/login" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
