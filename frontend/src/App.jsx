import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Loader from "./components/Loader";
import useLead from "./contexts/Lead.context";
import Sales from "./pages/Sales";
import Reports from "./pages/Reports";
import Agents from "./pages/Agents";
function App() {
    const { loading } = useLead();
    return (
        <>
            {loading ? <Loader /> : null}
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/agents" element={<Agents />} />
                <Route path="/reports" element={<Reports />} />
            </Routes>
        </>
    );
}

export default App;
