import { useEffect, useState } from "react";
import { getAllGroups, getUser, createPlan } from "../services/backEndServices";
import { useNavigate, useParams } from "react-router-dom";

export const CreatePlan = () => {
    const { groupId } = useParams();
    const navigate = useNavigate();

    const [loadingPage, setLoadingPage] = useState(true);
    const [user, setUser] = useState(null);
    const [groups, setGroups] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        group_id: groupId || "",
        location: "",
        date: "",
        time: ""
    });

    // Límites de fecha.
    const today = new Date().toISOString().split("T")[0];
    const maxDateRef = new Date();
    maxDateRef.setFullYear(maxDateRef.getFullYear() + 10);
    const limitDate = maxDateRef.toISOString().split("T")[0];

    useEffect(() => {
        if (groupId) setFormData(prev => ({ ...prev, group_id: groupId }));
    }, [groupId]);

    const checkToken = async () => {
        try {
            const response = await getUser();
            if (response) setUser(response);
            else { localStorage.removeItem("token"); navigate("/"); }
        } catch (error) { navigate("/"); }
    };

    const getInfo = async () => {
        try {
            const responseGroups = await getAllGroups();
            setGroups(Array.isArray(responseGroups) ? responseGroups : []);
        } catch (error) { console.error("Error cargando grupos", error); }
        finally { setLoadingPage(false); }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) navigate("/"); else checkToken();
    }, []);

    useEffect(() => { if (user) getInfo(); }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.group_id) { alert("Por favor, selecciona un grupo."); return; }
        const combinedDate = `${formData.date}T${formData.time || "00:00"}:00`;
        const response = await createPlan(Number(formData.group_id), {
            title: formData.title,
            description: formData.description,
            location: formData.location,
            date: combinedDate
        });
        if (response) navigate("/app/plans");
        else alert("Hubo un problema al crear el plan.");
    };

    return (
        <>
            {loadingPage ? (
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <div className="spinner-border text-warning"></div>
                </div>
            ) : (
                <div className="container form-container-custom" style={{ maxWidth: "1200px" }}>

                    {/* CABECERA CON FLECHA */}
                    <div className="d-flex align-items-center mb-1 text-white">
                        <button onClick={() => navigate(-1)} className="btn btn-link text-white p-0 me-4 border-0 shadow-none btn-back-custom" style={{ textDecoration: 'none' }}>
                            <span>⟵</span>
                        </button>
                        <h2 className="mb-0 fw-bold h4">Crear nuevo plan</h2>
                    </div>
                    <p className="text-secondary mb-4 small ms-5">Crea una propuesta para tu grupo</p>

                    <form onSubmit={handleSubmit} className="form-card-dark dashBoard-card-large p-4 rounded-4 shadow-lg border-0 px-3 px-md-5" style={{ overflow: "visible" }}>
                        <div className="dashBoard-card-large-border"></div>
                        <h6 className="text-white fw-bold mb-4">Detalles del plan</h6>

                        {/* Título y Grupo */}
                        <div className="row mb-3">
                            <div className="col-md-6 mb-3 mb-md-0">
                                <label className="form-label-custom">Nombre del plan</label>
                                <input name="title" type="text" className="form-control form-input-dark shadow-none" placeholder="Ej: Cena en casa de Manu" value={formData.title} onChange={handleChange} required />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label-custom">Grupo</label>
                                <div className="position-relative">
                                    <select name="group_id" value={formData.group_id} className="form-select form-input-dark shadow-none" style={{ appearance: "none" }} onChange={handleChange} required>
                                        <option value="" disabled>Selecciona el grupo...</option>
                                        {groups.map(group => <option key={group.id} value={group.id}>{group.name}</option>)}
                                    </select>
                                    <i className="fas fa-chevron-down small text-muted position-absolute calendar-icon-fix"></i>
                                </div>
                            </div>
                        </div>

                        {/*  Descripción */}
                        <div className="mb-4">
                            <label className="form-label-custom">Descripción</label>
                            <textarea name="description" className="form-control form-input-dark shadow-none description-textarea" rows="3" maxLength="500" placeholder="Describe las actividades..." value={formData.description} onChange={handleChange}></textarea>
                            <div className="text-end small text-muted mt-1">{formData.description.length}/500</div>
                        </div>

                        {/* Ubicación, Fecha y Hora */}
                        <div className="row mb-3">
                            <div className="col-md-4 mb-3 mb-md-0">
                                <label className="form-label-custom">Ubicación</label>
                                <div className="position-relative">
                                    <input name="location" type="text" className="form-control form-input-dark shadow-none" placeholder="Ej: Casa de Manu..." value={formData.location} onChange={handleChange} />
                                    <i className="fas fa-map-marker-alt small text-muted position-absolute calendar-icon-fix"></i>
                                </div>
                            </div>

                            <div className="col-md-4 mb-3 mb-md-0">
                                <label className="form-label-custom">Fecha</label>
                                <div className="position-relative">
                                    <input name="date" type="date" className="form-control form-input-dark shadow-none" style={{ colorScheme: "dark" }} value={formData.date} min={today} max={limitDate} onChange={handleChange} required />
                                    <i className="fas fa-calendar-alt small text-muted position-absolute calendar-icon-fix"></i>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <label className="form-label-custom">Hora</label>
                                <div className="position-relative">
                                    <input name="time" type="time" className="form-control form-input-dark shadow-none" style={{ colorScheme: "dark" }} value={formData.time} onChange={handleChange} />
                                    <i className="fas fa-clock small text-muted position-absolute calendar-icon-fix"></i>
                                </div>
                            </div>
                        </div>

                        {/* BOTONES*/}
                        <div className="row mt-5">
                            <div className="col-12 col-md-4 mb-3 mb-md-0">
                                <button type="button" className="btn btn-dark bg-dark px-4 py-2 border-0 rounded-3 text-white fw-bold w-100" onClick={() => navigate(-1)}>
                                    Cancelar
                                </button>
                            </div>
                            <div className="col-md-4 d-none d-md-block"></div>
                            <div className="col-12 col-md-4">
                                <button type="submit" className="btn btn-submit-custom shadow-sm border-0 w-100">
                                    + Crear plan
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

