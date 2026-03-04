import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { editProfile } from "../services/backEndServices";
import useGlobalReducer from "../hooks/useGlobalReducer";
import "../index.css"; // Importación del CSS global

export const WelcomeModal = ({ show, onClose, userId }) => {
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    if (!show) return null;

    const handleSave = async () => {
        setError("");
        const clean = username.trim();

        if (!clean) {
            setError("Elige un nombre de usuario");
            return;
        }

        setSaving(true);
        const response = await editProfile({
            id: userId,
            username: clean
        });

        if (response.error) {
            setError(response.error);
            setSaving(false);
            return;
        }

        dispatch({
            type: "login",
            payload: { token: localStorage.getItem("token"), user: response }
        });

        onClose();
        navigate("/");
    };

    const handleClose = () => {
        localStorage.removeItem("token");
        dispatch({ type: "logout" });
        onClose();
    };

    return (
        <>
            <div className="modal-backdrop fade show welcome-modal-backdrop"></div>
            <div className="modal fade show welcome-modal-container" aria-modal="true" role="dialog">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 shadow rounded-4">
                        <div className="modal-header border-0 pb-0">
                            <h5 className="modal-title fw-bold">
                                <i className="fa-solid fa-hand-sparkles me-2 text-warning" />
                                ¡Bienvenid@!
                            </h5>
                            <button 
                                type="button" 
                                className="btn-close" 
                                onClick={handleClose} 
                                disabled={saving} 
                            />
                        </div>
                        <div className="modal-body">
                            <p className="text-muted mb-3 small">¡Hola! Elige un nombre de usuario para que podamos empezar.</p>
                            {error && (
                                <div className="alert alert-danger py-2 small" role="alert">
                                    {error}
                                </div>
                            )}
                            <div className="input-group">
                                <span className="input-group-text bg-light border-light-subtle">
                                    <i className="fa-solid fa-at text-secondary"></i>
                                </span>
                                <input 
                                    type="text" 
                                    className="form-control border-light-subtle" 
                                    placeholder="ej: mail@email.com" 
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)} 
                                    disabled={saving} 
                                />
                            </div>
                        </div>
                        <div className="modal-footer border-0">
                            <button 
                                type="button" 
                                className="btn btn-lg w-100 fw-bold text-white welcome-btn-orange" 
                                onClick={handleSave} 
                                disabled={saving}
                            >
                                {saving ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        Guardando...
                                    </>
                                ) : (
                                    "Guardar usuario"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};




