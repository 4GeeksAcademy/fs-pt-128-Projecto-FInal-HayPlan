import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import iconLogoColor from "../assets/img/iconLogo-Color.png";


export const HallOfFame = () => {

    return (
        <div className="card border-0 rounded-4">
            <div className="card-body p-2 p-md-3 px-md-1">

                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-uppercase small text-muted fw-semibold">
                        hall of fame
                    </span>
                    {/* <button className="btn btn-sm btn-outline-secondary rounded-pill px-3">
                        Ver todos
                    </button> */}
                </div>

                <div className="d-flex flex-column gap-2 px-md-2">
                    {/* PLAN 1 */}
                    <div className="card border-0 border-bottom rounded-4">
                        <div className="card-body d-flex align-items-center gap-3 p-3">
                           
                            <div className="d-flex align-items-center justify-content-center rounded-3"> <span>#1</span> </div>
                            {/* info del plan */}
                            <div className="flex-grow-1">
                                <div className="fw-bold text-uppercase">titulo del plan</div>
                                <div className="small text-muted mt-1">
                                    <span className="badge rounded-pill text-bg-info px-4">Creador del Plan</span>
                                </div>
                            </div>

                            {/* notificaciones */}
                            <div className="badge rounded-pill text-bg-danger">
                                1
                            </div>

                        </div>
                    </div>

                    {/* PLAN 1 */}
                    <div className="card border-0 border-bottom rounded-4">
                        <div className="card-body d-flex align-items-center gap-3 p-3">
                           
                            <div className="d-flex align-items-center justify-content-center rounded-3"> #2 </div>
                            {/* info del plan */}
                            <div className="flex-grow-1">
                                <div className="fw-bold text-uppercase">titulo del plan</div>
                                <div className="small text-muted mt-1">
                                    <span className="badge rounded-pill text-bg-warning px-4">Se Acerca</span> • Sáb 22 Feb
                                </div>
                            </div>

                            {/* notificaciones */}
                            <div className="badge rounded-pill text-bg-danger">
                                4
                            </div>

                        </div>
                    </div>
                    {/* PLAN 1 */}
                    <div className="card border-0 border-bottom rounded-4">
                        <div className="card-body d-flex align-items-center gap-3 p-3">
                           
                            <div className="d-flex align-items-center justify-content-center rounded-3"> #3 </div>
                            {/* info del plan */}
                            <div className="flex-grow-1">
                                <div className="fw-bold text-uppercase">titulo del plan</div>
                                <div className="small text-muted mt-1">
                                    <span className="badge rounded-pill text-bg-danger px-4">Cancelado</span> • Sáb 22 Feb
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