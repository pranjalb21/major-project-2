import React, { useEffect } from "react";
import useLead from "../contexts/Lead.context";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import DesktopSidebar from "../components/DesktopSidebar";

export default function LeadDetailsPage() {
    const { sidebarList, fetchLead, selectedLead, loading, deleteLead } =
        useLead();
    const navigate = useNavigate();
    const { id: leadId } = useParams();
    const handleDelete = async (leadid) => {
        // Handle delete logic here
        await deleteLead(leadId);
        navigate("/", { replace: true });
    };
    useEffect(() => {
        fetchLead(leadId);
    }, [leadId]);
    return (
        <>
            <Navbar sidebarList={sidebarList} navbarText={`Lead Details`} />
            <main className="w-100">
                <div className="row gap-2 m-0">
                    <DesktopSidebar sidebarList={sidebarList} />
                    <section className="content px-4 p-md-3  col-md-9">
                        {!loading &&
                            (selectedLead ? (
                                <div className="mt-5">
                                    <ul className="list-group shadow-sm">
                                        <li className="list-group-item d-flex justify-content-between align-items-center">
                                            <h3>{selectedLead.name}</h3>
                                            <div className="d-flex gap-2">
                                                <Link
                                                    to={`/lead/edit/${leadId}`}
                                                >
                                                    <button className="btn btn-outline-primary btn-sm px-4">
                                                        Edit
                                                    </button>
                                                </Link>
                                                <button
                                                    className="btn btn-sm btn-outline-danger px-3"
                                                    onClick={() =>
                                                        handleDelete(leadId)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </li>
                                        <li className="list-group-item">
                                            <span className="fw-medium">
                                                Source
                                            </span>
                                            : {selectedLead.source}
                                        </li>
                                        <li className="list-group-item">
                                            <span className="fw-medium">
                                                Status:{" "}
                                            </span>
                                            {selectedLead.status}
                                        </li>
                                        <li className="list-group-item">
                                            <span className="fw-medium">
                                                Priority:{" "}
                                            </span>
                                            {selectedLead.priority}
                                        </li>
                                        <li className="list-group-item">
                                            <span className="fw-medium">
                                                Agent Name:{" "}
                                            </span>
                                            {selectedLead.salesAgent.name}
                                        </li>
                                        <li className="list-group-item">
                                            <span className="fw-medium">
                                                Agent Email:{" "}
                                            </span>
                                            {selectedLead.salesAgent.email}
                                        </li>
                                    </ul>
                                </div>
                            ) : (
                                <p>Loading...</p>
                            ))}
                    </section>
                </div>
            </main>
        </>
    );
}
