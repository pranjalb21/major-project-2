import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import DesktopSidebar from "../components/DesktopSidebar";
import useLead from "../contexts/Lead.context";
import SalesAgentForm from "../components/SalesAgentForm";
import { title } from "../constants/constants";

export default function AgentEditPage() {
    const {sidebarList} = useLead();
    useEffect(() => {
            document.title = `${title} | Edit Agent`;
        }, []);
    return (
        <>
            <Navbar sidebarList={sidebarList} navbarText={`Edit Agent`} />
            <main className="w-100">
                <div className="row gap-2 m-0">
                    <DesktopSidebar sidebarList={sidebarList} />
                    <section className="content px-4 p-md-3  col-md-9 mt-3">
                        <SalesAgentForm />
                    </section>
                </div>
            </main>
        </>
    );
}
