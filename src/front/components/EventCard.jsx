import React from "react";

export const EventCard = ({ name, image, date, time, venue, url }) => {    
    const formattedDate = date 
        ? new Date(date.replace(/-/g, '/')).toLocaleDateString("es-ES", {
            day: "numeric",
            month: "short",
            year: "numeric",
        }) 
        : "Fecha TBD";

    const formattedTime = time ? time.substring(0, 5) : "Hora TBD";

    return (        
        <div className="card h-100 border-0 shadow-sm event-card-pill w-100">            
            <div className="event-img-container">
                <img src={image || "https://via.placeholder.com"} className="card-img-top h-100 w-100 object-fit-cover" alt={name} />
            </div>

            <div className="card-body p-4 d-flex flex-column event-card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <span className="badge rounded-pill px-3 py-2 ticket-badge">
                        TICKETMASTER
                    </span>
                    <a href={url} className="text-muted" target="_blank" rel="noopener noreferrer">
                        <i className="fa-solid fa-up-right-from-square"></i>
                    </a>
                </div>

                <h5 className="card-title mb-3 fw-bold" style={{ fontSize: '1.1rem', lineHeight: '1.4' }}>
                    {name}
                </h5>

                <div className="mt-auto pt-3 border-top border-secondary">
                    <div className="d-flex align-items-start mb-2">
                        <i className="fa-solid fa-location-dot mt-1 me-2 location-icon"></i>
                        <span className="small text-muted text-truncate" title={venue}>
                            {venue || "Lugar por confirmar"}
                        </span>
                    </div>

                    <div className="d-flex align-items-center mb-4">
                        <i className="fa-regular fa-calendar me-2 text-muted" style={{ width: '16px' }}></i>
                        <span className="small text-muted">
                            {formattedDate} <span className="mx-1">•</span> {formattedTime} hs
                        </span>
                    </div>
                </div>

                <div className="d-grid">
                    <a href={url} target="_blank" rel="noopener noreferrer" className="btn py-2 fw-bold btn-buy-tickets shadow-sm">
                        Comprar Tickets
                    </a>
                </div>
            </div>
        </div>
    );
};






