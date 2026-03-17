import { useEffect, useState } from "react";
import { getAllGroups, getUser, createPlan } from "../services/backEndServices";
import { useNavigate } from "react-router-dom";

export const CreatePlan = () => {
    const navigate = useNavigate();
    const [loadingPage, setLoadingPage] = useState(true);
    const [user, setUser] = useState(null);
    const [groups, setGroups] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        group_id: "",
        location: "",
        date: "",
        time: ""
    });

    const checkToken = async () => {
        try {
            const response = await getUser();
            if (response) {
                setUser(response);
            } else {
                localStorage.removeItem("token");
                navigate("/");
            }
        } catch (error) {
            navigate("/");
        }
    };

    const getInfo = async () => {
        try {
            const responseGroups = await getAllGroups();            
            setGroups(Array.isArray(responseGroups) ? responseGroups : []);
        } catch (error) {
            console.error("Error cargando grupos", error);
        } finally {
            setLoadingPage(false);
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

    useEffect(() => {
        if (user) getInfo();
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.group_id) {
            alert("Por favor, selecciona un grupo.");
            return;
        }

        const combinedDate = `${formData.date}T${formData.time || "00:00"}:00`;
        const planData = {
            title: formData.title,
            description: formData.description,
            location: formData.location,
            date: combinedDate
        };

        const response = await createPlan(Number(formData.group_id), planData);
        if (response) {
            navigate("/app/plans");
        } else {
            alert("Hubo un problema al crear el plan.");
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
                <div className="container form-container-custom" style={{ maxWidth: "500px" }}>
                    <div className="d-flex align-items-center mb-1 text-white">
                        <button onClick={() => navigate(-1)} className="btn btn-link text-white p-0 me-3 border-0 shadow-none" style={{ textDecoration: 'none' }}>
                            <span style={{ fontSize: '1.5rem' }}>←</span>
                        </button>
                        <h2 className="mb-0 fw-bold h4">Crear nuevo plan</h2>
                    </div>
                    <p className="text-secondary mb-4 small ms-5">Crea una propuesta para tu grupo</p>

                    <form onSubmit={handleSubmit} className="form-card-dark p-4 rounded-4 shadow-lg border-0">
                        <div className="dashBoard-card-large-border"></div>
                        <h6 className="text-white fw-bold mb-4">Detalles del plan</h6>

                        <div className="mb-3">
                            <label className="form-label-custom">Título del plan</label>
                            <input name="title" type="text" className="form-control form-input-dark" placeholder="Ej: Cena en casa de Manu" value={formData.title} onChange={handleChange} required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label-custom">Descripción</label>
                            <textarea name="description" className="form-control form-input-dark" rows="3" placeholder="Describe las actividades..." value={formData.description} onChange={handleChange}></textarea>
                        </div>

                        <div className="mb-3">
                            <label className="form-label-custom">Grupo</label>
                            <select name="group_id" value={formData.group_id} className="form-select form-input-dark" onChange={handleChange} required>
                                <option value="" disabled>Selecciona el grupo...</option>
                                {groups && groups.length > 0 ? (
                                    groups.map(group => (
                                        <option key={group.id} value={group.id}>{group.name}</option>
                                    ))
                                ) : (
                                    <option disabled>No tienes grupos disponibles</option>
                                )}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label-custom">Ubicación</label>
                            <input name="location" type="text" className="form-control form-input-dark" placeholder="Ej: Casa de Manu..." value={formData.location} onChange={handleChange} />
                        </div>

                        <div className="row">
                            <div className="col-6 mb-3">
                                <label className="form-label-custom">Fecha</label>
                                <input name="date" type="date" className="form-control form-input-dark" value={formData.date} onChange={handleChange} required />
                            </div>
                            <div className="col-6 mb-3">
                                <label className="form-label-custom">Hora</label>
                                <input name="time" type="time" className="form-control form-input-dark" value={formData.time} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mt-4">
                            <button type="button" className="btn btn-dark bg-dark px-4 py-2 border-0 rounded-3 text-white fw-bold" onClick={() => navigate(-1)}>
                                Cancelar
                            </button>
                            <button type="submit" className="btn btn-submit-custom shadow-sm border-0">
                                + Crear plan
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};


