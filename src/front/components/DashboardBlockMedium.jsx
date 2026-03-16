import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import iconLogoColor from "../assets/img/iconLogo-Color.png";


export const DashboardBlockMedium = () => {

    return (
        <div className="card border-0 rounded-4 dashBoard-card-medium-container">
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
                    
                    {/* PLAN 1 */}
                    <div className="card border rounded-4 dashBoard-card-medium-item">
                        <div className="card-body d-flex align-items-center gap-3 p-3">
                            {/* icono o imagen?  */}
                            <div className="d-flex align-items-center justify-content-center rounded-3">
                                <i class="bi bi-airplane"></i>
                            </div>
                            {/* info del plan */}
                            <div className="flex-grow-1">
                                <div className="fw-bold ">Game night en tripping animals</div>
                                <div className="d-flex gap-3 small text-muted mt-1">
                                    <span className="badge rounded-pill d-inline-flex align-items-center lh-1 text-bg-info px-4">
                                        Votando
                                    </span>
                                    <span>
                                        Sab 22 Feb
                                    </span>
                                </div>
                            </div>
                            {/* notificaciones */}
                            <div className="badge rounded-pill text-bg-danger">
                                1
                            </div>
                        </div>
                    </div>

                    {/* PLAN 1 */}
                    <div className="card border rounded-4 dashBoard-card-medium-item">
                        <div className="card-body d-flex align-items-center gap-3 p-3">
                            {/* icono o imagen?  */}
                            <div
                                className="d-flex align-items-center justify-content-center rounded-3"
                            >
                                <i class="bi bi-airplane"></i>
                            </div>
                            {/* info del plan */}
                            <div className="flex-grow-1">
                                <div className="fw-bold">Viaje a Barcelona</div>
                                <div className="d-flex gap-3 small text-muted mt-1">
                                    <span className="badge rounded-pill d-inline-flex align-items-center lh-1 text-bg-warning px-4 ">
                                        Se Acerca
                                    </span>
                                    <span>
                                        Sab 22 Feb
                                    </span>
                                </div>
                            </div>
                            {/* notificaciones */}
                            <div className="badge rounded-pill text-bg-danger">
                                4
                            </div>
                        </div>
                    </div>

                    {/* PLAN 1 */}
                    <div className="card border rounded-4 dashBoard-card-medium-item">
                        <div className="card-body d-flex align-items-center gap-3 p-3">
                            {/* icono o imagen?  */}
                            <div
                                className="d-flex align-items-center justify-content-center rounded-3"
                            >
                                <i class="bi bi-airplane"></i>
                            </div>
                            {/* info del plan */}
                            <div className="flex-grow-1">
                                <div className="fw-bold ">Nuevo bar</div>
                                <div className="d-flex gap-3 small text-muted mt-1">
                                    <span className="badge rounded-pill d-inline-flex align-items-center lh-1 text-bg-danger px-4">
                                        Cancelado
                                    </span>
                                    <span>
                                        Sab 22 Feb
                                    </span>
                                </div>
                            </div>
                            {/* notificaciones
                            <div className="badge rounded-pill text-bg-danger">
                                0
                            </div> */}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}; 