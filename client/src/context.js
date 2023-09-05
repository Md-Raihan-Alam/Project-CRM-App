import { createContext, useContext, useState } from "react";
const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);
const AppContext = ({ children }) => {
  const [userInfo, setUserInfo] = useState("");
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
  });
  const handleLogin = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };
  const handleRegister = (e) => {
    setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value });
  };
  const handleCustomerInfo = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };
  const handleRegisterReset = () => {
    setRegisterInfo({
      name: "",
      email: "",
      password: "",
    });
  };
  const handleLoginReset = () => {
    setLoginInfo({
      email: "",
      password: "",
    });
  };
  const handleCustomerReset = () => {
    setCustomerInfo({
      name: "",
      address: "",
      city: "",
      state: "",
      zipcode: "",
    });
  };
  return (
    <GlobalContext.Provider
      value={{
        registerInfo,
        handleRegister,
        handleRegisterReset,
        loginInfo,
        handleLogin,
        handleLoginReset,
        userInfo,
        setUserInfo,
        customerInfo,
        handleCustomerInfo,
        handleCustomerReset,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
