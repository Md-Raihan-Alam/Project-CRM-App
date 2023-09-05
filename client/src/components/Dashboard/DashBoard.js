import "./DashBoard.css";
import axios from "axios";
import { useGlobalContext } from "../../context";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const DashBoard = () => {
  const [error, setError] = useState("");
  const [errorFound, setErrorFound] = useState(false);
  const [customers, setCustomers] = useState({});
  const [avail, setAvail] = useState(0);
  const navigate = useNavigate();
  const { setUserInfo } = useGlobalContext();
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
  useEffect(() => {
    const cookieValue = getCookie("token");
    async function fetchData() {
      try {
        const response = await axios.post(
          "http://localhost:9000/api/v1/auth/authVerify",
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

    fetchData();
    const allCustomers = async () => {
      const tokenValue = getCookie("token");
      try {
        const response = await axios.get("http://localhost:9000/api/v1/CRM", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${tokenValue}`,
          },
        });
        console.log(response);
        if (response.status === 200) {
          setErrorFound(false);
          setError("");
          setAvail(response.data.count);
          setCustomers(response.data.peoples);
          console.log(response);
        }
      } catch (error) {
        setErrorFound(true);
        setError(error.response.data.message);
        setAvail(0);
        setCustomers({});
      }
    };
    allCustomers();
  }, []);
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
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.address}</td>
                <td>{item.city}</td>
                <td>{item.state}</td>
                <td>{item.zipcode}</td>
                <td>
                  <button className="btn btn-primary">Edit</button>
                  <button className="btn btn-danger">Delete</button>
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
