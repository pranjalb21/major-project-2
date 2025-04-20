import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useLead from "../contexts/Lead.context";

const SalesAgentForm = () => {
    const { fetchAgent, updateAgent, addAgent } = useLead();
    const navigate = useNavigate();
    const { id: agentId } = useParams();
    const defaultValues = {
        name: "",
        email: "",
    };
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState(defaultValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateFormData = () => {
        const newError = {};
        if (!formData.name.trim()) {
            newError.name = "Name is required.";
        }
        if (!formData.email.trim()) {
            newError.email = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newError.email = "Email is invalid.";
        }

        if (Object.keys(newError).length > 0) {
            setErrors(newError);
        }
        return Object.keys(newError).length === 0;
    };

    const loadData = async () => {
        if (agentId) {
            const agent = await fetchAgent(agentId);
            setFormData({
                name: agent.name,
                email: agent.email,
            });
        } else {
            setFormData(defaultValues);
        }
    };
    useEffect(() => {
        loadData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        if (validateFormData()) {
            if (agentId) {
                await updateAgent(agentId, formData);
            } else {
                await addAgent(formData);
            }
            setFormData(defaultValues);
            navigate("/agents", { replace: true });
        }
    };

    return (
        <div className="row">
            <div className="col-sm-12">
                <div className="card mb-3 shadow-sm border-1 border-primary-subtle">
                    <div className="card-body">
                        <form onSubmit={handleSubmit} className="row g-3 mt-2">
                            <div className="col-md-6">
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    className="form-control"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
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
                                <label htmlFor="name" className="form-label">
                                    Email Address
                                </label>
                                <input
                                    type="text"
                                    id="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            email: e.target.value,
                                        })
                                    }
                                />
                                {errors.email && (
                                    <p className="m-0 text-danger">
                                        *<small>{errors.email}</small>
                                    </p>
                                )}
                            </div>
                            <div className="col-md-6">
                                <button
                                    type="button"
                                    className="w-100 btn btn-outline-danger"
                                    onClick={() =>
                                        navigate(`/agents`, {
                                            replace: true,
                                        })
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
                                    {agentId ? "Update" : "Add"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesAgentForm;
