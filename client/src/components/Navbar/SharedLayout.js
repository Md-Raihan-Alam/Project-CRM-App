import { Outlet } from "react-router-dom";
import NavBar from "./Navbar";
const SharedLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
export default SharedLayout;
