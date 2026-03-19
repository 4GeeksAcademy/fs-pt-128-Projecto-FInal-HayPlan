export const DashboardStatCard = ({
    variant = "red",
    type,
    groups = [],
    nextPlan = null,
    nextPlans = [],
    closePlan = "",
    value = "",
}) => {
    const getGroupInitial = (name = "") => name.charAt(0).toUpperCase()

    return (
        <div className={`dashboard-card dashboard-card-${variant} d-flex flex-column align-items-center text-center rounded-4 p-4 h-100 w-100`}>
            {type === "groups" && (
                <>
                    <div className="d-flex align-items-center justify-content-center gap-3 mb-3">
                        {/* <div className="dashboard-icon-circle mb-2">
                        <i className="bi bi-people"></i>
                    </div> */}
                        <div className="dashboard-stat-value h5">{groups.length} <span className="dashboard-stat-label">Grupos</span></div>
                        {/* <div className="dashboard-stat-label m-0">Grupos <br /> en total</div> */}
                    </div>

                    <div className="w-100 d-flex flex-column gap-2">
                        {groups.slice(0, 3).map((group, index) => (
                            <div
                                key={group.id || index}
                                className="d-flex align-items-center gap-2 p-2 rounded"
                                style={{ background: "rgba(255,255,255,0.03)" }}
                            >
                                <div
                                    className="d-flex align-items-center justify-content-center rounded-circle fw-bold"
                                    style={{
                                        width: "32px",
                                        height: "32px",
                                        background: "#eb6a33",
                                        color: "#fff",
                                        fontSize: "14px"
                                    }}
                                >
                                    {getGroupInitial(group.name)}
                                </div>

                                <div className="text-start">
                                    <div className="fw-semibold small">{group.name}</div>
                                    <div className="text-secondary small">
                                        Grupo {index + 1}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {type === "next-plan" && (
                <>
                    <div className="d-flex align-items-center justify-content-center gap-3 mb-3">
                        {/* <div className="dashboard-icon-circle mb-2">
                            <i className="bi bi-calendar-event"></i>
                        </div> */}

                        {/* <div className="dashboard-stat-label m-0">Próximo plan</div> */}
                        <div className="dashboard-stat-value h5"> {nextPlan ? closePlan : "--"}</div>
                    </div>

                    <div
                        className="w-100 p-3 rounded text-start"
                        style={{
                            border: "1px solid rgba(255,255,255,0.08)",
                            background: "rgba(255,255,255,0.02)"
                        }}
                    >
                        {nextPlan ? (
                            <>
                                <div className="fw-semibold small mb-1">
                                    {nextPlan.title}
                                </div>
                                <div className="text-secondary small">
                                    {nextPlan.group_name || nextPlan.groupName || "Sin grupo"}
                                </div>
                            </>
                        ) : (
                            <div className="text-secondary small">
                                No hay planes próximos
                            </div>
                        )}
                    </div>
                </>
            )}

            {type === "plans-count" && (
                <>
                    <div className="d-flex align-items-center justify-content-center gap-3 mb-3">
                        {/* <div className="dashboard-icon-circle mb-2">
                            <i className="bi bi-journal-check"></i>
                        </div> */}
                        <div className="dashboard-stat-value h5">{value} <span className="dashboard-stat-label"> Planes </span> </div>
                        {/* <div className="dashboard-stat-label m-0">Planes <br /> en total</div> */}
                    </div>


                    <div className="w-100 d-flex flex-column gap-2">
                        {Array.isArray(nextPlans) && nextPlans.length > 0 ? (
                            nextPlans.slice(0, 3).map((plan, index) => (
                                <div
                                    key={plan.id || index}
                                    className="d-flex align-items-center gap-2 p-2 rounded"
                                    style={{ background: "rgba(255,255,255,0.03)" }}
                                >
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
                                        <i className="bi bi-journal-check"></i>
                                    </div>

                                    <div className="text-start">
                                        <div className="fw-semibold small">{plan.title}</div>
                                        <div className="text-secondary small">
                                            {plan.group_name || plan.groupName || "Sin grupo"}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div
                                className="p-3 rounded text-start text-secondary small"
                                style={{
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    background: "rgba(255,255,255,0.02)"
                                }}
                            >
                                No hay planes próximos
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}