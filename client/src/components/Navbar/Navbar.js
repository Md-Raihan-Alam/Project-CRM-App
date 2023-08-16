import { Link } from "react-router-dom";
import "./NavBar.css";
const NavBar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/">
          CRM
        </a>
        <div className="d-flex">
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
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
