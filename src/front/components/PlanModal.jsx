import { planDateFormatLarge } from "../functions/planDateFormatLarge";
import { planDateFormatShort } from "../functions/planDateFormatShort"
import "progress-tracker/src/styles/progress-tracker.css";
import { addMemoryPlan, advanceStatus, getGroupMembers, getMemoriesPlan, getVotePlan, votePlan } from "../services/backEndServices";
import { useEffect, useState } from "react";
import { Group } from "../pages/Group";

export const PlanModal = ({ onClose, plan, user }) => {

    const statusIcon = (status) => {
        if (status === "propuesta") return <i className="fa-regular fa-lightbulb fa-2xs"></i>
        if (status === "votacion") return <i className="fa-solid fa-check-to-slot fa-2xs"></i>
        if (status === "confirmado") return <i class="fa-regular fa-square-check fa-2xs"></i>
        if (status === "activo") return <i className="fa-solid fa-fire-flame-curved fa-2xs"></i>
        if (status === "cerrado") return <i className="fa-solid fa-lock fa-2xs"></i>
    }
    const [members, setMembers] = useState([])
    const [votes, setVotes] = useState([])
    const statusSteps = ["propuesta", "votacion", "confirmado", "activo", "cerrado"]
    const currentIndex = statusSteps.indexOf(plan.status)
    const [organizer, setOrganizer] = useState(false)
    const [memories, setMemories] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [error, setError] = useState("")

    const getMembers = async (group_id) => {
        const responseMembers = await getGroupMembers(group_id)
        setMembers(responseMembers)
    }
    const getVotes = async (group_id, plan_id) => {
        const responseVotes = await getVotePlan(group_id, plan_id)
        setVotes(responseVotes.votes)
    }
    const getMemories = async (group_id, plan_id) => {
        const responseMemories = await getMemoriesPlan(group_id, plan_id)
        setMemories(responseMemories)
    }
    const handleAddMemory = async () => {
        if (!newComment.trim()) return
        const response = await addMemoryPlan(plan.group_id, plan.id, newComment)
        if (!response) {
            setError("Error al unirse al grupo")
        }
        setNewComment("")
    }

    useEffect(() => {
        getMembers(plan.group_id)
        getVotes(plan.group_id, plan.id)
        getMemories(plan.group_id, plan.id)
    }, [plan])

    useEffect(() => {
        if (user.id === plan.organizer_id && plan.status !== "cerrado") {
            setOrganizer(true)
        } else {
            setOrganizer(false)
        }
    }, [user, plan])

    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(8px)"
        }}>
            <div className="modal-dialog modal-dialog-centered modal-xl">
                <div className="modal-content" style={{ backgroundColor: "rgb(36, 24, 21)" }}>
                    <div className="modal-header" style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.14)" }}>
                        <h5 className="modal-title">Detalles del plan</h5>
                        <button
                            className="btn-close"
                            onClick={onClose}
                        ></button>
                    </div>

                    <div className="modal-body px-4 d-flex justify-content-between">
                        {/* LEFT INFO */}
                        <div>
                            <div className="info-badges">
                                <div
                                    className="badge rounded-pill d-inline-flex align-items-center gap-1"
                                    style={{ backgroundColor: "rgba(255, 210, 74, 0.14)", color: "rgb(255, 210, 74)" }}
                                >
                                    {statusIcon(plan.status)}
                                    {plan.status.charAt(0).toUpperCase() + plan.status.slice(1)}
                                </div>
                                <div className="d-inline-flex align-items-center gap-1 ms-2">
                                    <i className="fa-regular fa-calendar fa-2xs"></i>
                                    {planDateFormatShort(plan.date)}
                                </div>
                            </div>
                            <div className="title my-2">
                                <h2>{plan.title}</h2>
                            </div>
                            <div className="organizer-card d-flex align-items-center justify-content-between py-2 px-3 rounded-2 gap-5"
                                style={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}>
                                <div className="organizer-info d-flex alig-items-center justify-content-between gap-2">
                                    <div className="organizer-logo d-flex align-items-center justify-content-center rounded-circle fw-bold"
                                        style={{
                                            width: "45px",
                                            height: "45px",
                                            backgroundColor: "rgba(255, 193, 7, 0.15)",
                                        }}>
                                        {plan.organizer_username.slice(0, 2).toUpperCase()}
                                    </div>
                                    <div className="organizer-name">
                                        <p className="small mb-0 text-secondary">PLAN MASTER</p>
                                        <h5 className="m-0 fw-bold">{plan.organizer_username.charAt(0).toUpperCase() + plan.organizer_username.slice(1)}</h5>

                                    </div>
                                </div>
                                <div className="badge rounded-pill d-inline-flex align-items-center gap-1"
                                    style={{ backgroundColor: "rgba(255, 210, 74, 0.14)", color: "rgb(255, 210, 74)" }}>
                                    <i className="fa-regular fa-star fa-2xs"></i> Organizador
                                </div>
                            </div>
                            {plan.status !== "cerrado" && (
                                <div className="progress-bar my-3">
                                    <p className="mb-1 text-secondary text-start">PROGRESO</p>
                                    <ol className="progress-tracker progress-tracker--center"
                                        style={{
                                            "--marker-size": "20px",
                                            "--marker-size-block": "20px",
                                            "--marker-bg-active": "rgb(255, 210, 74)",
                                            "--marker-bg-complete": "rgb(255, 210, 74)",
                                            "--marker-bg-hover": "rgb(255, 210, 74)",
                                            "--path-bg-complete": "rgb(255, 210, 74)"
                                        }}>
                                        {
                                            statusSteps.map((step, index) => {
                                                let className = "progress-step";

                                                if (index < currentIndex) {
                                                    className += " is-complete";
                                                } else if (index === currentIndex) {
                                                    className += " is-active";
                                                }

                                                return (
                                                    <li key={step} className={className}>
                                                        <div className="progress-marker"></div>
                                                        <div className="progress-text">
                                                            <p className="progress-title" style={{ fontSize: "0.72rem" }}>
                                                                {step}
                                                            </p>
                                                        </div>
                                                    </li>
                                                );
                                            })
                                        }
                                    </ol>
                                </div>)}
                            {plan.status === "votacion" && (
                                <div className="py-2 px-4 rounded-2" style={{ background: "rgba(255, 255, 255, 0.02)" }}>
                                    <p className="mb-1 text-secondary text-start">VOTACIÓN</p>
                                    <button className="btn rounded-pill px-3 fw-bold shadow-s border-0 text-white small d-inline-flex align-items-center gap-1 me-2"
                                        style={{ background: "rgba(75,176,106,0.14)", color: "rgb(75,176,106)" }}
                                        onClick={() => votePlan(plan.group_id, plan.id, true)}
                                    >
                                        <i className="fa-solid fa-check fa-2xs"></i>
                                        Confirmar
                                    </button>
                                    <button className="btn rounded-pill px-3 fw-bold shadow-s border-0 text-white small d-inline-flex align-items-center gap-1"
                                        style={{ background: "rgba(255,92,77,0.14)", color: "rgb(255,92,77)" }}
                                        onClick={() => votePlan(plan.group_id, plan.id, false)}
                                    >
                                        <i className="fa-solid fa-x fa-2xs"></i>
                                        Rechazar
                                    </button>
                                </div>
                            )}

                            {plan.status === "cerrado" && (
                                <>
                                    <div className="py-2 px-4 rounded-2" style={{ background: "rgba(255, 255, 255, 0.02)" }}>
                                        <p className="mb-1 text-secondary text-start">RATING</p>
                                        Aquí va el rating
                                    </div>
                                    <div className="py-2 px-4 rounded-2" style={{ background: "rgba(255, 255, 255, 0.02)" }}>
                                        <p className="mb-1 text-secondary text-start">MEMORIAS</p>
                                        <div className="d-flex gap-2 mb-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Escribe un recuerdo..."
                                                value={newComment}
                                                onChange={(e) => setNewComment(e.target.value)}
                                                onKeyDown={e => e.key === "Enter" && handleAddMemory()}
                                            />
                                            <button className="btn rounded-pill px-2 fw-bold shadow-s border-0 text-white small" onClick={handleAddMemory} style={{ background: "rgb(255, 122, 61)" }}>
                                                Añadir
                                            </button>
                                        </div>
                                        <div>
                                            {memories.length === 0 ? (
                                                <p className="text-white">No hay recuerdos aún</p>
                                            ) : (
                                                memories.map((memorie) => (
                                                    <div key={memorie.id} className="mb-2 py-2 px-3 rounded bg-dark">
                                                        <p className="mb-1">{memorie.comment}</p>
                                                        <div className="d-flex justify-content-between">
                                                            <small className="text-white">
                                                                {planDateFormatLarge(memorie.created_at)}
                                                            </small>
                                                            <small>{memorie.username.charAt(0).toUpperCase() + memorie.username.slice(1)}</small>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </>
                            )
                            }
                        </div>
                        {/* RIGHT INFO */}
                        <div className="py-2 px-4 rounded-2" style={{ background: "rgba(255, 255, 255, 0.02)" }}>
                            {organizer &&
                                <div className="mb-3">
                                    <p className="mb-1 text-secondary text-start">ACCIONES</p>
                                    <div className="plan-buttons d-flex align-items-center gap-2">
                                        <button className="btn rounded-pill px-2 fw-bold shadow-s border-0 text-white small d-inline-flex align-items-center gap-1"
                                            style={{ background: "rgb(255, 122, 61)" }}
                                            onClick={() => advanceStatus(plan.group_id, plan.id)}
                                        >
                                            <i className="fa-solid fa-forward fa-2xs"></i>
                                            Avanzar estado
                                        </button>
                                        <button className="btn rounded-pill px-2 fw-bold shadow-s border-0 text-white small d-inline-flex align-items-center gap-1 p-2"
                                            style={{ background: "rgb(27, 23, 22)" }} disabled={plan.status === "confirmado" || plan.status === "activo"}
                                        >
                                            <i className="fa-solid fa-pen fa-2xs"></i>
                                            Editar plan
                                        </button>
                                    </div>
                                </div>
                            }
                            <div className="plan-description p-2 rounded-2" style={{ background: "rgba(255, 255, 255, 0.03)" }}>
                                <p className="mb-1 text-secondary text-start">DESCRIPCIÓN</p>
                                <p className="mb-1 text-start">{plan.description}</p>
                                <p className="mt-3 mb-1 text-secondary text-start">FECHA</p>
                                <p className="mb-1 text-start">{planDateFormatLarge(plan.date)}</p>
                            </div>
                            <div className="members">
                                <p className="mt-2 mb-1 text-secondary text-start">MIEMBROS</p>
                                {members.map(member => {
                                    const voto = votes?.find(vote => vote.user_id === member.id)
                                    const badge = !voto
                                        ? { label: "Pendiente", bg: "rgba(255,184,77,0.14)", color: "rgb(255,184,77)" }
                                        : voto.vote === true
                                            ? { label: "Confirmado", bg: "rgba(75,176,106,0.14)", color: "rgb(75,176,106)" }
                                            : { label: "Declinado", bg: "rgba(255,92,77,0.14)", color: "rgb(255,92,77)" }
                                    return (
                                        <div key={member.id} className="member-card d-flex alig-items-center justify-content-between py-2 px-3 rounded-2 gap-5"
                                            style={{ backgroundColor: "rgba(255, 255, 255, 0.03)" }}>
                                            <div className="member-info d-flex align-items-center justify-content-between gap-2">
                                                <div className="member-logo d-flex align-items-center justify-content-center rounded-circle fw-bold"
                                                    style={{
                                                        width: "45px",
                                                        height: "45px",
                                                        backgroundColor: "rgba(255, 193, 7, 0.15)",
                                                    }}>
                                                    {member.username.slice(0, 2).toUpperCase()}
                                                </div>
                                                <div className="member-name">
                                                    <h6 className="m-0 fw-bold">{member.username.charAt(0).toUpperCase() + member.username.slice(1)}</h6>
                                                </div>
                                            </div>
                                            <div className="badge rounded-pill d-inline-flex align-items-center gap-1"
                                                style={{ backgroundColor: badge.bg, color: badge.color }}>
                                                {badge.label}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>


                        </div>

                    </div>

                </div>
            </div>
        </div >
    )
}
