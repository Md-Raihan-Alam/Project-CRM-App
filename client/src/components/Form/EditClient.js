import axios from "axios";
import { useGlobalContext } from "../../context";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
const EditClient = () => {
  const { customerId } = useParams();
  const [error, setError] = useState("");
  const [errorFound, setErrorFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {
    getCookie,
    setUserInfo,
    customerInfo,
    setCustomerInfo,
    handleCustomerInfo,
    handleCustomerReset,
  } = useGlobalContext();
  const { name, address, city, state, zipcode } = customerInfo;
  useEffect(() => {
    const cookieValue = getCookie("token");
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
    const customerData = async () => {
      const tokenValue = getCookie("token");
      try {
        const response = await axios.get(
          `https://project-crm-app.vercel.app/api/v1/CRM/${customerId}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${tokenValue}`,
            },
          }
        );
        if (response.status === 200) {
          setErrorFound(false);
          setError("");
          setLoading(false);
          setCustomerInfo(response.data.people);
          // console.log(response);
        } else {
          // console.log("HERE");
          setErrorFound(false);
          setLoading(false);
          setError("");
          // console.log(response);
          navigate("/dashboard");
          handleCustomerReset();
        }
      } catch (error) {
        // console.log("HERE2");
        setErrorFound(false);
        setLoading(false);
        setError("");
        // console.log(error);
        navigate("/dashboard");
        handleCustomerReset();
      }
    };
    customerData();
  }, []);
  const handleUpdate = async (e) => {
    e.preventDefault();
    const tokenValue = getCookie("token");
    try {
      const response = await axios.patch(
        `https://project-crm-app.vercel.app/api/v1/CRM/${customerId}`,
        customerInfo,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenValue}`,
          },
        }
      );
      if (response.status === 200) {
        navigate("/dashboard");
      } else {
        setErrorFound(true);
        setError(response.data.message);
      }
    } catch (error) {
      console.log(error);
      setErrorFound(true);
      setError(error.response.data.message);
    }
  };

  const goBack = () => {
    navigate("/dashboard");
  };
  if (loading === true) {
    return (
      <div className="container">
        <div className="text-center display-6 mt-5">Loading....</div>
      </div>
    );
  }
  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div className="border p-4">
        {errorFound && (
          <div className="text-center bg-danger text-white p-4">
            {error === "" ? "Something went wrong, try later" : error}
          </div>
        )}
        <h2 className="mb-4">Edit Customer Information</h2>
        <form onSubmit={handleUpdate}>
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
          <button type="submit" className="btn w-100 btn-primary">
            Update
          </button>
          <button
            type="btn"
            onClick={goBack}
            className="btn my-2 w-100 btn-info"
          >
            Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditClient;
