export const PendingInvitesCard = () => {
    // const mockInvites = []; // start empty on purpose
    const mockInvites = [
        {
            id: 1,
            username: "Andrea",
            email: "andrea@email.com",
            requested_at: "2026-03-15"
        },
        {
            id: 2,
            username: "Luis",
            email: "luis@email.com",
            requested_at: "2026-03-16"
        }
    ];

    const accentColors = [
        "var(--clr-primary-a0)",
        "var(--accent)",
        "var(--accent3)"
    ];
    return (
        <div className="card border-0 rounded-4 dashBoard-card-medium-container">
            <div className="card-body p-2 p-md-3 px-md-1">

                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-uppercase small fw-semibold">
                        Solicitudes pendientes
                    </span>
                </div>

                {/* Content */}
                <div className="px-md-2">

                    {mockInvites.length === 0 ? (
                        <div className="d-flex flex-column align-items-center justify-content-center text-center py-4">

                            <div
                                className="d-flex align-items-center justify-content-center rounded-4 mb-3"
                                style={{
                                    width: "60px",
                                    height: "60px",
                                    fontSize: "28px",
                                    backgroundColor: "rgba(255, 193, 7, 0.15)"
                                }}
                            >
                                📩
                            </div>

                            <p className="fw-semibold mb-1">
                                No hay solicitudes pendientes
                            </p>

                            <p className="small mb-0">
                                Invitaciones pendientes... 
                            </p>
                        </div>
                    ) : (
                        <div className="d-flex flex-column gap-2">
                            {mockInvites.map((invite, index) => (
                                <div
                                    key={invite.id}
                                    className="card border rounded-4 dashBoard-card-medium-item"
                                >
                                    <div className="card-body p-3 d-flex justify-content-between align-items-center gap-3 flex-wrap">

                                        <div className="d-flex align-items-center gap-3 flex-grow-1">

                                            {/* Avatar */}
                                            <div
                                                className="d-flex align-items-center justify-content-center rounded-circle fw-bold"
                                                style={{
                                                    width: "45px",
                                                    height: "45px",
                                                    backgroundColor: "rgba(255, 193, 7, 0.15)",
                                                    color: accentColors[index % accentColors.length]
                                                }}
                                            >
                                                {invite.username.slice(0, 2).toUpperCase()}
                                            </div>

                                            {/* Info */}
                                            <div>
                                                <div className="fw-bold">{invite.username}</div>
                                                <div className="small">{invite.email}</div>
                                                <div className="small mt-1">
                                                    Solicitud enviada: {invite.requested_at}
                                                </div>
                                            </div>

                                        </div>

                                        <div className="d-flex gap-2">
                                            <button className="btn btn-outline-danger btn-sm rounded-pill px-3">
                                                Rechazar
                                            </button>
                                            <button className="btn btn-warning btn-sm rounded-pill px-3 fw-semibold">
                                                Aceptar
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};