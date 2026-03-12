import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getEvents } from "../services/servicesAPI";
import { EventCard } from "../components/EventCard";

export const Descubre = () => {
    const { store, dispatch } = useGlobalReducer();
    const [city, setCity] = useState("");
    const [searching, setSearching] = useState(false);
   
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async () => {
        const searchCity = city.trim();
        if (searchCity.length < 3) {
            alert("Introduce al menos 3 caracteres.");
            return;
        }

        setSearching(true);
        setHasSearched(true);
        
        // Limpiamos eventos anteriores 
        dispatch({ type: "set_events", payload: [] });

        try {
            await getEvents(dispatch, searchCity);
        } finally {
            setSearching(false);
        }
    };

    return (
        <div className="min-vh-100 bg-page-custom">
            <div className="py-5 text-white shadow-sm header-descubre">
                <div className="container text-center py-5">
                    <h1 className="display-4 fw-bold mb-3">Descubre Eventos</h1>
                    <p className="lead mb-5 opacity-75">Encuentra los mejores planes en tu ciudad</p>

                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 col-lg-6">
                            <div className="bg-white p-2 d-flex align-items-center shadow-lg search-container-pill">
                                <input
                                    type="text"
                                    className="form-control border-0 ps-4 py-3 search-input-custom"
                                    placeholder="Ej: Madrid, Barcelona..."
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                />
                                <button onClick={handleSearch} disabled={searching} className="btn px-4 py-3 fw-bold text-white ms-2 btn-search-dark">
                                    {searching ? <span className="spinner-border spinner-border-sm"></span> : "Buscar"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-5">
                {/* EVENTOS ENCONTRADOS */}
                {store.events && store.events.length > 0 ? (
                    <div className="row g-4 mt-2">
                        {store.events.map((event) => (
                            <EventCard
                                key={event.id}
                                name={event.name}
                                image={event.images?.[0]?.url || "https://via.placeholder.com"}
                                date={event.dates?.start?.localDate}
                                time={event.dates?.start?.localTime}
                                venue={event._embedded?.venues?.[0]?.name || "Lugar por confirmar"}
                                url={event.url}
                            />
                        ))}
                    </div>
                ) : (
                    /* ESTADO INICIAL, BUSCANDO O SIN RESULTADOS */
                    <div className="text-center py-5 mt-5">
                        <div className="mb-4">
                            <div className="empty-state-circle">
                                <i className={`fa-solid ${!searching && hasSearched ? 'fa-magnifying-glass' : 'fa-ticket-simple'} fa-5x empty-state-icon`}></i>
                            </div>
                        </div>
                        
                        <h2 className="fw-bold text-dark display-6">
                            {searching 
                                ? "Buscando eventos..." 
                                : (!searching && hasSearched 
                                    ? "No hay eventos disponibles" 
                                    : "Busca en tu ciudad")}
                        </h2>
                        
                        <p className="text-muted fs-5">
                            {searching 
                                ? "Conectando con Ticketmaster..." 
                                : (!searching && hasSearched 
                                    ? `No encontramos planes en "${city}" para los próximos días.` 
                                    : "Introduce una ciudad para ver los planes disponibles")}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};



