import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CATEGORIES = [
    { id: "Music", name: "Conciertos", img: "https://i.blogs.es/470f05/consejos-iniciarse-foto-conciertos-13/450_1000.webp" },
    { id: "Sports", name: "Deportes", img: "https://objetos-xlk.estaticos-marca.com/files/article_main_microformat_4_3/uploads/2023/11/21/15813555323272.jpeg" },
    { id: "Arts & Theatre", name: "Teatro", img: "https://sanangel.edu.mx/wp-content/uploads/2024/06/obra-de-teatro.webp" },
    { id: "Film", name: "Cine", img: "https://cloudfront-eu-central-1.images.arcpublishing.com/prisaradio/U3OTPO4CNZHSJA5JOBVXKJMKMQ.jpg" },
    { id: "Comida", name: "Bar y Restaurante", img: "https://images.ctfassets.net/trvmqu12jq2l/6FV4Opt7wUyR91t2FXyOIr/f32972fce10fc87585e831b334ea17ef/header.jpg" },
    { id: "Family", name: "Actividades", img: "https://static.grupojoly.com/clip/4094f8a1-f881-4a07-80bf-69937e7f99df_source-aspect-ratio_1600w_0.jpg" }
];

export const Descubre = () => {
    const [city, setCity] = useState("");
    const navigate = useNavigate(); 

<<<<<<< Updated upstream
    const handleSearch = () => {
=======
    const city = store.city || "";

    const handleCityChange = (e) => {
        dispatch({
            type: "set_city",
            payload: e.target.value
        });
    };
    //Categoria comida, no disponible aún.
    const validateAndSearch = (categoryId = null) => {
        if (categoryId === "Comida") {
            alert("La sección de Bar y Restaurante estará disponible próximamente.");
            return;
        }

>>>>>>> Stashed changes
        const searchCity = city.trim();
        if (searchCity.length < 3) {
            alert("Introduce al menos 3 caracteres.");
            return;
        }
<<<<<<< Updated upstream
        navigate(`/descubre-resultados/${searchCity}`);
    };

    return (
        <div className="min-vh-100 bg-main-dark">
            <div className="container py-5">
                <h1 className="display-5 fw-bold mb-4 text-center">Explora planes</h1>

                <div className="row mb-5 justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="position-relative d-flex align-items-center">
                            <input
                                type="text"
                                className="form-control border-0 py-3 ps-4 search-input-custom"
                                placeholder="Escribe tu ciudad y luego selecciona la categoria"
=======

        if (!categoryId) {
            alert("¡Casi listo! Selecciona una categoría.");
            return;
        }

        const categoryObj = CATEGORIES.find(cat => cat.id === categoryId);
        const categoryName = categoryObj ? categoryObj.name : categoryId;

        navigate(`/app/descubre-resultados/${searchCity}?category=${encodeURIComponent(categoryName)}`);
    };

    return (
        <div className="vh-95 bg-main-dark d-flex align-items-center overflow-hidden">
            <div className="container py-3">
                <h1 className="display-5 fw-bold mb-4 text-center text-white">Explora planes</h1>

                {/* BUSCADOR */}
                <div className="row mb-4 justify-content-center">
                    <div className="col-12 col-md-8 col-lg-8">
                        <div className="position-relative d-flex align-items-center">
                            <input
                                type="text"
                                className="form-control search-input-custom ps-4"
                                placeholder="Escribe tu ciudad"
>>>>>>> Stashed changes
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            />
<<<<<<< Updated upstream
                            <button onClick={handleSearch} className="btn position-absolute end-0 me-2 text-secondary" style={{ background: 'transparent', border: 'none' }}>
                                <i className="fas fa-search"></i>
=======
                            <button
                                onClick={() => validateAndSearch()}
                                className="btn position-absolute end-0 me-2 border-0 bg-transparent"
                            >
                                <i className="fas fa-search" style={{color:"#282828"}}></i>
>>>>>>> Stashed changes
                            </button>
                        </div>
                    </div>
                </div>

<<<<<<< Updated upstream
                <div className="row g-4">
                    {CATEGORIES.map((cat) => (
                        <div key={cat.id} className="col-6 col-md-4">
                            <div 
                                onClick={() => city ? navigate(`/app/descubre-resultados/${city}`) : alert("Ingresa tu ubicación para poder seleccionar una categoría.")}
                                className="category-card"
                                style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.85)), url(${cat.img})` }}
                            >
                                <span className="h5 fw-bold mb-0 text-white">{cat.name}</span>
=======
                {/* CATEGORÍAS */}
                <div className="row g-3">
                    {CATEGORIES.map((cat) => (
                        <div key={cat.id} className="col-6 col-md-4">
                            <div
                                onClick={() => validateAndSearch(cat.id)}
                                className="category-card justify-content-center align-items-center"
                                style={{
                                    backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url(${cat.img})`
                                }}
                            >
                                <span className="h6 fw-bold mb-0 text-white text-center px-2">
                                    {cat.name}
                                </span>
>>>>>>> Stashed changes
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};



