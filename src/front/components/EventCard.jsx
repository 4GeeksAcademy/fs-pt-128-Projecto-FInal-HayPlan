import React from "react";

export const EventCard = ({ name, image, date, time, venue, city, url }) => {
    // Formatea la fecha
    const formattedDate = date
        ? new Date(date.replace(/-/g, '/')).toLocaleDateString("es-ES", {
            day: "numeric",
            month: "short",
            year: "numeric",
        })
        : "Por confirmar";

    // Formatea la hora
    const formattedTime = time ? time.substring(0, 5) : "Por confirmar";

    return (
        <div className="card h-100 border-0 event-card-pill w-100">
            <div className="event-img-container">
                <img
                    src={image || "https://via.placeholder.com/400x200?text=Sin+imagen"}
                    className="card-img-top h-100 w-100 object-fit-cover"
                    alt={name || "Evento"}
                />
            </div>

            <div className="card-body p-3 p-md-4 d-flex flex-column event-card-body">
                {/* Badge y enlace externo */}
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="badge rounded-pill px-2 px-md-3 py-2 ticket-badge">
                        TICKETMASTER
                    </span>
                    {url && (
                        <a href={url} className="text-muted" target="_blank" rel="noopener noreferrer">
                            <i className="fa-solid fa-up-right-from-square"></i>
                        </a>
                    )}
                </div>

                {/* Nombre del evento */}
                <h5 className="card-title mb-3 fw-bold fs-6 fs-md-5">{name || "Evento sin nombre"}</h5>

                {/* Venue y ciudad */}
                <div className="mt-auto pt-3 border-top border-secondary">
                    <div className="d-flex align-items-start mb-2">
                        <i className="fa-solid fa-location-dot mt-1 me-2 location-icon"></i>
                        <span
                            className="small text-muted text-truncate"
                            title={`${venue || "Lugar por confirmar"}${city ? ", " + city : ""}`}
                        >
                            {venue || "Lugar por confirmar"}
                            {city ? `, ${city}` : ""}
                        </span>
                    </div>

                    <div className="d-flex align-items-center mb-4">
                        <i className="fa-regular fa-calendar me-2 text-muted location-icon"></i>
                        <span className="small text-muted d-flex align-items-center text-nowrap">
                            {formattedDate}
                            <span className="mx-2">•</span>
                            <i className="fa-regular fa-clock me-1 text-muted"></i>
                            {formattedTime}
                        </span>
                    </div>
                </div>

                {/* Botón de compra */}
                {url && (
                    <div className="d-grid">
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn py-2 fw-bold btn-buy-tickets shadow-sm"
                        >
                            Comprar Tickets
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};
