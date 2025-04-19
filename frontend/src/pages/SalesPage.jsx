import React from "react";
import useLead from "../contexts/Lead.context";
import Navbar from "../components/Navbar";
import DesktopSidebar from "../components/DesktopSidebar";

export default function SalesPage() {
    const { sidebarList } = useLead();
    return (
        <>
            <Navbar sidebarList={sidebarList} navbarText={`Sales Dashboard`} />
            <main className="w-100">
                <div className="row gap-2 m-0">
                    <DesktopSidebar sidebarList={sidebarList} />
                    <section className="content px-4 p-md-3  col-md-9 mt-3">
                        Sales
                    </section>
                </div>
            </main>
        </>
    );
}
