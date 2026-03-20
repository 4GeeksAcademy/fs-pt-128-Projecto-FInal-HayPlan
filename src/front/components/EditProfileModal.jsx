import React, { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const EditProfileModal = ({ closeBtnRef }) => {
    const { store, dispatch } = useGlobalReducer();
    const [formData, setFormData] = useState({});

    // --- LÍMITES DE FECHA ---
    const today = new Date().toISOString().split("T")[0];
    const minDateObj = new Date();
    minDateObj.setFullYear(minDateObj.getFullYear() - 100);
    const minDate = minDateObj.toISOString().split("T")[0];

    const avatarIcons = [
        { label: "Playa", value: "fa-umbrella-beach" },
        { label: "Fiesta", value: "fa-glass-cheers" },
        { label: "Amigos", value: "fa-users" },
        { label: "Fútbol", value: "fa-futbol" },
        { label: "Montaña", value: "fa-mountain" },
        { label: "Restaurante", value: "fa-utensils" }
    ];

    useEffect(() => {
        if (store.user) setFormData({ ...store.user });
    }, [store.user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/editProfile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                dispatch({ type: "auth_set_user", payload: data.user });
                if (closeBtnRef.current) closeBtnRef.current.click();
                alert("¡Perfil actualizado con éxito! ✨");
            } else {
                alert(data.error || "No se pudo actualizar el perfil.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Hubo un problema de conexión.");
        }
    };

    return (
        <div className="modal fade" id="editProfileModal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-centered px-2">
                <div className="modal-content border-0 profile-card-container shadow-lg" style={{ overflow: "visible" }}>

                    <div className="modal-header border-0 p-3 pb-0">
                        <div>
                            <h5 className="modal-title fw-bold fs-4 text-white">Editar Perfil</h5>
                            <p className="small m-0 text-muted">Actualiza tus datos básicos.</p>
                        </div>
                        <button type="button" className="btn-close btn-close-white shadow-none" data-bs-dismiss="modal"></button>
                    </div>

                    <div className="modal-body p-3 p-md-4" style={{ overflow: "visible" }}>
                        <form onSubmit={handleSubmit}>
                            {/*  IDENTIDAD */}
                            <div className="mb-3">
                                <div className="d-flex align-items-center mb-2">
                                    <i className="fas fa-id-card me-2 icon-solid-primary"></i>
                                    <span className="form-label-custom m-0 fw-bold text-white small">Identidad</span>
                                </div>
                                <div className="row g-2">
                                    <div className="col-12 col-md-6">
                                        <label className="form-label-custom small text-muted text-uppercase fw-bold mb-1" style={{ fontSize: '0.65rem' }}>Nombres</label>
                                        <input type="text" name="first_name" className="form-control form-input-dark shadow-none" value={formData.first_name || ""} onChange={handleChange} />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="form-label-custom small text-muted text-uppercase fw-bold mb-1" style={{ fontSize: '0.65rem' }}>Apellidos</label>
                                        <input type="text" name="last_name" className="form-control form-input-dark shadow-none" value={formData.last_name || ""} onChange={handleChange} />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="form-label-custom small text-muted text-uppercase fw-bold mb-1" style={{ fontSize: '0.65rem' }}>Nombre de Usuario</label>
                                        <div className="input-group">
                                            <span className="input-group-text bg-dark border-secondary text-white border-end-0 py-0" style={{ height: '48px' }}>@</span>
                                            <input type="text" name="username" className="form-control form-input-dark shadow-none border-start-0" value={formData.username || ""} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="form-label-custom small text-muted text-uppercase fw-bold mb-1" style={{ fontSize: '0.65rem' }}>Avatar Favorito</label>
                                        <div className="dropdown w-100 position-relative">
                                            <button className="btn form-input-dark w-100 d-flex justify-content-between align-items-center text-white shadow-none" type="button" data-bs-toggle="dropdown">
                                                <span>
                                                    <i className={`fas ${formData.profile_picture || 'fa-user'} me-2 icon-solid-primary`}></i>
                                                    {avatarIcons.find(a => a.value === formData.profile_picture)?.label || "Seleccionar..."}
                                                </span>
                                                <i className="fas fa-chevron-down small text-muted"></i>
                                            </button>
                                            <ul className="dropdown-menu dropdown-menu-dark w-100 border-secondary shadow-lg">
                                                {avatarIcons.map((avatar, index) => (
                                                    <li key={index}>
                                                        <button className="dropdown-item d-flex align-items-center py-2" type="button" onClick={() => setFormData({ ...formData, profile_picture: avatar.value })}>
                                                            <i className={`fas ${avatar.value} me-3 text-center icon-solid-primary`} style={{ width: "20px" }}></i>
                                                            <span className="small">{avatar.label}</span>
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <hr className="profile-divider my-3" />

                            {/* DETALLES ADICIONALES */}
                            <div className="mb-3">
                                <div className="d-flex align-items-center mb-2">
                                    <i className="fas fa-info-circle me-2 icon-solid-primary"></i>
                                    <span className="form-label-custom m-0 fw-bold text-white small">Detalles Adicionales</span>
                                </div>
                                <div className="row g-2">
                                    <div className="col-12 col-md-6">
                                        <label className="form-label-custom small text-muted text-uppercase fw-bold mb-1" style={{ fontSize: '0.65rem' }}>Fecha de Nacimiento</label>
                                        <div className="position-relative">
                                            <input type="date" name="birthday" className="form-control form-input-dark shadow-none pe-5" style={{ colorScheme: "dark" }} value={formData.birthday || ""} onChange={handleChange} min={minDate} max={today} />                                            
                                            <i className="fas fa-calendar-alt small text-muted position-absolute" style={{ right: "15px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}></i>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="form-label-custom small text-muted text-uppercase fw-bold mb-1" style={{ fontSize: '0.65rem' }}>Género</label>
                                        <div className="position-relative">
                                            <select name="gender" className="form-select form-input-dark shadow-none pe-5" style={{ appearance: "none" }} value={formData.gender || ""} onChange={handleChange}>
                                                <option value="">Seleccionar...</option>
                                                <option value="masculino">Masculino</option>
                                                <option value="femenino">Femenino</option>
                                                <option value="otro">Otro</option>
                                            </select>
                                            <i className="fas fa-chevron-down small text-muted position-absolute" style={{ right: "15px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}></i>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <label className="form-label-custom small text-muted text-uppercase fw-bold mb-1" style={{ fontSize: '0.65rem' }}>Teléfono móvil</label>
                                        <input type="tel" name="phone" className="form-control form-input-dark shadow-none" value={formData.phone || ""} onChange={handleChange} />
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <label className="form-label-custom small text-muted text-uppercase fw-bold mb-1" style={{ fontSize: '0.65rem' }}>Ciudad</label>
                                        <input type="text" name="city" className="form-control form-input-dark shadow-none" value={formData.city || ""} onChange={handleChange} />
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <label className="form-label-custom small text-muted text-uppercase fw-bold mb-1" style={{ fontSize: '0.65rem' }}>País</label>
                                        <input type="text" name="country" className="form-control form-input-dark shadow-none" value={formData.country || ""} onChange={handleChange} />
                                    </div>
                                </div>
                            </div>

                            <hr className="profile-divider my-3" />

                            {/* FOOTER */}
                            <div className="row mt-4">
                                <div className="col-12 col-md-4 mb-2 mb-md-0">
                                    <button type="button" className="btn btn-cancelar-perfil w-100 py-2" data-bs-dismiss="modal">
                                        Descartar
                                    </button>
                                </div>
                                <div className="col-md-4 d-none d-md-block"></div>
                                <div className="col-12 col-md-4">
                                    <button type="submit" className="btn btn-edit-profile shadow w-100 py-2">
                                        Guardar Perfil
                                    </button>
                                </div>
                            </div>
                            <button type="button" ref={closeBtnRef} className="d-none" data-bs-dismiss="modal"></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};



