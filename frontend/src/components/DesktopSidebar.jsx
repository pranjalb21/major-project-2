import React from "react";
import { NavLink } from "react-router-dom";

export default function DesktopSidebar({ sidebarList }) {
    return (
        <>
            {/* Side bar */}
            <nav className="sidebar d-none d-md-block col-md-2">
                <ul className="sidebar-list">
                    {window.location.pathname !== "/" && (
                        <li className="list-unstyled mt-2">
                            <NavLink to="/">
                                &larr;<small> Dashboard</small>
                            </NavLink>
                        </li>
                    )}
                    {sidebarList.map((item, index) => (
                        <NavLink
                            to={item.link}
                            key={index}
                            className={({ isActive }) =>
                                isActive ? "active" : ""
                            }
                        >
                            <li className="sidebar-list-item">{item.name}</li>
                        </NavLink>
                    ))}
                </ul>
            </nav>
        </>
    );
}
