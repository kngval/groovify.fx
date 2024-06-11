import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Overview from "./pages/Overview";

function App() {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  console.log("ACCESS TOKEN : ",accessToken);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              accessToken ? (
                <Navigate to="/overview" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/overview"
            element={accessToken ? <Overview /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!accessToken ? <Login /> : <Navigate to="/overview" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
