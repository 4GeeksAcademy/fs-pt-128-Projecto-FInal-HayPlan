import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addMember, getGroupMembers, getUser, searchGroup } from "../services/backEndServices";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const JoinGroupModal = ({ onClose }) => {

    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const [code, setCode] = useState("");
    const [group, setGroup] = useState(null);
    const [searching, setSearching] = useState(false);
    const [joining, setJoining] = useState(false);
    const [error, setError] = useState("");
    const [members, setMembers] = useState("");

    const handleSearch = async () => {
        if (code.trim().length !== 8) {
            setError("El código debe tener 8 caracteres");
            return;
        }
        setError("");
        setGroup(null);
        setSearching(true);
        const response = await searchGroup(code.trim())
        if (!response) {
            setError("Código inválido")
        } else {
            setGroup(response);
            const responseMembers = await getGroupMembers(response.id)
            setMembers(responseMembers.count)
        }
        setSearching(false);
    }

    const handleJoin = async () => {
        setJoining(true);
        const userId = store.user.id
        const response = await addMember(group.id, userId)
        if (!response) {
            setError("Error al unirse al grupo")
        } else {
            onClose(); navigate(`/app/groups/${group.id}`);
        }
        setJoining(false);
    }


    return (
        <div className="modal fade show d-block" tabIndex="-1" style={{
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            backdropFilter: "blur(8px)"
        }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content" style={{ backgroundColor: "rgb(36, 24, 21)" }}>
                    <div className="modal-header" style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.14)" }}>
                        <h4 className="modal-title">Unirse a un grupo</h4>
                        <button
                            className="btn-close"
                            onClick={onClose}
                        ></button>
                    </div>

                    <div className="modal-body px-4" >
                        <label className="form-label">
                            Pega el código del grupo (8 caracteres)
                        </label>
                        <div className="row">
                            <div className="col-12">
                                <div className="input-group mb-1">
                                    <input
                                        type="text"
                                        className="form-control"
                                        style={{ textAlign: "center", letterSpacing: "3px" }}
                                        placeholder="a3f9c21b"
                                        value={code}
                                        onChange={e => { setCode(e.target.value); setGroup(null); setError(""); }}
                                        onKeyDown={e => e.key === "Enter" && handleSearch()}
                                        maxLength={8}
                                    />
                                    <button
                                        className="btn"
                                        style={{ background: "rgb(255, 122, 61)" }}
                                        onClick={handleSearch}
                                        disabled={searching || code.trim().length !== 8}
                                    >
                                        {searching
                                            ? <span className="spinner-border spinner-border-sm" />
                                            : "Buscar"
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="alert alert-danger py-2 small mb-3 text-center">{error}</div>
                        )}

                        {group && (
                            <div className="card mt-2" style={{ background: "rgba(255, 255, 255, 0.02)" }}>
                                <div className="card-body">
                                    <h5 className="mb-0 text-white">{group.name.toUpperCase()}</h5>
                                    <p className="small">Admin: {group.admin_username}</p>
                                    {group.description && (
                                        <p className="small mb-2">{group.description}</p>
                                    )}
                                    <div className="badge bg-secondary">
                                        {members} {members === 1 ? "miembro" : "miembros"}
                                    </div>
                                </div>
                            </div>
                        )}
                        {group?.already_member && (
                            <div className="alert alert-warning py-2 small mt-3 mb-0">
                                Ya eres miembro de este grupo
                            </div>
                        )}
                    </div>

                    <div className="modal-footer" style={{ borderTop: "1px solid rgba(0, 0, 0, 0.14)" }}>
                        <button
                            className="btn btn-secondary"
                            style={{ background: "rgb(27, 23, 22)" }}
                            onClick={onClose}
                        >
                            Cerrar
                        </button>
                        <button className="btn btn-success"
                            style={{ background: "rgba(75,176,106,0.14)", color: "rgb(75,176,106)" }}
                            onClick={handleJoin}
                            disabled={!group || joining || group?.already_member}>
                            {joining
                                ? <><span className="spinner-border spinner-border-sm me-2" />Uniéndose...</>
                                : "Unirse →"
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}