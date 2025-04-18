import React, { useEffect } from "react";
import DesktopSidebar from "../components/DesktopSidebar";
import useLead from "../contexts/Lead.context";
import Navbar from "../components/Navbar";

export default function Agents() {
    const { sidebarList, loading, agentList, fetchAgents } = useLead();
    useEffect(() => {
        fetchAgents();
    }, []);
    return (
        <>
            <Navbar sidebarList={sidebarList} navbarText={`Agent Dashboard`} />
            <main className="w-100">
                <div className="row gap-2 m-0">
                <DesktopSidebar sidebarList={sidebarList} />
                <section className="content px-4 p-md-3  col-md-9">
                    <div className="row">
                        {!loading &&
                            (agentList.length > 0 ? (
                                agentList.map((agent) => (
                                    <div
                                        className="col-sm-6"
                                        key={agent._id}
                                    >
                                        <div className="card mb-3 shadow-sm border-1 border-primary-subtle">
                                            <div className="card-body">
                                                <h5 className="card-title">
                                                    {agent.name}
                                                </h5>
                                                <p className="card-text">
                                                    Email: {agent.email}
                                                </p>
                                                <p className="card-text">
                                                    Email: {agent.email}
           ``                                     </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No agents found</p>
                            ))}
                    </div>
                </section>
                </div>
            </main>
        </>
    );
}
