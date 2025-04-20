import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import DesktopSidebar from "../components/DesktopSidebar";
import useLead from "../contexts/Lead.context";

export default function ReportsPage() {
    const { sidebarList, leadStatusCount } = useLead();

    const handleClosedPipeline = () => {
        const canvas = document.getElementById("closedPipeline");
        const ctx = canvas.getContext("2d");

        // Data for the pie chart (two values)
        const data = [
            leadStatusCount?.totalLeads,
            leadStatusCount?.closedLeads,
        ];
        const colors = ["#FF6384", "#36A2EB"]; // Colors for each segment

        let startAngle = 0; // Start from 0 degrees

        // Draw the pie chart
        data.forEach((value, index) => {
            const sliceAngle =
                (value / leadStatusCount?.totalLeads) * 2 * Math.PI; // Convert percentage to radians
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, canvas.height / 2); // Dynamic center based on canvas size
            ctx.arc(
                canvas.width / 2,
                canvas.height / 2,
                Math.min(canvas.width, canvas.height) / 3,
                startAngle,
                startAngle + sliceAngle
            ); // Dynamic radius based on canvas size
            ctx.closePath();
            ctx.fillStyle = colors[index]; // Set color for the slice
            ctx.fill();
            startAngle += sliceAngle; // Update starting angle for next slice
        });
    };

    const handleLeadsChart = () => {
        const canvas = document.getElementById("leadsChart");
        const ctx = canvas.getContext("2d");

        // Data for the pie chart (two values)
        const data = [
            leadStatusCount?.newLeads,
            leadStatusCount?.contactedLeads,
            leadStatusCount?.qualifiedLeads,
            leadStatusCount?.proposalSentLeads,
        ];
        const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"]; // Colors for each segment

        let startAngle = 0; // Start from 0 degrees

        // Draw the pie chart
        data.forEach((value, index) => {
            const sliceAngle =
                (value / leadStatusCount?.openLeads) * 2 * Math.PI; // Convert percentage to radians
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, canvas.height / 2); // Dynamic center based on canvas size
            ctx.arc(
                canvas.width / 2,
                canvas.height / 2,
                Math.min(canvas.width, canvas.height) / 3,
                startAngle,
                startAngle + sliceAngle
            ); // Dynamic radius based on canvas size
            ctx.closePath();
            ctx.fillStyle = colors[index]; // Set color for the slice
            ctx.fill();
            startAngle += sliceAngle; // Update starting angle for next slice
        });
    };

    useEffect(() => {
        handleClosedPipeline();
        handleLeadsChart();
    }, [leadStatusCount]);

    return (
        <>
            <Navbar
                sidebarList={sidebarList}
                navbarText={`Anvaya CRM Reports`}
            />
            <main className="w-100">
                <div className="row gap-2 m-0">
                    <DesktopSidebar sidebarList={sidebarList} />
                    {/* Main content */}
                    <section className="content px-4 p-md-3  col-md-9 mt-md-0 mt-3 mb-5">
                        <h3 className="fs-3 text-center">Report Overview</h3>

                        <div className="row g-2 align-items-center justify-content-center mt-2">
                            <div className="col-md-6">
                                <p className="text-center ">
                                    Total Leads closed and in Pipeline:
                                </p>
                            </div>
                            <div className="col-md-6">
                                <div className="chart-container d-flex flex-column align-items-center">
                                    <canvas
                                        id="closedPipeline"
                                        className="responsive-canvas"
                                    ></canvas>
                                    {/* Add Legend Here */}
                                    <div className="legend">
                                        <div className="d-flex flex-column align-items-start">
                                            <div>
                                                <span
                                                    style={{
                                                        display: "inline-block",
                                                        width: "20px",
                                                        height: "20px",
                                                        backgroundColor:
                                                            "#FF6384",
                                                    }}
                                                ></span>
                                                Total Leads:{" "}
                                                {leadStatusCount?.totalLeads}
                                            </div>
                                            <div>
                                                <span
                                                    style={{
                                                        display: "inline-block",
                                                        width: "20px",
                                                        height: "20px",
                                                        backgroundColor:
                                                            "#36A2EB",
                                                    }}
                                                ></span>
                                                Closed Leads:{" "}
                                                {leadStatusCount?.closedLeads}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row g-2 align-items-center justify-content-center mt-2">
                            <div className="col-md-6">
                                <p className="text-center ">
                                    Lead Status Distribution:
                                </p>
                            </div>
                            <div className="col-md-6">
                                <div className="chart-container d-flex flex-column align-items-center">
                                    <canvas
                                        id="leadsChart"
                                        className="responsive-canvas"
                                    ></canvas>
                                    {/* Add Legend Here */}
                                    <div className="legend">
                                        <div className="d-flex flex-column align-items-start">
                                            <div>
                                                <span
                                                    style={{
                                                        display: "inline-block",
                                                        width: "20px",
                                                        height: "20px",
                                                        backgroundColor:
                                                            "#FF6384",
                                                    }}
                                                ></span>
                                                New Leads:{" "}
                                                {leadStatusCount?.newLeads}
                                            </div>
                                            <div>
                                                <span
                                                    style={{
                                                        display: "inline-block",
                                                        width: "20px",
                                                        height: "20px",
                                                        backgroundColor:
                                                            "#36A2EB",
                                                    }}
                                                ></span>
                                                Contacted Leads:{" "}
                                                {
                                                    leadStatusCount?.contactedLeads
                                                }
                                            </div>
                                            <div>
                                                <span
                                                    style={{
                                                        display: "inline-block",
                                                        width: "20px",
                                                        height: "20px",
                                                        backgroundColor:
                                                            "#FFCE56",
                                                    }}
                                                ></span>
                                                Qualified Leads:{" "}
                                                {
                                                    leadStatusCount?.qualifiedLeads
                                                }
                                            </div>
                                            <div>
                                                <span
                                                    style={{
                                                        display: "inline-block",
                                                        width: "20px",
                                                        height: "20px",
                                                        backgroundColor:
                                                            "#4BC0C0",
                                                    }}
                                                ></span>
                                                Proposal Sent Leads:{" "}
                                                {
                                                    leadStatusCount?.proposalSentLeads
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}
