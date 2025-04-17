import React from "react";

export default function Loader() {
    return (
        <div className="position-fixed z-1 w-100 h-100 bg-secondary bg-opacity-10">
            <div className="z-3 d-flex justify-content-center align-items-center w-100 h-100">
                <div
                    className="spinner-border text-danger"
                    style={{ width: "3rem", height: "3rem" }}
                    role="status"
                >
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    );
}
