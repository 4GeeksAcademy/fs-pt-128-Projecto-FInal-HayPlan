import React, { useEffect, useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const DashboardBlockSmall = ({ plans }) => {

    const plansClosed = plans.filter(plan => plan.status === "cerrado");
    const plansVote = plans.filter(plan => plan.status === "votacion")
    return (
        <div className="row g-2 mx-0">

            <div className="col-6 col-md-3">
                <div className="card rounded-4 shadow-sm dashBoard-card-small" style={{ overflow: "hidden" }}>
                    <div className="card-body p-3">
                        <h2 className="m-0 fw-bold" style={{ color: "var(--accent)", fontSize: "clamp(1.2rem, 6vw, 2rem)" }}>{plans.length}</h2>
                        <p className="mb-0 mt-1 small lh-1">Planes</p>
                    </div>
                </div>
            </div>

            <div className="col-6 col-md-3">
                <div className="card rounded-4 shadow-sm dashBoard-card-small" style={{ overflow: "hidden" }}>
                    <div className="card-body p-3">
                        <h2 className="m-0 fw-bold" style={{ color: "var(--accent3)", fontSize: "clamp(1.2rem, 6vw, 2rem)" }}>{plansClosed.length}</h2>
                        <p className="mb-0 mt-1 small lh-1">Planes completados</p>
                    </div>
                </div>
            </div>

            <div className="col-6 col-md-3">
                <div className="card rounded-4 shadow-sm dashBoard-card-small" style={{ overflow: "hidden" }}>
                    <div className="card-body p-3">
                        <h2 className="m-0 fw-bold" style={{ color: "var(--accent2)", fontSize: "clamp(1.2rem, 6vw, 2rem)" }}>{plansVote.length}</h2>
                        <p className="mb-0 mt-1 small lh-1">Planes en votación</p>
                    </div>
                </div>
            </div>

            <div className="col-6 col-md-3">
                <div className="card rounded-4 shadow-sm dashBoard-card-small" style={{ overflow: "hidden" }}>
                    <div className="card-body p-3">
                        <h2 className="m-0 fw-bold" style={{ color: "var(--accent4)", fontSize: "clamp(1.2rem, 6vw, 2rem)" }}>32<span style={{ fontSize: "0.6em" }}>$</span></h2>
                        <p className="mb-0 mt-1 small lh-1">Planes</p>
                    </div>
                </div>
            </div>

        </div>
    );
};