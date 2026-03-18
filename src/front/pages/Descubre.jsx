import React from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { CATEGORIES } from "../constants/Categories";

export const Descubre = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const city = store.city || "";

    const handleCityChange = (e) => {
        dispatch({
            type: "set_city",
            payload: e.target.value
        });
    };

    const validateAndSearch = (categoryId = null) => {
        const searchCity = city.trim();

        if (searchCity.length < 3) {
            alert("Por favor, escribe primero una ciudad.");
            return;
        }

        if (!categoryId) {
            alert("¡Casi listo! Selecciona una categoría.");
            return;
        }

        const categoryObj = CATEGORIES.find(cat => cat.id === categoryId);
        const categoryName = categoryObj ? categoryObj.name : categoryId;

        // Navegamos pasando el nombre en lugar del ID
        navigate(`/app/descubre-resultados/${searchCity}?category=${encodeURIComponent(categoryName)}`);
    };

    return (
        <div className="vh-95 bg-main-dark d-flex align-items-center overflow-hidden">
            <div className="container py-3">
                <h1 className="display-5 fw-bold mb-4 text-center">Explora planes</h1>

                {/* Input de búsqueda */}
                <div className="row mb-4 justify-content-center">
                    <div className="col-12 col-md-8 col-lg-8">
                        <div className="position-relative d-flex align-items-center">
                            <input
                                type="text"
                                className="form-control border-4 py-2 ps-4 mb-4 search-input-custom"
                                placeholder="Escribe tu ciudad"
                                value={city}
                                onChange={handleCityChange}
                                onKeyDown={(e) => e.key === 'Enter' && validateAndSearch()}
                            />
                            <button
                                onClick={() => validateAndSearch()}
                                className="btn position-absolute end-0 me-2 text-secondary border-0"
                            >
                                <i className="fas fa-search mb-4" style={{color:"#282828"}}></i>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Categorías */}
                <div className="row g-3">
                    {CATEGORIES.map((cat) => (
                        <div key={cat.id} className="col-6 col-md-4">
                            <div
                                onClick={() => validateAndSearch(cat.id)}
                                className="category-card justify-content-center align-items-center"
                                style={{
                                    backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.85)), url(${cat.img})`
                                }}
                            >
                                <span className="h6 fw-bold mb-0 text-white text-center px-2">{cat.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};