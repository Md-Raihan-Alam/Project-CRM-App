import axios from "axios";
import { useGlobalContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const FormClient = () => {
  const [error, setError] = useState("");
  const [errorFound, setErrorFound] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const {
    getCookie,
    setUserInfo,
    customerInfo,
    handleCustomerInfo,
    handleCustomerReset,
  } = useGlobalContext();
  const { name, address, city, state, zipcode } = customerInfo;
  useEffect(() => {
    const cookieValue = getCookie("token");
    handleCustomerReset();
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
          navigate("/addClient");
          setUserInfo(response.data.name);
        } else {
          navigate("/");
          setUserInfo("");
        }
      } catch (error) {
        setUserInfo("");
        navigate("/");
        console.error("Error while verifying token:", error);
      }
    }

    fetchData();
  }, []);
  const handleClient = async (e) => {
    e.preventDefault();
    const tokenValue = getCookie("token");
    try {
      const response = await axios.post(
        "https://project-crm-app.vercel.app/api/v1/CRM",
        customerInfo,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenValue}`,
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        handleCustomerReset();
        setErrorFound(false);
        setError("");
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 2000);
      }
    } catch (error) {
      setErrorFound(true);
      setSuccess(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div className="border p-4">
        {errorFound && (
          <div className="text-center bg-danger text-white p-4">
            {error === "" ? "Something went wrong, try later" : error}
          </div>
        )}
        {success && (
          <div className="text-center bg-success text-white p-4">
            Customer has been added
          </div>
        )}
        <h2 className="mb-4">Customer Information</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={name}
              onChange={handleCustomerInfo}
              placeholder="Enter customer name"
              autoCorrect="off"
              autoComplete="off"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={address}
              onChange={handleCustomerInfo}
              placeholder="Enter customer address"
              autoCorrect="off"
              autoComplete="off"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              name="city"
              value={city}
              onChange={handleCustomerInfo}
              placeholder="Enter customer city"
              autoCorrect="off"
              autoComplete="off"
              required
            />
          </div>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="state" className="form-label">
                State
              </label>
              <input
                type="text"
                className="form-control"
                name="state"
                value={state}
                onChange={handleCustomerInfo}
                placeholder="Enter customer state"
                autoCorrect="off"
                autoComplete="off"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="zipcode" className="form-label">
                Zipcode
              </label>
              <input
                type="text"
                className="form-control"
                name="zipcode"
                value={zipcode}
                onChange={handleCustomerInfo}
                placeholder="Enter customer zipcode"
                autoCorrect="off"
                autoComplete="off"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            onClick={handleClient}
            className="btn w-100 btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormClient;
