import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import DesktopSidebar from "../components/DesktopSidebar";
import useLead from "../contexts/Lead.context";
import { base_url, title } from "../constants/constants";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
    const {
        sidebarList,
        leadStatusCount,
        loading,
        leadList,
        fetchLeads,
        params,
        setFilters,
    } = useLead();
    const navigate = useNavigate();
    const createUrl = () => {
        const baseUrl = `${base_url}/leads/all`;
        const queryString = params.toString();
        return `${baseUrl}?${queryString}`;
    };
    const loadProducts = async () => {
        const url = createUrl();
        await fetchLeads(url);
    };
    useEffect(() => {
        loadProducts();
    }, [params]);
    useEffect(() => {
        document.title = `${title} | Dashboard`
        loadProducts();
    }, []);
    const handleActiveStatus = (e) => {
        const items = document.querySelectorAll(".list-lead-status-item");
        items.forEach((item) => item.classList.remove("active"));
        e.currentTarget.classList.add("active");
        setFilters({ status: e.currentTarget.innerText.split(":")[0] });
    };
    return (
        <>
            <Navbar
                sidebarList={sidebarList}
                navbarText={`Anvaya CRM Dashboard`}
            />
            <main className="w-100">
                <div className="row gap-2 m-0">
                    <DesktopSidebar sidebarList={sidebarList} />
                    {/* Main content */}
                    <section className="content px-4 p-md-3  col-md-9 mt-md-0 mt-3">
                        <div className="col-md-6">
                            <h5 className="fs-5">Lead Status: </h5>
                            <ul className="list-lead-status">
                                <li
                                    className="list-lead-status-item active"
                                    onClick={handleActiveStatus}
                                >
                                    All:{" "}
                                    <span>{leadStatusCount?.openLeads}</span>
                                </li>
                                <li
                                    className="list-lead-status-item"
                                    onClick={handleActiveStatus}
                                >
                                    New:{" "}
                                    <span>{leadStatusCount?.newLeads}</span>
                                </li>
                                <li
                                    className="list-lead-status-item"
                                    onClick={handleActiveStatus}
                                >
                                    Contacted:{" "}
                                    <span>
                                        {leadStatusCount?.contactedLeads}
                                    </span>
                                </li>
                                <li
                                    className="list-lead-status-item"
                                    onClick={handleActiveStatus}
                                >
                                    Qualified:{" "}
                                    <span>
                                        {leadStatusCount?.qualifiedLeads}
                                    </span>
                                </li>
                                <li
                                    className="list-lead-status-item"
                                    onClick={handleActiveStatus}
                                >
                                    Proposal Sent:{" "}
                                    <span>
                                        {leadStatusCount?.proposalSentLeads}
                                    </span>
                                </li>
                            </ul>
                        </div>
                        {!loading &&
                            (leadList?.length > 0 ? (
                                <>
                                    <div className="table-responsive mt-2">
                                        <h2>Leads</h2>
                                        <table className="table table-striped table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Lead Name</th>
                                                    <th>Status</th>
                                                    <th>Sales Agent</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {leadList?.map(
                                                    (lead, index) => (
                                                        <tr key={index}>
                                                            <td
                                                                className="link-hover"
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/lead/${lead._id}`
                                                                    )
                                                                }
                                                            >
                                                                {lead.name}
                                                            </td>
                                                            <td>
                                                                {lead.status}
                                                            </td>
                                                            <td>
                                                                {
                                                                    lead
                                                                        .salesAgent
                                                                        .name
                                                                }
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            ) : (
                                <p className="py-3">No Leads found</p>
                            ))}
                    </section>
                </div>
            </main>
        </>
    );
}
