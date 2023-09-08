import "./LoginPage.css";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context";
import { useState, useEffect } from "react";
const LoginPage = () => {
  const [error, setError] = useState("");
  const [errorFound, setErrorFound] = useState(false);
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);
  const { getCookie, loginInfo, handleLogin, setUserInfo, handleLoginReset } =
    useGlobalContext();
  const { email, password } = loginInfo;
  useEffect(() => {
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
          setUserInfo(response.data.name);
          navigate("/dashboard");
        } else {
          navigate("/");
          setUserInfo("");
        }
      } catch (error) {
        setUserInfo("");
        navigate("/");
        console.error("Error while verifying token:", error);
      }
    }

    fetchData();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9000/api/v1/auth/login",
        loginInfo,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setErrorFound(false);
      setRedirect(true);
      handleLoginReset();
      setError("");
    } catch (error) {
      // alert("Failed 1");
      setErrorFound(true);
      setError(error.response.data.message);
    }
  };
  if (redirect) {
    return <Navigate to={"/dashboard"} />;
  }
  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <form className="w-50 border p-2 rounded" onSubmit={handleSubmit}>
        {errorFound && (
          <div className="text-center bg-danger text-white p-4">{error}</div>
        )}
        <h2 className="text-center mb-4">Login</h2>
        <div className="form-group p-2">
          <label htmlFor="email" className="p-1">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Enter Email"
            autoComplete="off"
            autoCorrect="off"
            value={email}
            onChange={handleLogin}
          />
        </div>

        <div className="form-group p-2">
          <label htmlFor="password" className="p-1">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Enter Password"
            value={password}
            onChange={handleLogin}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
      <div>
        Do not have a account?
        <Link to="register" className="m-2 text-decoration-underline pointer">
          Register here
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
