import { Link } from "react-router-dom"

export const DiscoverCard = ({ image, className = "" }) => {
    return (
        <div className={`dashboard-card rounded-4 overflow-hidden h-100 w-100 p-0 position-relative ${className}`}>
            <div className="row g-0 h-100">

                <div className="col-12 col-lg-5 position-relative">
                    <img
                        src={image}
                        alt="Descubre"
                        className="w-100 h-100 object-fit-cover"
                        style={{ minHeight: "280px" }}
                    />

                    <div
                        className="position-absolute top-0 start-0 w-100 h-100"
                        style={{
                            background: "linear-gradient(180deg, rgba(15,12,11,0.08) 0%, rgba(15,12,11,0.45) 100%)"
                        }}
                    ></div>
                </div>

                <div className="col-12 col-lg-7 d-flex">
                    <div className="d-flex flex-column justify-content-center p-4 p-lg-5 w-100 text-start dashboard-card-discover">
                        <div className="small text-uppercase fw-semibold text-secondary mb-2">
                            Descubre
                        </div>

                        <h3 className="fw-bold lh-sm mb-3">
                            Encuentra ideas que sí se convierten en plan
                        </h3>

                        <p className="text-secondary mb-4">
                            Explora eventos, actividades y lugares para inspirar al grupo y pasar de la idea al plan.
                        </p>

                        <div className="d-flex flex-wrap align-items-center gap-2 mb-4">
                            <span className="badge rounded-pill border px-3 py-2">Eventos</span>
                            <span className="badge rounded-pill border px-3 py-2">Sitios</span>
                            <span className="badge rounded-pill border px-3 py-2">Ideas</span>
                        </div>

                        <div>
                            <Link to="/app/descubre" className="btn btn-warning rounded-pill px-4">Explorar</Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}