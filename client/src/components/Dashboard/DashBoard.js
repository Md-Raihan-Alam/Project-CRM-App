import "./DashBoard.css";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context";
import { useEffect } from "react";
const DashBoard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:9000/api/v1/auth/authVerify",
          {
            withCredentials: true,
          }
        );
        if (response.data.operation === "success") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } catch (error) {
        navigate("/");
        console.error("Error while verifying token:", error);
      }
    }

    fetchData();
  }, []);
  return <div className="test">Dashboard</div>;
};
export default DashBoard;
