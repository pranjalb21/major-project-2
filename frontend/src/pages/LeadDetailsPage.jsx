import React, { useEffect } from "react";
import useLead from "../contexts/Lead.context";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import DesktopSidebar from "../components/DesktopSidebar";
import CommentForm from "../components/CommentForm";

export default function LeadDetailsPage() {
    const {
        sidebarList,
        fetchLead,
        selectedLead,
        loading,
        deleteLead,
        getComment,
        selectedLeadComments,
    } = useLead();
    const navigate = useNavigate();
    const { id: leadId } = useParams();
    const handleDelete = async (leadid) => {
        // Handle delete logic here
        await deleteLead(leadId);
        navigate("/", { replace: true });
    };
    const convertDate = (value) => {
        const dateFromDB = new Date(value); // Example date
        const ISTOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
        const ISTDate = new Date(dateFromDB.getTime() + ISTOffset);

        // console.log(ISTDate.toLocaleString("en-IN")); // Outputs date in IST format
        return ISTDate.toLocaleString("en-IN"); // Outputs date in IST format
    };
    useEffect(() => {
        // console.log(leadId);

        fetchLead(leadId);
        getComment(leadId);
    }, [leadId]);
    return (
        <>
            <Navbar
                sidebarList={sidebarList}
                navbarText={`Lead Management ${
                    selectedLead ? ` - ${selectedLead?.name}` : ""
                }`}
            />
            <main className="w-100">
                <div className="row gap-2 m-0">
                    <DesktopSidebar sidebarList={sidebarList} />
                    <section className="content px-4 p-md-3  col-md-9">
                        {!loading &&
                            (selectedLead ? (
                                <div className="mt-5">
                                    <section>
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
                                    </section>
                                    {!loading &&
                                        selectedLeadComments &&
                                        (selectedLeadComments?.length > 0 ? (
                                            <>
                                                <h5 className="fs-5 text-center mt-3">
                                                    Comments
                                                </h5>
                                                <ul className="list-group mt-1">
                                                    {selectedLeadComments?.map(
                                                        (comment) => (
                                                            <li
                                                                className="list-group-item"
                                                                key={
                                                                    comment._id
                                                                }
                                                            >
                                                                <p>
                                                                    <span className="fw-medium">
                                                                        Author :
                                                                    </span>{" "}
                                                                    {
                                                                        comment.author
                                                                    }{" "}
                                                                    <span className="fw-medium">
                                                                        |
                                                                    </span>{" "}
                                                                    {convertDate(
                                                                        comment.createdAt
                                                                    )}
                                                                </p>
                                                                {
                                                                    comment.commentText
                                                                }
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            </>
                                        ) : (
                                            ""
                                        ))}
                                    <CommentForm />
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
