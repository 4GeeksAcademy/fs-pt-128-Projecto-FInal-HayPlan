import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import iconLogoColor from "../assets/img/iconLogo-Color.png";

export const HallOfFame = ({ plan, position }) => {

    return (
        <div className="card border rounded-4 dashBoard-card-medium-item">
            <div className="card-body d-flex align-items-center gap-3 p-3">
                <div className="d-flex align-items-center justify-content-center rounded-3">
                    <span className="h2 fw-bold m-0" style={{ color: "var(--clr-primary-a0)" }}>
                        <span className="h5 m-0" style={{ color: "var(--clr-primary-a0)" }}>#</span>{position}
                    </span>
                </div>
                {/* info del plan */}
                <div className="flex-grow-1">
                    <div className="fw-bold">{plan.title}</div>
                    <div className="small text-muted mt-1">
                        <span className="badge rounded-pill border px-4">{plan.organizer_username}</span>
                    </div>
                </div>
                <div className="fs-2 me-3">
                    {plan.rating} <span className="fs-4">/ 5</span> <span className="fs-6"><i className="fa-solid fa-star"></i></span>
                </div>
            </div>
        </div>
    );
}; 