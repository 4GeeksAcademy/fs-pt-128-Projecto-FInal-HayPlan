import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import iconLogoColor from "../assets/img/iconLogo-Color.png";


export const DashboardBlockMedium = (props) => {
    const recentPlans = props.recentPlans

    if (!recentPlans || recentPlans.length === 0) {
        return (
            <div className="card rounded-4 dashBoard-card-medium-container">
                <div className="card-body px-2 py-0 p-md-3 px-md-1">

                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-uppercase small fw-semibold">
                            Todos los planes
                        </span>
                        {/* <button className="btn btn-sm rounded-pill px-3">
                        Ver todos
                    </button> */}
                    </div>

                    <div className="d-flex flex-column gap-2 px-md-2">
                        {/* No hay planes */}
                        <div className="card border rounded-4 dashBoard-card-medium-item">
                            <div className="card-body d-flex align-items-center gap-3 p-3">

                                <div className="d-flex align-items-center justify-content-center rounded-3">
                                    <i className="bi bi-emoji-frown"></i>
                                </div>

                                {/* info del plan */}
                                <div className="flex-grow-1">
                                    <div className="fw-bold ">De verdad, tus amigos te extranan!</div>
                                    <div className="d-flex gap-3 small text-muted mt-1">
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
    };

    return (
        <div className="card rounded-4 dashBoard-card-medium-container">
            <div className="card-body px-2 py-0 p-md-3 px-md-1">

                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-uppercase small fw-semibold">
                        Todos los planes
                    </span>
                    {/* <button className="btn btn-sm rounded-pill px-3">
                        Ver todos
                    </button> */}
                </div>

                <div className="d-flex flex-column gap-2 px-md-2">

                    {recentPlans.map((plan) => {
                        const planId = plan.id
                        const planTitle = plan.title
                        const planStatus = plan.status
                        const planDate = plan.date

                        const dateObject = new Date(planDate)
                        const date = dateObject.toLocaleDateString("es-ES", {
                            weekday: "short",
                            day: "numeric",
                            month: "short"
                        })

                        const time = dateObject.toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: false
                        });

                        const planStatusLabel = {
                            propuesta: "Propuesta",
                            votacion: "Votando",
                            confirmado: "Confirmado",
                            activo: "Nos toca!",
                            cerrado: "Ya fue!"
                        }

                        const planLabel = planStatusLabel[planStatus] || "Que paso?"

                        const statusColorMap = {
                            propuesta: "text-bg-secondary",
                            votacion: "text-bg-primary",
                            confirmado: "text-bg-warning",
                            activo: "text-bg-success",
                            cerrado: "text-bg-dark"
                        };

                        const badgeColor = statusColorMap[planStatus] || "text-bg-secondary";

                        return (
                            <div key={planId} className="card border rounded-4 dashBoard-card-medium-item">
                                <div className="card-body d-flex align-items-center gap-3 p-3">

                                    {/* icono o imagen? */}
                                    <div className="d-flex align-items-center justify-content-center rounded-3">
                                        <i className="bi bi-airplane"></i>
                                    </div>

                                    {/* info del plan */}
                                    <div className="flex-grow-1">
                                        <div className="fw-bold">{planTitle}</div>
                                        <div className="d-flex gap-3 small text-muted mt-1">
                                            <span className={`badge rounded-pill d-inline-flex align-items-center lh-1 ${badgeColor} px-4`}>
                                                {planLabel}
                                            </span>
                                            <span>
                                                {date}
                                            </span>
                                        </div>
                                    </div>
                                    {/* notificaciones */}
                                    <div className="badge rounded-pill text-bg-danger"> 1 </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}; 