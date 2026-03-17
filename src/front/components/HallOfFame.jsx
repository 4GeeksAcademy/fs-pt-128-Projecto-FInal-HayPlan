import { Link } from "react-router-dom";

export const HallOfFame = ({ plans = [] }) => {
    const accentColors = [
        "var(--clr-primary-a0)",
        "var(--accent)",
        "var(--accent3)"
    ];

    return (
        <div
            className="card border-0 rounded-4 dashBoard-card-medium-container">
            <div className="card-body p-2 p-md-3 px-md-1">

                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-uppercase small fw-semibold">
                        hall of fame
                    </span>
                    {/* <Link to="/app/plans" className="btn btn-sm rounded-pill px-3 btn-outline-warning">
                        Ver todos
                    </Link> */}
                </div>

                <div className="d-flex flex-column gap-2 px-md-2">
                    {/* Plan rankeado */}
                    {plans.slice(0, 2).map((plan, index) => {
                        return (
                            <div
                                key={plan.id}
                                className="card border rounded-4 dashBoard-card-medium-item">
                                <div className="card-body d-flex align-items-center gap-3 p-3">
                                    {/* Rank Position */}
                                    <div className="d-flex align-items-center justify-content-center rounded-3">
                                        <span className="h2 fw-bold m-0" style={{ color: accentColors[index] }}>
                                            <span className="h5 m-0" style={{ color: accentColors[index] }}>#</span>{index + 1}
                                        </span>
                                    </div>

                                    {/* info del plan */}
                                    <div className="flex-grow-1">
                                        <div className="fw-bold">{plan.title}</div>
                                        <div className="small text-muted mt-1">
                                            <span className="badge rounded-pill border px-4">{plan.organizer_username}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* PLAN 1 */}
                {/* <div className="card border rounded-4 dashBoard-card-medium-item">
                        <div className="card-body d-flex align-items-center gap-3 p-3">
                            <div className="d-flex align-items-center justify-content-center rounded-3">
                                <span className="h2 fw-bold m-0" style={{ color: "var(--clr-primary-a0)" }}>
                                    <span className="h5 m-0" style={{ color: "var(--clr-primary-a0)" }}>#</span>1
                                </span>
                            </div> */}
                {/* info del plan */}
                {/* <div className="flex-grow-1">
                                <div className="fw-bold">Titulo del plan</div>
                                <div className="small text-muted mt-1">
                                    <span className="badge rounded-pill border px-4">Creador del Plan</span>
                                </div>
                            </div>
                        </div>
                    </div> */}

                {/* PLAN 2 */}
                {/* <div className="card border rounded-4 dashBoard-card-medium-item">
                        <div className="card-body d-flex align-items-center gap-3 p-3">
                            <div className="d-flex align-items-center justify-content-center rounded-3">
                                <span className="h2 fw-bold m-0" style={{ color: "var(--accent)" }}>
                                    <span className="h5 m-0" style={{ color: "var(--accent)" }}>#</span>2
                                </span>
                            </div> */}
                {/* info del plan */}
                {/* <div className="flex-grow-1">
                                <div className="fw-bold">Titulo del plan</div>
                                <div className="small text-muted mt-1">
                                    <span className="badge rounded-pill border px-4">Creador del Plan</span>
                                </div>
                            </div>
                        </div>
                    </div> */}

                {/* PLAN 2 */}
                {/* <div className="card border rounded-4 dashBoard-card-medium-item">
                        <div className="card-body d-flex align-items-center gap-3 p-3">
                            <div className="d-flex align-items-center justify-content-center rounded-3">
                                <span className="h2 fw-bold m-0" style={{ color: "var(--accent3)" }}>
                                    <span className="h5 m-0" style={{ color: "var(--accent3)" }}>#</span>3
                                </span>
                            </div> */}
                {/* info del plan */}
                {/* <div className="flex-grow-1">
                                <div className="fw-bold">Titulo del plan</div>
                                <div className="small text-muted mt-1">
                                    <span className="badge rounded-pill border px-4">Creador del Plan</span>
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>*/}
            </div>
        </div>

    );
}; 