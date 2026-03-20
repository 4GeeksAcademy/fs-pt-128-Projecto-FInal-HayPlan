import { useState } from "react";
import { deleteMember, getGroupMembers } from "../../services/backEndServices";

export const MemberListCard = ({ members, admin, group }) => {
    const accentColors = [
        "var(--accent)",
        "var(--accent2)",
        "var(--accent3)"
    ];
    const [showDelete, setShowDelete] = useState(false)
    const [selectedMember, setSelectedMember] = useState(null)
    const [groupMembers, setGroupMembers] = useState(members)

    const handleDeleteMember = async () => {
        const response = await deleteMember(group.id, selectedMember.id)

        if (response) {
            setShowDelete(false)
            const responseMembers = await getGroupMembers(group.id)
            setGroupMembers(responseMembers)           
        }
    }

    return (
        <div className="card-body px-2 py-0 p-md-3 px-md-2">

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
                        {groupMembers?.map((member, index) => (
                            <div
                                key={member.id}
                                className={`d-flex align-items-center gap-3 py-3 ${index !== groupMembers.length - 1 ? "member-divider" : ""
                                    }`}
                            >
                                <div
                                    className="d-flex align-items-center justify-content-center rounded-circle bg-dark fw-bold"
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                        letterSpacing: "1px",
                                        color: accentColors[index % accentColors.length]
                                    }}
                                >
                                    {member.username.slice(0, 2).toUpperCase()}
                                </div>

                                <div className="flex-grow-1">
                                    <p className="fw-bold fs-5 mb-1"> {member.username} </p>
                                    <p className="small mb-0"> {member.email} </p>
                                </div>
                                <div className="d-flex justify-content-center align-items-center">
                                    <span className="badge rounded-pill d-inline-flex align-items-center lh-1 border px-4">
                                        {index === 0 ? "Admin" : "Miembro"}
                                    </span>
                                    {index !== 0 && admin && (
                                        <button className="btn btn-sm border-0 trash-btn ms-2" onClick={() => { setSelectedMember(member); setShowDelete(true) }}>
                                            <i className="fa-solid fa-trash" style={{ color: "rgb(199, 31, 31)" }}></i>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* MODAL DELTE */}
            {showDelete && (
                <div className="modal fade show d-block" tabIndex="-1" style={{
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    backdropFilter: "blur(8px)"
                }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content" style={{ backgroundColor: "rgb(36, 24, 21)" }}>
                            <div className="modal-header" style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.14)" }}>
                                <h6 className="modal-title">Eliminar a {selectedMember.username.toUpperCase()}</h6>
                                <button
                                    className="btn-close"
                                    onClick={() => setShowDelete(false)}
                                ></button>
                            </div>
                            <div className="modal-body px-4 d-flex justify-content-between row">
                                <h5>¿Estás seguro de que deseas eliminar a <strong>{selectedMember.username.toUpperCase()}</strong> del grupo?</h5>
                                <div className="text-center d-flex justify-content-around my-2">
                                    <button className="btn rounded-pill px-3 fw-bold shadow-s border-0 text-white small d-inline-flex align-items-center gap-1"
                                        style={{ background: "rgba(75,176,106,0.14)", color: "rgb(75,176,106)" }}
                                        onClick={handleDeleteMember}
                                    >
                                        <i className="fa-solid fa-check fa-2xs"></i>
                                        Sí
                                    </button>
                                    <button className="btn rounded-pill px-3 fw-bold shadow-s border-0 text-white small d-inline-flex align-items-center gap-1"
                                        style={{ background: "rgba(255,92,77,0.14)", color: "rgb(255,92,77)" }}
                                        onClick={() => setShowDelete(false)}
                                    >
                                        <i className="fa-solid fa-x fa-2xs"></i>
                                        No
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}