import "./DashBoard.css";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context";
import { useEffect } from "react";
const DashBoard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    function getCookie(cname) {
      let name = cname + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(";");

      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }

    const cookieValue = getCookie("token");
    async function fetchData() {
      try {
        const response = await axios.post(
          "http://localhost:9000/api/v1/auth/authVerify",
          {
            token: cookieValue,
          },
          {
            withCredentials: true,
          }
        );
        if (response.data.operation === "success") {
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error while verifying token:", error);
        navigate("/");
      }
    }

    fetchData();
  }, []);
  return <div className="test">Dashboard</div>;
};
export default DashBoard;
