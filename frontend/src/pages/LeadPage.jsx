import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useLead from "../contexts/Lead.context";
import { base_url } from "../constants/constants";
import Navbar from "../components/Navbar";
import DesktopSidebar from "../components/DesktopSidebar";

export default function LeadPage() {
    const navigate = useNavigate();
    const {
        leadList,
        loading,
        status,
        setFilters,
        fetchLeads,
        params,
        fetchLeadStatusCount,
        leadStatusCount,
        sidebarList,
    } = useLead();

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
        loadProducts();
    }, []);
    return (
        <>
            <Navbar sidebarList={sidebarList} navbarText={`Lead List`} />
            <main className="w-100">
                <div className="row gap-2 m-0">
                    <DesktopSidebar sidebarList={sidebarList} />
                    {/* Main content */}
                    <section className="content px-4 p-md-3  col-md-9 mt-md-0 mt-3">
                        <div className="row g-2">
                            <div className="col-md-6">
                                <div>
                                    <div className="d-flex justify-content-between align-items-center mb-1 p-1">
                                        <label
                                            htmlFor="filter"
                                            className="form-label"
                                        >
                                            Filter Leads:
                                        </label>
                                        <button
                                            className="btn btn-sm btn-success align-self-start"
                                            onClick={() =>
                                                navigate("/lead/add")
                                            }
                                        >
                                            <i className="bi bi-plus-circle"></i>{" "}
                                            Add New Lead
                                        </button>
                                    </div>
                                    <select
                                        name="filter"
                                        id="filter"
                                        className="form-select"
                                        value={status}
                                        onChange={(e) =>
                                            setFilters({
                                                status: e.target.value,
                                            })
                                        }
                                    >
                                        <option value="All">All</option>
                                        <option value="New">New</option>
                                        <option value="Contacted">
                                            Contacted
                                        </option>
                                        <option value="Qualified">
                                            Qualified
                                        </option>
                                        <option value="Proposal Sent">
                                            Proposal Sent
                                        </option>
                                    </select>
                                </div>
                            </div>
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
