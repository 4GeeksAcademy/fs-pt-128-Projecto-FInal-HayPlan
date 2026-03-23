import { useEffect, useState } from "react";
import { getUser, createGroup } from "../services/backEndServices";
import { useNavigate } from "react-router-dom";

export const CreateGroup = () => {
    const navigate = useNavigate();
    const [loadingPage, setLoadingPage] = useState(true);
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({ name: "", description: "" });

    const checkToken = async () => {
        try {
            const response = await getUser();
            if (response) {
                setUser(response);
                setLoadingPage(false);
            } else {
                localStorage.removeItem("token");
                navigate("/");
            }
        } catch (error) {
            navigate("/");
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/");
        } else {
            checkToken();
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await createGroup(formData);
        if (response) {
            navigate("/app/groups");
        } else {
            alert("Hubo un problema al crear el grupo.");
        }
    };

    return (
        <>
            {loadingPage ? (
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <div className="spinner-border text-warning" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            ) : (
                <div className="container form-container-custom mt-2" style={{ maxWidth: "1200px" }}>
                    
                    {/* CABECERA CON FLECHA */}
                    <div className="d-flex align-items-center mb-1 text-white">
                        <button 
                            onClick={() => navigate(-1)} 
                            className="btn btn-link text-white p-0 me-4 border-0 shadow-none btn-back-custom" 
                            style={{ textDecoration: 'none' }}
                        >
                            <span>⟵</span>
                        </button>
                        <h2 className="mb-0 fw-bold h4">Crear nuevo grupo</h2>
                    </div>
                    <p className="text-secondary mb-4 small ms-5">Reúne a tus amigos en un solo lugar</p>

                    <form onSubmit={handleSubmit} className="form-card-dark dashBoard-card-large p-4 rounded-4 shadow-lg border-0 px-3 px-md-5" style={{ overflow: "visible" }}>
                        <div className="dashBoard-card-large-border"></div>
                        <h6 className="text-white fw-bold mb-4">Información del grupo</h6>

                        <div className="mb-4">
                            <label className="form-label-custom">Nombre del grupo</label>
                            <input
                                name="name"
                                type="text"
                                className="form-control form-input-dark shadow-none"
                                placeholder="Ej: Los senderistas, Familia, Equipo de Fútbol..."
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label-custom">Descripción</label>
                            <textarea
                                name="description"
                                className="form-control form-input-dark shadow-none description-textarea"
                                rows="4"
                                maxLength="500"
                                placeholder="¿De qué trata este grupo? Describe el propósito o las reglas..."
                                value={formData.description}
                                onChange={handleChange}
                            ></textarea>
                            <div className="text-end small text-muted mt-1">
                                {formData.description.length}/500
                            </div>
                        </div>

                        {/* BOTONES */}
                        <div className="row mt-5">
                            <div className="col-12 col-md-4 mb-3 mb-md-0">
                                <button 
                                    type="button" 
                                    className="btn btn-dark bg-dark px-4 py-2 border-0 rounded-3 text-white fw-bold w-100" 
                                    onClick={() => navigate(-1)}
                                >
                                    Cancelar
                                </button>
                            </div>
                            
                            <div className="col-md-4 d-none d-md-block"></div> {/* Espacio central vacío */}
                            
                            <div className="col-12 col-md-4">
                                <button 
                                    type="submit" 
                                    className="btn btn-submit-custom shadow-sm border-0 w-100 d-flex align-items-center justify-content-center gap-2"
                                >
                                   + Crear grupo
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};
