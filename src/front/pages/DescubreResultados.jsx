import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getEvents } from "../services/servicesAPI";
import { EventCard } from "../components/EventCard";

export const DescubreResultados = () => {
    const { city } = useParams();
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            await getEvents(dispatch, city);
            setLoading(false);
        };
        fetchEvents();
    }, [city, dispatch]);

    // Calcula el total de eventos encontrados
    const totalEvents = store.events ? store.events.length : 0;

    return (
        <div className="min-vh-100 bg-main-dark">
            <div className="container py-5">
                <div className="d-flex align-items-center justify-content-between mb-5">
                    <div className="d-flex align-items-center">
                        <button onClick={() => navigate(-1)} className="btn btn-outline-light me-3">
                            <i className="fas fa-arrow-left"></i> Volver
                        </button>
                        <h2 className="mb-0 fw-bold">
                            Resultados en: <span className="city-highlight">{city}</span>
                        </h2>
                        {/* Muestra resultados  */}
                        {!loading && totalEvents > 0 && (
                            <span className="badge rounded-pill ms-3 ticket-badge">
                                {totalEvents} eventos encontrados
                            </span>
                        )}
                    </div>
                </div>
                
                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-light" role="status"></div>
                    </div>
<<<<<<< Updated upstream
                ) : store.events && store.events.length > 0 ? (                    
                    <div className="row g-4 justify-content-start"> 
                        {store.events.map((event) => (                            
                            <div className="col-12 col-sm-6 col-lg-4" key={event.id}>
                                <EventCard
                                    name={event.name}
                                    image={event.images?.[0]?.url || "https://via.placeholder.com"}
                                    date={event.dates?.start?.localDate}
                                    time={event.dates?.start?.localTime}
                                    venue={event._embedded?.venues?.[0]?.name || "Lugar por confirmar"}
                                    url={event.url}
                                />
                            </div>
                        ))}
=======
                ) : store.events && store.events.length > 0 ? (
                    <div className="row g-3 g-md-4">
                        {store.events.map((event) => {
                            const venueName = event._embedded?.venues?.[0]?.name || "Lugar por confirmar";
                            const cityName = event._embedded?.venues?.[0]?.city?.name || "";

                            return (
                                <div className="col-12 col-sm-6 col-xl-4" key={event.id}>
                                    <EventCard
                                        name={event.name}
                                        image={event.images?.[0]?.url || "https://via.placeholder.com/450x250?text=No+Image"}
                                        date={event.dates?.start?.localDate}
                                        time={event.dates?.start?.localTime}
                                        venue={venueName}
                                        city={cityName}  
                                        url={event.url}
                                    />
                                </div>
                            );
                        })}
>>>>>>> Stashed changes
                    </div>
                ) : (
                    <div className="text-center py-5">
                        <p className="opacity-50 fs-5">No se encontraron eventos en {city}.</p>
                    </div>
                )}
            </div>
        </div>
    );
};



