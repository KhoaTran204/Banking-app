import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "../components/Home";
import Dashboard from "../components/Admin";
import NewEmployee from "../components/Admin/NewEmployee";
import PageNotFound from "../components/PageNotFound";
import Branding from "../components/Admin/Branding";
import Branch from "../components/Admin/Branch";
import Currency from "../components/Admin/Currency";
import EmployeeDashboard from "../components/Employee";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />

        {/*Start admin related routes*/}
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/new-employee" element={<NewEmployee />} />
        <Route path="/admin/branding" element={<Branding />} />
        <Route path="/admin/branch" element={<Branch />} />
        <Route path="/admin/currency" element={<Currency />} />
        <Route path="/*" element={<PageNotFound />} />
        {/*End admin related routes*/}

        {/*Start employee related routes*/}
        <Route path="/employee" element={<EmployeeDashboard />} />

        {/*End employee related routes*/}
      </Routes>
    </BrowserRouter>
  );
};
export default App;
