import "./DashBoard.css";
import axios from "axios";
import { useGlobalContext } from "../../context";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
const DashBoard = () => {
  const [error, setError] = useState("");
  const [errorFound, setErrorFound] = useState(false);
  const [customers, setCustomers] = useState({});
  const [avail, setAvail] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { getCookie, setUserInfo } = useGlobalContext();
  const allCustomers = async () => {
    const tokenValue = getCookie("token");
    try {
      const response = await axios.get(
        "https://project-crm-app.vercel.app/api/v1/CRM",
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
        setAvail(response.data.count);
        setCustomers(response.data.peoples);
        setLoading(false);
      }
    } catch (error) {
      setErrorFound(true);
      setError(error.response.data.message);
      setAvail(0);
      setCustomers({});
      setLoading(false);
    }
  };
  async function fetchData() {
    const cookieValue = getCookie("token");
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
        navigate("/dashboard");
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

  useEffect(() => {
    fetchData();
    allCustomers();
  }, []);
  const deleteCustomer = async (e) => {
    const tokenValue = getCookie("token");
    try {
      const response = await axios.delete(
        `https://project-crm-app.vercel.app/api/v1/CRM/${e}`,
        {
          headers: {
            Authorization: `Bearer ${tokenValue}`,
          },
        }
      );
      if (response.status === 200) {
        setCustomers((customers) =>
          customers.filter((customer) => customer._id !== e)
        );
      } else {
        setErrorFound(true);
        setError("Some problem occur, Try again later");
      }
    } catch (error) {
      setErrorFound(true);
      setError("Some problem occur, Try again later");
    }
  };
  useEffect(() => {
    if (customers.length === 0) {
      setAvail(0);
    }
  }, [customers]);
  if (loading === true) {
    return (
      <div className="container">
        <div className="text-center display-6 mt-5">Loading....</div>
      </div>
    );
  }
  if (errorFound === true) {
    return (
      <div className="container overflow_set">
        <div className="alert alert-danger mt-5 text-center">{error}</div>
      </div>
    );
  }
  if (avail === 0) {
    return (
      <div className="container overflow_set">
        <div className="alert alert-primary mt-5 text-center">
          You have not added any customer.
        </div>
      </div>
    );
  }
  return (
    <div className="container overflow_set">
      <table className="table mt-3">
        <thead className="table-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">City</th>
            <th scope="col">State</th>
            <th scope="col">Zipcode</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((item, index) => {
            return (
              <tr key={item._id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.address}</td>
                <td>{item.city}</td>
                <td>{item.state}</td>
                <td>{item.zipcode}</td>
                <td>
                  <Link to={`/dashboard/${item._id}`}>
                    <button className="btn btn-primary m-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="white"
                          d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                        />
                      </svg>
                    </button>
                  </Link>
                  <button
                    onClick={(e) => deleteCustomer(item._id)}
                    className="btn btn-danger m-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="white"
                        d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default DashBoard;
