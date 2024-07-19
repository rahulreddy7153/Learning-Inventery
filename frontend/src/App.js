import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Stockledger from "./Pages/Stockledger";
import Projects from "./Pages/Masters/Projects";
import Suppliers from "./Pages/Masters/Suppliers";
import Contractors from "./Pages/Masters/Contractors";
import ContractorStore from "./Pages/Stores/contractorStore";
import CompanyStore from "./Pages/Stores/companyStore";

import MIN from "./Pages/Transactions/MIN/createMIN";
import Header from "./Components/Header";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import PrivateComponent from "./Components/PrivateComponent";
import Home from "./Pages/Home";
import Company from "./Pages/Masters/Company";
import AddProject from "./Pages/Masters/AddProject";
import AddContractor from "./Pages/Masters/AddContractor";
import AddSupliers from "./Pages/Masters/AddSupliers";
import AddCompany from "./Pages/Masters/AddCompany";
import AddcompanyStore from "./Pages/Stores/AddcompanyStore";
import AddcontractorStore from "./Pages/Stores/AddcontractorStore";
import Material from "./Pages/Masters/Material";
import AddMaterial from "./Pages/Masters/AddMaterial";
import CreateGRN from "./Pages/Transactions/GRN/CreateGRN";
import ReciptGRN from "./Pages/Transactions/GRN/reciptGRN";
import CreateMRF from "./Pages/Transactions/MRF/CreateMRF";
import ReciptMRF from "./Pages/Transactions/MRF/ReciptMRF";
import ReciptMIN from "./Pages/Transactions/MIN/reciptMIN";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <Routes>
          <Route exect path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          <Route path="/*" element={<Navigate to="/" />} />
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<Home />} />
            <Route path="/company" element={<Company />} />
            <Route path="/add-company" element={<AddCompany />} />
            <Route path="/add-project" element={<AddProject />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/add-contractor" element={<AddContractor />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/add-suppliers" element={<AddSupliers />} />
            <Route path="/contractors" element={<Contractors />} />
            <Route path="/company-stores" element={<CompanyStore />} />
            <Route path="/add-company-stores" element={<AddcompanyStore />} />
            <Route path="/contractor-stores" element={<ContractorStore />} />
            <Route
              path="/add-contractor-stores"
              element={<AddcontractorStore />}
            />
            <Route path="/material" element={<Material />} />
            <Route path="/add-material" element={<AddMaterial />} />

            <Route path="/create-grn" element={<CreateGRN />} />
            <Route path="/grn-recipt" element={<ReciptGRN />} />

            <Route path="/create-mrf" element={<CreateMRF />} />
            <Route path="/mrf-recipt" element={<ReciptMRF />} />

            <Route path="/create-min" element={<MIN />} />
            <Route path="/min-recipt" element={<ReciptMIN />} />
            <Route path="/stock-ledger" element={<Stockledger />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
