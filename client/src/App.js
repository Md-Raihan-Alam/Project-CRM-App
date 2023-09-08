import SharedLayout from "./components/Navbar/SharedLayout";
import "./App.css";
import LoginPage from "./components/LoginPage/LoginPage";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import DashBoard from "./components/Dashboard/DashBoard";
import FormClient from "./components/Form/FormClient";
import SharedDashboardLayout from "./components/Dashboard/SharedDashboardLayout";
import EditClient from "./components/Form/EditClient";
// import NavBar from "./components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="dashboard" element={<SharedDashboardLayout />}>
            <Route index element={<DashBoard />} />
            <Route path=":customerId" element={<EditClient />} />
          </Route>
          <Route path="addClient" element={<FormClient />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
