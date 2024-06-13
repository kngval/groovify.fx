import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";
import Overview from "./pages/Overview";

function App() {
  const jwtToken = useSelector((state: RootState) => state.auth.jwtToken);
  console.log("ACCESS TOKEN : ", jwtToken);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              jwtToken ? <Navigate to="/overview" /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/overview"
            element={jwtToken ? <Overview /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!jwtToken ? <Login /> : <Navigate to="/overview" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
