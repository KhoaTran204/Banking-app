import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "../components/Home";
import Dashboard from "../components/Admin";
import NewEmployee from "../components/Admin/NewEmployee";
import PageNotFound from "../components/PageNotFound";
import Branding from "../components/Admin/Branding";
import Branch from "../components/Admin/Branch";
import Currency from "../components/Admin/Currency";
import EmployeeDashboard from "../components/Employee";
import Guard from "../components/Gaurd";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />

        {/*Start admin related routes*/}
        <Route
          path="/admin/"
          element={<Guard endpoint={"/api/verify-token"} role="admin" />}
        >
          <Route index element={<Dashboard />} />
          <Route path="new-employee" element={<NewEmployee />} />
          <Route path="branding" element={<Branding />} />
          <Route path="branch" element={<Branch />} />
          <Route path="currency" element={<Currency />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        {/*End admin related routes*/}

        {/*Start employee related routes*/}
        <Route path="/employee/">
          <Route index element={<EmployeeDashboard />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        {/*End employee related routes*/}
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
