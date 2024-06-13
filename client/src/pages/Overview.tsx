import { useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const Overview = () => {
  const jwtToken = useSelector((state: RootState) => state.auth.jwtToken);
  useEffect(() => {
    fetchNewReleases();
  });

  const fetchNewReleases = async () => {
    const res = await axios.get("http://localhost:3000/api/profile", {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    console.log(res.data);
  };
  return (
    <div>
      <Header />

      <div className="overview-contents">Overview</div>
    </div>
  );
};

export default Overview;
