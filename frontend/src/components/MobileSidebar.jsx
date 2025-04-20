import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";

export default function MobileSidebar({ sidebarList }) {
    return (
        <div className="d-md-none">
            <button
                className="btn btn-outline-secondary position-absolute top-0 start-0 m-3"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasExample"
                aria-controls="offcanvasExample"
            >
                <GiHamburgerMenu />
            </button>

            <div
                className="offcanvas offcanvas-start"
                tabIndex="-1"
                id="offcanvasExample"
                aria-labelledby="offcanvasExampleLabel"
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">
                        Menu
                    </h5>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="offcanvas-body">
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
                                <li className="sidebar-list-item">
                                    {item.name}
                                </li>
                            </NavLink>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
