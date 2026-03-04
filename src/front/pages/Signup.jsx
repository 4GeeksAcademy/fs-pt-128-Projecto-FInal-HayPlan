import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Signup = () => {
    const { dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [showPassword, setshowPassword] = useState(false);
    const [showConfirmPassword, setshowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        if (!user.email.trim() || !user.password.trim() || !user.confirmPassword.trim()) {
            setError("Email y contraseña son requeridos");
            return;
        }
        if (user.password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres");
            return;
        }
        if (user.password !== user.confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        setLoading(true);

        const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: user.email,
                password: user.password
            })
        });

        if (response.ok) {
            setLoading(false);
            setSuccessMessage("¡Usuario registrado con éxito! Redirigiendo al login...");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } else {
            setLoading(false);
            const errorData = await response.json();
            if (response.status === 400 || response.status === 409) {
                setError("Este correo electrónico ya está registrado.");
            } else {
                setError("Error: " + (errorData.msg || "No se pudo registrar"));
            }
        }
    };

    return (
        <div className="container-fluid d-flex align-items-center justify-content-center signup-wrapper">
            <div className="col-12 col-md-6 col-lg-4 shadow-sm signup-card">

                <h1 className="fw-bold mb-1 signup-title text-center">
                    Bienvenido <br />👋
                </h1>
                <p className="text-secondary mb-3 text-center">Crea una cuenta para empezar</p>

                {error && (
                    <div className="alert alert-danger py-2 shadow-sm" role="alert">
                        <small>{error}</small>
                    </div>
                )}

                {successMessage && (
                    <div className="alert alert-success py-2 shadow-sm" role="alert">
                        <small>{successMessage}</small>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* EMAIL - Estilo Unificado */}
                    <div className="mb-3">
                        <label className="form-label small fw-bold text-secondary text-uppercase">Email</label>
                        <div className="input-group custom-input-group">
                            <span className="input-group-text bg-light border-light-subtle border-end-0 signup-input-group-start ps-3">
                                <i className="fa-solid fa-envelope text-secondary"></i>
                            </span>
                            <input
                                type="email"
                                placeholder="correo@email.com"
                                className="form-control form-control-lg border-light-subtle border-start-0 signup-input-group-end"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    {/* CONTRASEÑA - Estilo Unificado */}
                    <div className="mb-3">
                        <label className="form-label small fw-bold text-secondary text-uppercase">Contraseña</label>
                        <div className="input-group custom-input-group">
                            <span className="input-group-text bg-light border-light-subtle border-end-0 signup-input-group-start ps-3">
                                <i className="fa-solid fa-lock text-secondary"></i>
                            </span>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="********"
                                className="form-control form-control-lg border-light-subtle border-start-0 border-end-0"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                className="btn border-light-subtle bg-light border-start-0 signup-input-group-end pe-3"
                                onClick={() => setshowPassword((s) => !s)}
                            >
                                <i className={showPassword ? "fa-solid fa-eye-slash text-secondary" : "fa-solid fa-eye text-secondary"} />
                            </button>
                        </div>
                    </div>

                    {/* CONFIRMAR CONTRASEÑA  */}
                    <div className="mb-4">
                        <label className="form-label small fw-bold text-secondary text-uppercase">Confirma tu contraseña</label>
                        <div className="input-group custom-input-group">
                            <span className="input-group-text bg-light border-light-subtle border-end-0 signup-input-group-start ps-3">
                                <i className="fa-solid fa-lock text-secondary"></i>
                            </span>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="********"
                                className="form-control form-control-lg border-light-subtle border-start-0 border-end-0"
                                name="confirmPassword"
                                value={user.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                className="btn border-light-subtle bg-light border-start-0 signup-input-group-end pe-3"
                                onClick={() => setshowConfirmPassword((s) => !s)}
                            >
                                <i className={showConfirmPassword ? "fa-solid fa-eye-slash text-secondary" : "fa-solid fa-eye text-secondary"} />
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-lg w-100 fw-bold text-white mb-3 signup-btn-orange"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="spinner-border spinner-border-sm" />
                        ) : (
                            "Registrarse"
                        )}
                    </button>

                    <div className="text-center">
                        <p className="small text-secondary">
                            ¿Ya tienes cuenta? <Link to="/login" className="fw-bold text-decoration-none" style={{ color: "#FF6B35" }}>Inicia Sesión</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};




