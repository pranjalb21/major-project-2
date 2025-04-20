import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useLead from "../contexts/Lead.context";

export default function LeadForm() {
    const navigate = useNavigate();
    const { fetchLead, fetchAgents, agentList, addLead, updateLead } =
        useLead();
    const [errors, setErrors] = useState({});
    const defaultLead = {
        name: "",
        source: "Website",
        salesAgent: agentList?.length > 0 ? agentList[0] : {},
        status: "New",
        tags: [],
        timeToClose: 0,
        priority: "Low",
    };
    const [leadData, setLeadData] = useState(defaultLead);
    const { id: leadId } = useParams();
    const loadData = async () => {
        if (leadId) {
            const lead = await fetchLead(leadId);
            setLeadData(lead);
        }
        fetchAgents();
    };
    const validateForm = () => {
        const newErrors = {};
        if (!leadData.name.trim()) newErrors.name = "Name is required.";
        if (!leadData.source) newErrors.source = "Source is required.";
        if (!leadData.salesAgent)
            newErrors.salesAgent = "Sales Agent is required.";
        if (!leadData.status) newErrors.status = "Status is required.";
        if (!leadData.tags.length || leadData.tags[0] === "")
            newErrors.tags = "At least one tag is required.";
        if (!leadData.timeToClose || leadData.timeToClose <= 0)
            newErrors.timeToClose = "Time to Close must be greater than 0.";
        if (!leadData.priority) newErrors.priority = "Priority is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        if (validateForm()) {
            // Submit the form
            // console.log("Form submitted successfully", leadData);
            if (leadId) {
                // console.log(leadData);

                updateLead(leadId, {
                    ...leadData,
                    salesAgent: leadData.salesAgent._id,
                    timeToClose: parseInt(leadData.timeToClose),
                });
                navigate(`/lead/${leadId}`, { replace: true });
            } else {
                addLead({
                    ...leadData,
                    salesAgent: leadData.salesAgent._id,
                    timeToClose: parseInt(leadData.timeToClose),
                });
                navigate(`/`, { replace: true });
            }
        }
    };
    useEffect(() => {
        loadData();
    }, []);
    return (
        <div className="row">
            <div className="col-sm-12">
                <div className="card mb-3 shadow-sm border-1 border-primary-subtle">
                    <div className="card-body">
                        <form className="row g-3 mt-2" onSubmit={handleSubmit}>
                            <div className="col-md-12">
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    value={leadData.name}
                                    onChange={(e) =>
                                        setLeadData({
                                            ...leadData,
                                            name: e.target.value,
                                        })
                                    }
                                />
                                {errors.name && (
                                    <p className="m-0 text-danger">
                                        *<small>{errors.name}</small>
                                    </p>
                                )}
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="source" className="form-label">
                                    Source
                                </label>
                                <select
                                    id="source"
                                    className="form-select"
                                    value={leadData.source}
                                    onChange={(e) =>
                                        setLeadData({
                                            ...leadData,
                                            source: e.target.value,
                                        })
                                    }
                                >
                                    <option value="Website">Website</option>
                                    <option value="Referral">Referral</option>
                                    <option value="Cold Call">Cold Call</option>
                                    <option value="Advertisement">
                                        Advertisement
                                    </option>
                                    <option value="Email">Email</option>
                                    <option value="Other">Other</option>
                                </select>
                                {errors.source && (
                                    <p className="m-0 text-danger">
                                        *<small>{errors.source}</small>
                                    </p>
                                )}
                            </div>
                            <div className="col-md-6">
                                <label
                                    htmlFor="salesAgent"
                                    className="form-label"
                                >
                                    Sales Agent
                                </label>
                                <select
                                    id="salesAgent"
                                    className="form-select"
                                    value={leadData.salesAgent._id}
                                    onChange={(e) =>
                                        setLeadData({
                                            ...leadData,
                                            salesAgent: (agentList?.filter(
                                                (agent) =>
                                                    agent._id === e.target.value
                                            ))[0],
                                        })
                                    }
                                >
                                    {agentList?.map((agent) => (
                                        <option
                                            key={agent._id}
                                            value={agent._id}
                                        >
                                            {agent.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.salesAgent && (
                                    <p className="m-0 text-danger">
                                        *<small>{errors.salesAgent}</small>
                                    </p>
                                )}
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="status" className="form-label">
                                    Status
                                </label>
                                <select
                                    id="status"
                                    className="form-select"
                                    value={leadData.status}
                                    onChange={(e) =>
                                        setLeadData({
                                            ...leadData,
                                            status: e.target.value,
                                        })
                                    }
                                >
                                    <option value="New">New</option>
                                    <option value="Contacted">Contacted</option>
                                    <option value="Qualified">Qualified</option>
                                    <option value="Proposal Sent">
                                        Proposal Sent
                                    </option>
                                    <option value="Closed">Closed</option>
                                </select>
                                {errors.status && (
                                    <p className="m-0 text-danger">
                                        *<small>{errors.status}</small>
                                    </p>
                                )}
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="tags" className="form-label">
                                    Tags <small>(comma separated values)</small>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="tags"
                                    value={leadData.tags.join(", ")}
                                    onChange={(e) =>
                                        setLeadData({
                                            ...leadData,
                                            tags: e.target.value.split(", "),
                                        })
                                    }
                                />
                                {errors.tags && (
                                    <p className="m-0 text-danger">
                                        *<small>{errors.tags}</small>
                                    </p>
                                )}
                            </div>
                            <div className="col-md-6">
                                <label
                                    htmlFor="timeToClose"
                                    className="form-label"
                                >
                                    Time to Close (days)
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="timeToClose"
                                    value={leadData.timeToClose}
                                    onChange={(e) =>
                                        setLeadData({
                                            ...leadData,
                                            timeToClose: e.target.value,
                                        })
                                    }
                                />
                                {errors.timeToClose && (
                                    <p className="m-0 text-danger">
                                        *<small>{errors.timeToClose}</small>
                                    </p>
                                )}
                            </div>
                            <div className="col-md-6">
                                <label
                                    htmlFor="priority"
                                    className="form-label"
                                >
                                    Priority
                                </label>
                                <select
                                    id="priority"
                                    className="form-select"
                                    value={leadData.priority}
                                    onChange={(e) =>
                                        setLeadData({
                                            ...leadData,
                                            priority: e.target.value,
                                        })
                                    }
                                >
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                                {errors.priority && (
                                    <p className="m-0 text-danger">
                                        *<small>{errors.priority}</small>
                                    </p>
                                )}
                            </div>
                            <div className="col-md-6">
                                <button
                                    type="button"
                                    className="w-100 btn btn-outline-danger"
                                    onClick={() =>
                                        leadId
                                            ? navigate(`/lead/${leadId}`, {
                                                  replace: true,
                                              })
                                            : navigate("/leads")
                                    }
                                >
                                    Cancel
                                </button>
                            </div>
                            <div className="col-md-6">
                                <button
                                    type="submit"
                                    className="w-100 btn btn-outline-success"
                                >
                                    {leadId ? "Update" : "Add"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
