import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { WelcomeModal } from "../components/WelcomeModal";

export const Login = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const [user, setUser] = useState({ email: "", password: "" });
    const [showPassword, setshowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showWelcomeModal, setShowWelcomeModal] = useState(false);
    const [userId, setUserId] = useState(null); // <-- Estado para el ID manual

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);

                // Guardamos el ID manualmente para el modal
                setUserId(data.user_id.id);

                dispatch({
                    type: "login",
                    payload: { token: data.token, user: data.user_id }
                });

                // Si no tiene username, abrimos el modal y detenemos la navegación
                if (!data.user_id.username) {
                    setShowWelcomeModal(true);
                    setLoading(false);
                    return;
                }

                setLoading(false);
                navigate("/");

            } else {
                setLoading(false);
                setError(data.error || "Email o contraseña incorrectos");
            }
        } catch (err) {
            setLoading(false);
            setError("Error de conexión con el servidor");
        }
    };

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center signup-wrapper">
            {showWelcomeModal && (
                <WelcomeModal
                    show={showWelcomeModal}
                    userId={userId} // <-- Pasamos el ID al modal
                    onClose={() => {
                        setShowWelcomeModal(false);
                        navigate("/");
                    }}
                />
            )}

            <div className="col-12 col-md-6 col-lg-4 shadow-sm signup-card">

                <h1 className="fw-bold mb-1 signup-title text-center">
                    Bienvenido <br />👋
                </h1>
                <p className="text-secondary mb-4 text-center"> Inicia sesión para ver tus planes </p>
                {error && <div className="alert alert-danger py-2 small">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label small fw-bold text-secondary text-uppercase">Email</label>
                        <div className="input-group">
                            <span className="input-group-text bg-light border-light-subtle ps-3"><i className="fa-solid fa-envelope text-secondary"></i></span>
                            <input
                                type="email"
                                placeholder="correo@email.com"
                                name="email"
                                className="form-control form-control-lg border-light-subtle"
                                value={user.email}
                                onChange={handleChange}
                                required />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="form-label small fw-bold text-secondary text-uppercase">Contraseña</label>
                        <div className="input-group">
                            <span className="input-group-text bg-light border-light-subtle ps-3"><i className="fa-solid fa-lock text-secondary"></i></span>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="********"
                                name="password" className="form-control form-control-lg border-light-subtle"
                                value={user.password}
                                onChange={handleChange}
                                required />
                            <button type="button" className="btn border-light-subtle bg-light" onClick={() => setshowPassword(!showPassword)}>
                                <i className={showPassword ? "fa-solid fa-eye-slash text-secondary" : "fa-solid fa-eye text-secondary"} />
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-lg w-100 fw-bold text-white signup-btn-orange" disabled={loading} style={{ backgroundColor: "#FF6B35" }}>
                        {loading ? "Entrando..." : "Iniciar Sesión"}
                    </button>
                </form>
            </div>
        </div>
    );
};




