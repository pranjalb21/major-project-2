import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { base_url } from "../constants/constants";

const LeadContext = createContext();

const useLead = () => useContext(LeadContext);
export default useLead;

export const LeadProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [leadList, setLeadList] = useState([]);
    const [selectedLead, setSelectedLead] = useState(null);
    const [selectedLeadComments, setSelectedLeadComments] = useState(null);
    const [agentList, setAgentList] = useState([]);
    const [selectedAgentLeads, setSelectedAgentLeads] = useState([]);
    const [leadStatusCount, setLeadStatusCount] = useState({
        newLeads: 0,
        contactedLeads: 0,
        qualifiedLeads: 0,
        proposalSentLeads: 0,
        closedLeads: 0,
        openLeads: 0,
        totalLeads: 0,
    });

    const sidebarList = [
        { name: "Leads", link: "/leads" },
        // { name: "Sales", link: "/sales" },
        { name: "Agents", link: "/agents" },
        { name: "Reports", link: "/reports" },
    ];
    const [params, setParams] = useSearchParams();
    const status = params.get("status") || undefined;
    const sortOrder = params.get("sortOrder") || undefined;

    const setFilters = (filter) => {
        setParams((params) => {
            if (filter.status !== undefined) {
                if (filter.status === "") {
                    params.delete("status");
                } else {
                    params.set("status", filter.status);
                }
            }
            if (filter.sortOrder !== undefined) {
                if (filter.sortOrder === "") {
                    params.delete("sortOrder");
                } else {
                    params.set("sortOrder", filter.sortOrder);
                }
            }
            return params;
        });
    };
    const fetchLeads = async (url) => {
        setLoading(true);
        setLeadList([]);
        await fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setLeadList(data.data);
                // console.log(data.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    const fetchLeadStatusCount = async () => {
        setLoading(true);
        setLeadStatusCount(null);

        await fetch(`${base_url}/leads/statuscount`)
            .then((res) => res.json())
            .then((data) => {
                setLeadStatusCount(data.data);
                // console.log(data.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const fetchLead = async (id) => {
        setLoading(true);
        setSelectedLead(null);
        const lead = await fetch(`${base_url}/leads/get/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setSelectedLead(data.data);
                return data.data;
                // console.log(data.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
        return lead;
    };

    const fetchAgents = async () => {
        setLoading(true);
        setAgentList([]);
        await fetch(`${base_url}/agents`)
            .then((res) => res.json())
            .then((data) => {
                setAgentList(data.data);
                // console.log(data.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const fetchAgent = async (id) => {
        setLoading(true);
        const agent = await fetch(`${base_url}/agents/${id}`)
            .then((res) => res.json())
            .then((data) => data.data)
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
        return agent;
    };

    const fetchSelectedAgentLeads = async (url) => {
        setLoading(true);
        setSelectedAgentLeads([]);
        await fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setSelectedAgentLeads(data.data);
                // console.log(data.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const updateAgent = async (id, agentData) => {
        setLoading(true);
        await fetch(`${base_url}/agents/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(agentData),
        })
            .then((res) => res.json())
            .then((data) => {
                setAgentList((prev) =>
                    prev.map((agent) => (agent._id === id ? data.data : agent))
                );
                // console.log(data.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const addAgent = async (agentData) => {
        setLoading(true);
        await fetch(`${base_url}/agents`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(agentData),
        })
            .then((res) => res.json())
            .then((data) => {
                setAgentList((prev) => [...prev, data.data]);
                // console.log(data.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const addLead = async (leadData) => {
        setLoading(true);
        // console.log(leadData);
        await fetch(`${base_url}/leads`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(leadData),
        })
            .then((res) => res.json())
            .then((data) => {
                setLeadList((prev) => [...prev, data.data]);
                // console.log(data.data);
                fetchLeadStatusCount();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const updateLead = async (id, leadData) => {
        setLoading(true);

        await fetch(`${base_url}/leads/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(leadData),
        })
            .then((res) => res.json())
            .then((data) => {
                setLeadList((prev) =>
                    prev.map((lead) => (lead._id === id ? data.data : lead))
                );
                fetchLeadStatusCount();
                // console.log(data.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const deleteLead = async (id) => {
        setLoading(true);
        await fetch(`${base_url}/leads/${id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                setLeadList((prev) => prev.filter((lead) => lead._id !== id));
                fetchLeadStatusCount();
                // console.log(data.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const getComment = async (leadId) => {
        setLoading(true);
        setSelectedLeadComments(null);
        await fetch(`${base_url}/leads/${leadId}/comments`)
            .then((res) => res.json())
            .then((data) => {
                setSelectedLeadComments(data.data);
                // console.log(data.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };
    const addComment = async (leadId, comment) => {
        setLoading(true);
        // console.log(leadId, comment);
        // console.log(`${base_url}/leads/${leadId}/comments`);

        await fetch(`${base_url}/leads/${leadId}/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(comment),
        })
            .then((res) => res.json())
            .then((data) => {
                setSelectedLeadComments((prev) => [data.data, ...prev]);
                // console.log(data.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchLeadStatusCount();
    }, []);
    return (
        <LeadContext.Provider
            value={{
                leadList,
                loading,
                fetchLeads,
                params,
                setFilters,
                status,
                fetchLeadStatusCount,
                leadStatusCount,
                sidebarList,
                fetchAgents,
                agentList,
                fetchLead,
                selectedLead,
                addLead,
                updateLead,
                deleteLead,
                fetchAgent,
                updateAgent,
                addAgent,
                getComment,
                selectedLeadComments,
                addComment,
                sortOrder,
                fetchSelectedAgentLeads,
                selectedAgentLeads,
            }}
        >
            {children}
        </LeadContext.Provider>
    );
};
