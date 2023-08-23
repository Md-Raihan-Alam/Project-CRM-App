import React from "react";
import "./RegisterPage.css";
import { Link, Navigate } from "react-router-dom";
import { useGlobalContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
const RegisterPage = () => {
  const { registerInfo, handleRegister, handleRegisterReset } =
    useGlobalContext();
  const { name, email, password } = registerInfo;
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
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error while verifying token:", error);
      }
    }

    fetchData();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:9000/api/v1/auth/register",
        registerInfo,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        handleRegisterReset();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <form className="w-50 border p-2 rounded" onSubmit={handleSubmit}>
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
