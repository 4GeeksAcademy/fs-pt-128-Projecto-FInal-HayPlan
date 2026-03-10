import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import iconLogoColor from "../assets/img/iconLogo-Color.png";


export const HallOfFame = (props) => {
    const hallOfFamePlans = props.hallOfFamePlans

    if (!hallOfFamePlans || hallOfFamePlans.length === 0) {
        return (
            <div className="card rounded-4 dashBoard-card-medium-container">
                <div className="card-body p-3">

                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-uppercase small fw-semibold">
                            Hall of Fame
                        </span>
                    </div>

                    <div className="d-flex flex-column gap-2 px-md-2">
                        {/* PLAN 1 */}
                        <div className="card border rounded-4 dashBoard-card-medium-item">
                            <div className="card-body d-flex align-items-center gap-3 p-3">
                                <div className="d-flex align-items-center justify-content-center rounded-3">
                                    <span className="h2 fw-bold m-0" style={{ color: "var(--clr-primary-a0)" }}>
                                        <i className="bi bi-exclamation-lg"></i>
                                    </span>
                                </div>
                                {/* info del plan */}
                                <div className="flex-grow-1">
                                    <div className="fw-bold">Nos quedamos papando moscas?</div>
                                    <div className="small text-muted mt-1">
                                        <span className="badge rounded-pill border border-danger d-inline-flex align-items-center lh-1 px-4">
                                            Hagamos un Plan!
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="card rounded-4 dashBoard-card-medium-container">
            <div className="card-body p-2 p-md-3 px-md-1">

                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-uppercase small fw-semibold">
                        Hall of fame
                    </span>
                    {/* <button className="btn btn-sm btn-outline-secondary rounded-pill px-3">
                                Ver todos
                            </button> */}
                </div>

                <div className="d-flex flex-column gap-2 px-md-2">
                    {
                        hallOfFamePlans.map((plan, index) => {
                            const planId = plan.id
                            const planTitle = plan.title
                            const planCreator = plan.organizer_username

                            const rankingNumber = index + 1

                            const rankingColorMap = {
                                // "var(--accent)"
                                1: "var(--clr-primary-a0)",
                                2: "var(--accent)",
                                3: "var(--accent3)"
                            };

                            const rankingColor =
                                rankingColorMap[rankingNumber] || "var(--accent)";

                            return (
                                <div key={planId} className="card border rounded-4 dashBoard-card-medium-item">
                                    <div className="card-body d-flex align-items-center gap-3 p-3">
                                        <div className="d-flex align-items-center justify-content-center rounded-3">
                                            <span className="h2 fw-bold m-0" style={{ color: rankingColor }}>
                                                <span className="h5 m-0" style={{ color: rankingColor }}>#</span>{rankingNumber}
                                            </span>
                                        </div>
                                        {/* info del plan */}
                                        <div className="flex-grow-1">
                                            <div className="fw-bold">{planTitle}</div>
                                            <div className="small text-muted mt-1">
                                                <span className="badge rounded-pill border px-4">{planCreator || "Quien fue el genio?"} </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>

    );
}