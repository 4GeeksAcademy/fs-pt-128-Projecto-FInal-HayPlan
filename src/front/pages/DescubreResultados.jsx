import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getTicketmasterEvents } from "../services/servicesAPI";
import { EventCard } from "../components/EventCard";
import { CATEGORIES } from "../constants/Categories";

export const DescubreResultados = () => {
    const { city } = useParams();
    const [searchParams] = useSearchParams();
    const categoryName = searchParams.get("category");

    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            const categoryObj = CATEGORIES.find(cat => cat.name === categoryName);
            const idToSearch = categoryObj ? categoryObj.id : categoryName;

            setLoading(true);
            await getTicketmasterEvents(dispatch, city, idToSearch);
            setLoading(false);
        };
        fetchEvents();
    }, [city, categoryName, dispatch]);

    const totalEvents = store.events ? store.events.length : 0;

    return (
        <div className="min-vh-100 bg-main-dark">
            <div className="container py-4 py-md-5">
                <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between mb-4 mb-md-5 gap-3">
                    <div className="d-flex align-items-center flex-wrap">
                        <button
                            onClick={() => navigate(-1)}
                            className="btn btn-outline-light me-3 btn-sm btn-md-base"
                        >
                            <i className="fas fa-arrow-left"></i> Volver
                        </button>
                        <h2 className="mb-0 fw-bold fs-4 fs-md-2">
                            Resultados en: <span className="city-highlight">{city}</span>
                        </h2>
                    </div>
                    {!loading && totalEvents > 0 && (
                        <span className="badge rounded-pill ticket-badge py-2 px-3">
                            {totalEvents} eventos encontrados
                        </span>
                    )}
                </div>

                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-light" role="status"></div>
                    </div>
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
                                        city={cityName}  // Nueva prop
                                        url={event.url}
                                    />
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-5">
                        <p className="opacity-50 fs-5">
                            No se encontraron eventos de "{categoryName}" en {city}.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

