import React, { useRef } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { EditProfileModal } from "../components/EditProfileModal";

export const Profile = () => {
    const { store } = useGlobalReducer();
    const closeBtnRef = useRef(null);

    const formatDate = (dateStr) => {
        if (!dateStr) return "—";
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        return new Date(dateStr).toLocaleDateString('es-ES', options);
    };

    const renderLocation = () => {
        const { city, country } = store.user || {};
        if (city && country) return `${city}, ${country}`;
        if (city) return city;
        if (country) return country;
        return "Ubicación no registrada";
    };

    return (
        <div className="container mt-4 mt-md-5 mb-5" style={{ maxWidth: "900px" }}>

            {/* BOTÓN VOLVER */}
            <div className="mb-2">
                <button
                    className="btn-descartar-custom d-inline-flex align-items-center fs-5 fw-semibold"
                    onClick={() => window.history.back()}
                >
                    <i className="fas fa-arrow-left icon-back-custom me-2 fa-lg"></i> Volver
                </button>
            </div>

            {/* TÍTULO CENTRADO */}
            <div className="text-center mb-4 mb-md-5">
                <h1 className="display-4 fw-bold m-0 text-white">Mi Perfil</h1>
            </div>

            {/* TARJETA PRINCIPAL */}
            <div className="card p-3 p-md-5 profile-card-container shadow-lg">

                {/* IDENTIDAD: Centrada verticalmente */}
                <div className="row mb-4 mb-md-5 profile-divider pb-4 align-items-center text-center text-md-start">

                    <div className="col-12 col-md-2 mb-3 mb-md-0 d-flex flex-column align-items-center">
                        <div className="rounded-circle avatar-circle-profile shadow-lg mb-3">
                            <i className={`fas ${store.user?.profile_picture || 'fa-users'}`}></i>
                        </div>
                        <span className="badge rounded-pill username-badge w-100 text-center py-2">
                            @{store.user?.username || "Robb"}
                        </span>
                    </div>

                    <div className="col-12 col-md-6 px-md-4 mt-3 mt-md-0">
                        <label className="text-muted small text-uppercase fw-bold mb-1 d-block" style={{ letterSpacing: "1px", opacity: 0.8 }}>
                            Nombre Completo
                        </label>
                        <p className="fs-2 fw-bold text-white mb-0">
                            {store.user?.first_name || "Robbi"} {store.user?.last_name || "Prueba"}
                        </p>
                    </div>

                    <div className="col-12 col-md-4 mt-4 mt-md-0 text-md-end">
                        <label className="text-muted small text-uppercase fw-bold mb-1 d-block" style={{ letterSpacing: "1px", opacity: 0.8 }}>
                            Correo Electrónico
                        </label>
                        <p className="fs-5 text-white-50 m-0 text-break">
                            {store.user?.email || "prueba@prueba.com"}
                        </p>
                    </div>
                </div>

                {/* DETALLES: Teléfono, Cumpleaños, Género */}
                <div className="row g-4 g-md-5">
                    <div className="col-12 col-sm-4 text-center">
                        <div className="d-flex align-items-center justify-content-center mb-2">
                            <i className="fas fa-phone icon-solid-primary me-2"></i>
                            <label className="text-muted small text-uppercase fw-bold m-0">Teléfono</label>
                        </div>
                        <p className="fs-5 text-white m-0 fw-semibold">{store.user?.phone || "No registrado"}</p>
                    </div>

                    <div className="col-12 col-sm-4 text-center">
                        <div className="d-flex align-items-center justify-content-center mb-2">
                            <i className="fas fa-birthday-cake icon-solid-primary me-2"></i>
                            <label className="text-muted small text-uppercase fw-bold m-0">Cumpleaños</label>
                        </div>
                        <p className="fs-5 text-white m-0 fw-semibold">{formatDate(store.user?.birthday)}</p>
                    </div>

                    <div className="col-12 col-sm-4 text-center">
                        <div className="d-flex align-items-center justify-content-center mb-2">
                            <i className="fas fa-venus-mars icon-solid-primary me-2"></i>
                            <label className="text-muted small text-uppercase fw-bold m-0">Género</label>
                        </div>
                        <p className="fs-5 text-white text-capitalize m-0 fw-semibold">{store.user?.gender || "No definido"}</p>
                    </div>

                    {/* UBICACIÓN */}
                    <div className="col-12 mt-4 pt-4 border-top border-secondary" style={{ borderColor: "rgba(255,255,255,0.1) !important" }}>
                        <div className="d-flex flex-column flex-md-row align-items-center text-center text-md-start">
                            <i className="fas fa-map-marker-alt icon-solid-primary mb-3 mb-md-0 me-md-3" style={{ fontSize: '1.5rem' }}></i>
                            <div>
                                <label className="text-muted small text-uppercase fw-bold m-0 d-block">Ubicación Actual</label>
                                <p className="fs-3 text-white m-0 fw-bold">
                                    {renderLocation()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BOTÓN EDITAR PERFIL */}                
                <div className="d-flex justify-content-center mt-5 pt-4 border-top border-secondary" style={{ borderColor: "rgba(255,255,255,0.05) !important" }}>
                    <button
                        className="btn btn-edit-profile px-5 py-2 shadow-sm w-auto" // Usamos w-auto para que no se estire
                        data-bs-toggle="modal"
                        data-bs-target="#editProfileModal"
                    >
                        <i className="fas fa-user-edit me-2"></i> Editar Perfil
                    </button>
                </div>

            </div>

            <EditProfileModal closeBtnRef={closeBtnRef} />
        </div>
    );
};




