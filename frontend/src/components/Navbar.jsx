import React from "react";
import MobileSidebar from "./MobileSidebar";

export default function Navbar({ sidebarList, navbarText }) {
    return (
        <header>
            <div className="d-flex align-items-center justify-content-center p-3 bg-light position-relative">
                <MobileSidebar sidebarList={sidebarList} />
                <h1 className="fs-1 text-center">{navbarText}</h1>
            </div>
        </header>
    );
}
