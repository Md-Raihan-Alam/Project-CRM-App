import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../../context";
import "./NavBar.css";
const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useGlobalContext();
  const handleLogOut = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9000/api/v1/auth/logout",
        {
          withCredentials: true,
        }
      );
      if (response.data.message === "success") {
        setUserInfo("");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const createCustomer = () => {
    if (location.pathname === "/addClient") navigate("/dashboard");
    else navigate("/addClient");
  };
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/">
          CRM
        </a>
        <div className="d-flex flex-wrap">
          {userInfo && (
            <>
              <div className="navbar-brand">Welcome {userInfo}</div>
              <button
                className="btn btn-primary text-white mx-2"
                onClick={createCustomer}
              >
                {location.pathname === "/addClient"
                  ? "Dashboard"
                  : "Add Customer"}
              </button>
              <button
                className="btn btn-info text-white"
                onClick={handleLogOut}
              >
                Logout
              </button>
            </>
          )}
          {!userInfo && (
            <>
              <Link to="/" className="nav-link text-white mx-2" href="/">
                Login
              </Link>
              <Link
                to="/register"
                className="nav-link text-white mx-2"
                href="/about"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
