import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const DashboardBlockSmall = (props) => {
    const totalPlans = props.totalPlans
    const pendingPlans = props.pendingPlans
    const activePlans = props.activePlans
    const averageRating = props.averageRating

    return (
        // <div className="dashBoard-container-small">
        <div className="container-fluid px-0">
            <div className="row g-1 g-md-2">
                {/* dashBoard-card-small for custom styling */}
                <div className="col-3">
                    <div className="card rounded-4 shadow-sm dashBoard-card-small">
                        <div className="card-body pt-2 px-2 py-md-4 px-md-4">
                            <h2 className="m-0 text-center text-md-start" style={{color: "var(--accent)"}}>{totalPlans}</h2>
                            <p className="small text-nowrap mb-0 mt-1 lh-1 d-md-inline">Planes</p>
                        </div>
                    </div>
                </div>
                {/* dashBoard-card-small for custom styling */}
                <div className="col-3">
                    <div className="card rounded-4 shadow-sm dashBoard-card-small">
                        <div className="card-body pt-2 px-2 py-md-4 px-md-4">
                            <h2 className="m-0 text-center text-md-start" style={{color: "var(--accent2)"}}>
                                {averageRating != null ? (
                                    <>
                                    {averageRating}<span style={{color: "var(--accent2)"}}>%</span>
                                    </>
                                ): (
                                    "--"
                                )}
                            </h2>
                            <p className="small text-nowrap mb-0 mt-1 lh-1 d-md-inline">Asistencia</p>
                        </div>
                    </div>
                </div>
                {/* dashBoard-card-small for custom styling */}
                <div className="col-3">
                    <div className="card rounded-4 shadow-sm dashBoard-card-small">
                        <div className="card-body pt-2 px-2 py-md-4 px-md-4">
                            <h2 className="m-0 text-center text-md-start" style={{color: "var(--accent3)"}}>{pendingPlans}</h2>
                            <p className="small text-nowrap mb-0 mt-1 lh-1 d-md-inline">Pendiente</p>
                        </div>
                    </div>
                </div>
                {/* dashBoard-card-small for custom styling */}
                <div className="col-3">
                    <div className="card rounded-4 shadow-sm dashBoard-card-small">
                        <div className="card-body pt-2 px-2 py-md-4 px-md-4">
                            <h2 className="m-0 text-center text-md-start" style={{color: "var(--accent4)"}}>{activePlans}<span style={{color: "var(--accent4)"}}>$</span></h2>
                            <p className="small text-nowrap mb-0 mt-1 lh-1 d-md-inline">En curso</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        // </div>
    );
}; 