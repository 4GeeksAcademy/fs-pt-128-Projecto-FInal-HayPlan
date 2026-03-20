import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { planDateFormatLarge } from "../functions/planDateFormatLarge";
import { planStatusFormat } from "../functions/planStatusFormat";

export const PlanDetails = () => {
    const navigate = useNavigate();
    const { plan_id } = useParams();

    const [loadingPage, setLoadingPage] = useState(true);
    const [planInfo, setPlanInfo] = useState(null);

    const getInfo = async () => {
        setTimeout(() => {
            const mockPlan = {
                id: Number(plan_id),
                title: "Cena en Brickell",
                description: "Vamos a cenar sushi y tomar algo después.",
                status: "confirmado",
                location: "Brickell City Centre",
                date: "2026-03-25T20:30:00",
                group_id: 3,
                group_name: "Amigos Miami",
                organizer_id: 7,
                organizer_username: "Pedro"
            };

            setPlanInfo(mockPlan);
            setLoadingPage(false);
        }, 500);
    };

    useEffect(() => {
        getInfo();
    }, [plan_id]);

    return (
        <>
            {loadingPage ? (
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                        <h1 className="mb-0">
                            {planInfo?.title?.toUpperCase()}
                        </h1>

                        <div className="me-2 d-flex flex-wrap gap-2">
                            <button
                                className="btn btn-outline-warning rounded-pill px-4"
                                onClick={() => navigate(-1)}
                            >
                                Volver
                            </button>

                            <button
                                className="btn btn-warning rounded-pill px-4 fw-bold shadow-sm"
                                onClick={() => navigate(`/app/plans/edit/${planInfo?.id}`)}
                            >
                                Editar plan
                            </button>
                        </div>
                    </div>

                    <div className="card border-0 rounded-4 dashBoard-card-medium-container overflow-hidden">
                        <div className="bg-dark" style={{ height: "180px" }}></div>

                        <div className="card-body p-3 p-md-4">
                            <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                                <span className="text-uppercase small fw-semibold">
                                    Información del plan
                                </span>

                                <span className={planStatusFormat(planInfo?.status)}>
                                    {planInfo?.status}
                                </span>
                            </div>

                            <div className="row g-3">
                                <div className="col-12 col-lg-8">
                                    <div className="mb-3">
                                        <div className="small text-uppercase fw-semibold opacity-75 mb-1">
                                            Título
                                        </div>
                                        <div>{planInfo?.title}</div>
                                    </div>

                                    <div className="mb-3">
                                        <div className="small text-uppercase fw-semibold opacity-75 mb-1">
                                            Descripción
                                        </div>
                                        <div>{planInfo?.description}</div>
                                    </div>

                                    <div className="mb-3">
                                        <div className="small text-uppercase fw-semibold opacity-75 mb-1">
                                            Ubicación
                                        </div>
                                        <div>{planInfo?.location}</div>
                                    </div>
                                </div>

                                <div className="col-12 col-lg-4">
                                    <div className="mb-3">
                                        <div className="small text-uppercase fw-semibold opacity-75 mb-1">
                                            Fecha
                                        </div>
                                        <div>{planDateFormatLarge(planInfo?.date)}</div>
                                    </div>

                                    <div className="mb-3">
                                        <div className="small text-uppercase fw-semibold opacity-75 mb-1">
                                            Grupo
                                        </div>
                                        <div>{planInfo?.group_name}</div>
                                    </div>

                                    <div className="mb-3">
                                        <div className="small text-uppercase fw-semibold opacity-75 mb-1">
                                            Organizador
                                        </div>
                                        <div>{planInfo?.organizer_username}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};