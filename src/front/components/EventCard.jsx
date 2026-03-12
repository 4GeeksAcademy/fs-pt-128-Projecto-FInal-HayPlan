import React from "react";

export const EventCard = ({ name, image, date, time, venue, url }) => {    
    // Formateo de fecha: de "2026-03-27" a "27 mar 2026"
    const formattedDate = date 
        ? new Date(date.replace(/-/g, '\/')).toLocaleDateString("es-ES", {
            day: "numeric",
            month: "short",
            year: "numeric",
        }) 
        : "Fecha TBD";

    // Formateo de hora: de "21:00:00" a "21:00"
    const formattedTime = time ? time.substring(0, 5) : "Hora TBD";

    return (
        <div className="col-12 col-md-6 col-lg-4 mb-4">            
            <div className="card h-100 border-0 shadow-sm event-card-pill">
                
                <div className="event-img-container">
                    <img src={image} className="card-img-top h-100 w-100 object-fit-cover" alt={name} />
                </div>

                <div className="card-body p-4 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="badge rounded-pill px-3 py-2 badge-tm">
                            TICKETMASTER
                        </span>
                        <a href={url} className="text-muted small" target="_blank" rel="noopener noreferrer">
                            <i className="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                    </div>

                    <h5 className="card-title mb-3 event-title-text">
                        {name}
                    </h5>

                    <div className="text-muted small mb-4 mt-auto">
                        <div className="d-flex align-items-center mb-2">
                            <i className="fa-solid fa-location-dot me-2 text-danger icon-fixed-width"></i>
                            <span className="text-truncate">{venue || "Lugar no especificado"}</span>
                        </div>
                        <div className="d-flex align-items-center">
                            <i className="fa-regular fa-calendar me-2 icon-fixed-width"></i>
                            <span>{formattedDate} • {formattedTime} hs</span>
                        </div>
                    </div>

                    <div className="d-flex">
                        <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-orange-action w-100 py-2 fw-bold text-white shadow-sm">
                            Comprar Tickets
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};




