import DashboardPage from "./pages/DashboardPage";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Loader from "./components/Loader";
import useLead from "./contexts/Lead.context";
import SalesPage from "./pages/SalesPage";
import ReportsPage from "./pages/ReportsPage";
import LeadDetailsPage from "./pages/LeadDetailsPage";
import LeadEditPage from "./pages/LeadEditPage";
import LeadAddPage from "./pages/LeadAddPage";
import AgentsPage from "./pages/AgentsPage";
import AgentEditPage from "./pages/AgentEditPage";
import AgentAddPage from "./pages/AgentAddPage";
function App() {
    const { loading } = useLead();
    return (
        <>
            {loading ? <Loader /> : null}
            <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/lead/edit/:id" element={<LeadEditPage />} />
                <Route path="/lead/:id" element={<LeadDetailsPage />} />
                <Route path="/lead/add" element={<LeadAddPage />} />
                {/* <Route path="/sales" element={<SalesPage />} /> */}
                <Route path="/agents" element={<AgentsPage />} />
                <Route path="/agent/edit/:id" element={<AgentEditPage />} />
                <Route path="/agent/add" element={<AgentAddPage />} />
                <Route path="/reports" element={<ReportsPage />} />
            </Routes>
        </>
    );
}

export default App;
