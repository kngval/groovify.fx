import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Overview from "./pages/Overview";
import Tracks from "./pages/Tracks";
import Artists from "./pages/Artists";
import Albums from "./pages/Albums";
import Genres from "./pages/Genres";
import Header from "./components/Header";
import { useTokenRefresh } from "./hooks/refresh.hooks";
import { useEffect } from "react";

function App() {
  const { jwtToken, accessToken } = useSelector(
    (state: RootState) => state.auth
  );
  const refreshAccessToken = useTokenRefresh();

  useEffect(() => {
    console.log("Access Token Updated", accessToken);
  }, [accessToken]);
  useEffect(() => {
    if (jwtToken) {
      const refreshTimer = 1800000; //30 minutes
      const interval = setInterval(() => {
        refreshAccessToken();
      }, refreshTimer);
      return () => clearInterval(interval);
    }
  }, [jwtToken, refreshAccessToken, accessToken]);
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
