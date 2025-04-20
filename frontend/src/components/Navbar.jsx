import React from "react";
import MobileSidebar from "./MobileSidebar";

export default function Navbar({ sidebarList, navbarText }) {
    return (
        <header className="bg-danger">
            <div className="d-flex align-items-center justify-content-center p-3 bg-body-tertiary shadow-sm position-relative">
                <MobileSidebar sidebarList={sidebarList} />
                <h2 className="fs-2 text-center my-1">{navbarText}</h2>
            </div>
        </header>
    );
}
