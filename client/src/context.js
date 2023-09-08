import { createContext, useContext, useState } from "react";
const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);
const AppContext = ({ children }) => {
  const [error, setError] = useState("");
  const [errorFound, setErrorFound] = useState(false);
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
        error,
        setError,
        errorFound,
        setErrorFound,
        registerInfo,
        handleRegister,
        handleRegisterReset,
        loginInfo,
        handleLogin,
        handleLoginReset,
        userInfo,
        setUserInfo,
        customerInfo,
        setCustomerInfo,
        handleCustomerInfo,
        handleCustomerReset,
        getCookie,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
