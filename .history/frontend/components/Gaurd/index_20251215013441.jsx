import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { http } from "../../modules/modules";
import { Navigate, Outlet } from "react-router-dom";

const Guard = ({ endpoint, role }) => {
  const cookies = new Cookies();
  const token = cookies.get("authToken");
  const [authorised, setAuthorised] = useState(false);
  if (token === undefined) {
    return <Navigate to="/" />;
  }

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setAuthorised(false);
        return <Navigate to="/" />;
      }
      try {
        const httpReq = http(token);
        const { data } = await httpReq.get(endpoint);
        sessionStorage.setItem("userInfo", JSON.stringify(data?.data));
        setAuthorised(true);
      } catch (err) {
        setAuthorised(false);
      }
    };
    verifyToken();
  }, [endpoint]);
  if (authorised && role === "admin") {
    <Outlet />;
  } else if (authorised && role === "employee") {
    <Outlet />;
  } else if (authorised && role === "customer") {
    <Outlet />;
  } else {
    <Navigate to="/" />;
  }
};
export default Guard;
