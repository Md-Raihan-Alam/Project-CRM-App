import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../../context";
import "./NavBar.css";
const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useGlobalContext();
  const handleLogOut = () => {
    document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
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
