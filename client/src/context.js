import { createContext, useContext, useState } from "react";
const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);
const AppContext = ({ children }) => {
  const [useInfo, setUserInfo] = useState("");
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const handleLogin = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };
  const handleRegister = (e) => {
    setRegisterInfo({ ...registerInfo, [e.target.name]: e.target.value });
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
  return (
    <GlobalContext.Provider
      value={{
        registerInfo,
        handleRegister,
        handleRegisterReset,
        loginInfo,
        handleLogin,
        handleLoginReset,
        setUserInfo,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
