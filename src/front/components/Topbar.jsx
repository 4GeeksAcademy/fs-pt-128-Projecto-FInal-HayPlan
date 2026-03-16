import { Link } from "react-router-dom";

export const Topbar = () => {

    return (
        <div className="d-flex align-items-center justify-content-between px-3 py-2">

            <div className="fw-bold px-3">Pagina</div>
            {/* Contenedor para botones */}
            <div className="d-flex justify-content-end gap-2">
                 <Link to="/" className="btn btn-outline-light btn-sm px-3 rounded-pill">
                         <i class="bi bi-gear"></i>
                    </Link>
                     <Link to="/" className="btn btn-warning btn-sm px-4 rounded-pill">
                       Nuevo Plan
                    </Link>
                
                {/* Toggle modo claro/obscuro */}
                {/* <div className="btn-group" role="group" aria-label="Basic outlined example">
                    <button type="button" className="btn btn-outline-primary btn-sm">
                        <i className="bi bi-brightness-low"></i>
                    </button>
                    <button type="button" className="btn btn-outline-primary btn-sm">
                        <i className="bi bi-brightness-low-fill"></i>
                    </button>
                </div> */}
            </div>
        </div>
    );
};