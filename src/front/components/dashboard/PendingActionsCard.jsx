import { planStatusFormat } from "../../functions/planStatusFormat"

export const PendingActionsCard = ({ plans = [], className = "" }) => {
    const pendingPlans = plans.filter(
        (plan) => plan.status === "votacion" || plan.status === "propuesta"
    )

    return (
        <div className={`dashboard-card dashboard-card-red rounded-4 p-4 h-100 w-100 ${className}`}>
            <div className="d-flex align-items-center justify-content-center gap-3 mb-4">
                {/* <div className="dashboard-icon-circle">
                    <i className="bi bi-exclamation-circle"></i>
                </div> */}

                <div className="text-start">
                    {/* <div className="fw-bold">Acciones pendientes</div> */}
                    <div className=" d-flex align-items-center justify-content-center gap-3 dashboard-stat-value h5">
                        {pendingPlans.length} <span className="dashboard-stat-label mt-2"> por <br />revisar</span>
                    </div>
                </div>
            </div>

            {pendingPlans.length > 0 ? (
                <div className="d-flex flex-column gap-2">
                    {pendingPlans.slice(0, 3).map((plan) => (
                        <div
                            key={plan.id}
                            className="d-flex align-items-center gap-3 p-3 rounded"
                            style={{
                                border: "1px solid rgba(255,255,255,0.08)",
                                background: "rgba(255,255,255,0.03)"
                            }}
                        >
                            {/* <div
                                className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0"
                                style={{
                                    width: "20px",
                                    height: "20px",
                                    background: "rgba(255,255,255,0.06)"
                                }}
                            >
                                <i className={`bi ${plan.status === "votacion" ? "bi-check2-square" : "bi-hourglass-split"}`}></i>
                            </div> */}
                            <div
                                className="d-flex align-items-center justify-content-center rounded-circle fw-bold"
                                style={{
                                    width: "32px",
                                    height: "32px",
                                    background: "#dca028",
                                    color: "#000",
                                    fontSize: "14px"
                                }}
                            >
                                <i className="bi bi-exclamation-circle"></i>
                            </div>

                            <div className="text-start">

                                <div className="d-flex justify-content-between align-items-center mb-1">

                                    <div className="fw-semibold small">
                                        {plan.title}
                                    </div>

                                    {/* <div className="text-secondary small">
                                        {plan.group_name || plan.groupName || "Sin grupo"}
                                    </div> */}
                                </div>

                                <span className={`${planStatusFormat(plan.status)}`}
                                    style={{ fontSize: "10px" }}>
                                    {plan.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div
                    className="p-3 rounded text-secondary small"
                    style={{
                        border: "1px solid rgba(255,255,255,0.08)",
                        background: "rgba(255,255,255,0.03)"
                    }}
                >
                    No tienes acciones pendientes
                </div>
            )}
        </div>
    )
}