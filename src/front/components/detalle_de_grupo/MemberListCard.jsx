export const MemberListCard = ({ members }) => {
    const avatarColors = [
        "var(--accent)",
        "var(--accent2)",
        "var(--accent3)"
    ];

    return (
        <div className="card-body px-2 py-0 p-md-3 px-md-1">

            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-uppercase small fw-semibold">
                    Miembros del grupo
                </span>
                {/* <button className="btn btn-sm rounded-pill px-3 text-light border">
									Ver todos
								</button> */}
            </div>

            <div className="card rounded-4 dashBoard-card-medium-item">
                <div className="">
                    <div className="card-body">
                        {members.map((member, index) => (
                            <div
                                key={member.id}
                                className={`d-flex align-items-center gap-3 py-3 ${index !== members.length - 1 ? "member-divider" : ""
                                    }`}
                            >
                                <div
                                    className="d-flex align-items-center justify-content-center rounded-circle bg-dark fw-bold"
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        letterSpacing: "1px",
                                        color: avatarColors[index % avatarColors.length]
                                    }}
                                >
                                    {member.username.slice(0, 2).toUpperCase()}
                                </div>

                                <div className="flex-grow-1">
                                    <p className="fw-bold fs-5 mb-1"> {member.username} </p>
                                    <p className="small mb-0"> {member.email} </p>
                                </div>

                                <span className="badge rounded-pill d-inline-flex align-items-center lh-1 border px-4">
                                    {index === 0 ? "Admin" : "Miembro"}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}