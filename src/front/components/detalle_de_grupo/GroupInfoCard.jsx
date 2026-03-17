export const GroupInfoCard = ({ group, memberCount }) => {
    return (
        <div className="card border-0 rounded-4 dashBoard-card-medium-container">
            <div className="card-body px-2 py-0 p-md-3 px-md-1">

                {/* Header */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="text-uppercase small fw-semibold">
                        Informacion del grupo
                    </span>
                    {/* <button className="btn btn-sm rounded-pill px-3 text-light border">
									Ver todos
								</button> */}
                </div>

                <div className="d-flex flex-column gap-2 px-md-2">
                    <div className="card rounded-4 dashBoard-card-medium-item">
                        <div className="card-body p-3">
                            <div className="d-flex align-items-center gap-3 gap-lg-3">
                                <div className="d-flex align-items-center justify-content-center rounded-4"
                                    style={{
                                        width: "80px",
                                        height: "60px",
                                        fontSize: "36px",
                                        backgroundColor: "rgba(255, 193, 7, 0.15)"
                                    }}
                                >
                                    🤝
                                </div>
                                <div className="w-100">
                                    <p className="fw-bold fs-2 text-uppercase mb-0">{group.name}</p>
                                    {/* <div className="d-flex gap-3 small text-muted mt-1">
                                        <span className="badge rounded-pill d-inline-flex align-items-center lh-1 border px-4">
                                            {`${memberCount.length} miembros`}
                                        </span>
                                        <span>
                                            Desde: Feb 2019
                                        </span>
                                    </div> */}
                                </div>
                            </div>

                            <hr style={{ color: "var(--clr-primary-a50)" }} />

                            <div className="">
                                <p className="small text-uppercase fw-bold mb-0">Codigo de Invitacion</p>
                                <div className="d-flex gap-5 align-items-center">
                                    <span className="fw-bold fs-2" style={{ color: "var(--accent4)" }}>{group.invite_code}</span>
                                    <button className="btn btn-outline-secondary btn-sm rounded-pill px-3">Copiar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}