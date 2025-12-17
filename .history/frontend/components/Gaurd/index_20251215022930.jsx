import Cookies from "universal-cookie";
import { http } from "../../modules/modules";
import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

const Guard = ({ endpoint, role }) => {
  const cookies = new Cookies();
  const token = cookies.get("authToken");
  const [authorised, setAuthorised] = useState(false);

  useEffect(() => {
    if (!token) {
      setAuthorised(false);
      return;
    }

    const verifyToken = async () => {
      try {
        const httpReq = http(token);
        const { data } = await httpReq.get(endpoint);

        sessionStorage.setItem("userInfo", JSON.stringify(data.data));

        setAuthorised(true);
      } catch {
        setAuthorised(false);
      }
    };

    verifyToken();
  }, [endpoint, token]);

  if (!token) {
    return <Navigate to="/" />;
  }

  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

  if (authorised && userInfo?.role === role) {
    return <Outlet />;
  }

  return <Navigate to="/" />;
};

export default Guard;
