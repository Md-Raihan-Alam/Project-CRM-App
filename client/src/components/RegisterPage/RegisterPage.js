import React from "react";
import "./RegisterPage.css";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const RegisterPage = () => {
  const [error, setError] = useState("");
  const [errorFound, setErrorFound] = useState(false);
  const {
    getCookie,
    registerInfo,
    handleRegister,
    setUserInfo,
    handleRegisterReset,
  } = useGlobalContext();
  const { name, email, password } = registerInfo;
  const navigate = useNavigate();
  useEffect(() => {
    const cookieValue = getCookie("token");
    async function fetchData() {
      try {
        const response = await axios.post(
          "https://project-crm-app.vercel.app/api/v1/auth/authVerify",
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
          navigate("/register");
          setUserInfo("");
        }
      } catch (error) {
        setUserInfo("");
        navigate("/register");
        console.error("Error while verifying token:", error);
      }
    }

    fetchData();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://project-crm-app.vercel.app/api/v1/auth/register",
        registerInfo,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        handleRegisterReset();
        setErrorFound(false);
        setError("");
        navigate("/");
      }
    } catch (error) {
      setErrorFound(true);
      setError(error.response.data.message);
      console.log(error);
    }
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <form className="w-50 border p-2 rounded" onSubmit={handleSubmit}>
        {errorFound && (
          <div className="text-center bg-danger text-white p-4">{error}</div>
        )}
        <h2 className="text-center mb-4">Register</h2>
        <div className="form-group p-2">
          <label htmlFor="name" className="p-1">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Enter name"
            autoComplete="off"
            autoCorrect="off"
            required
            value={name}
            onChange={handleRegister}
          />
        </div>
        <div className="form-group p-2">
          <label htmlFor="email" className="p-1">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Enter email"
            autoComplete="off"
            autoCorrect="off"
            required
            value={email}
            onChange={handleRegister}
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
            autoComplete="off"
            autoCorrect="off"
            placeholder="Password"
            required
            value={password}
            onChange={handleRegister}
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>
      <div>
        have a account?
        <Link to="/" className="m-2 text-decoration-underline pointer">
          Login here
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
