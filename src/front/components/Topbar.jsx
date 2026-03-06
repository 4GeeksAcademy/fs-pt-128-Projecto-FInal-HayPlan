import { Link } from "react-router-dom";

export const Topbar = () => {

    return (
        <div className="d-flex align-items-center justify-content-between px-3 py-2">

            <div className="fw-bold px-3">Pagina</div>

            {/* Contenedor para botones */}
            <div className="d-flex justify-content-end gap-2">
                <button type="button" class="btn btn-outline-success">Que plan hay?</button>
                <button className="btn btn-primary">Nuevo Plan</button>
                
                {/* Toggle modo claro/obscuro */}
                <div class="btn-group" role="group" aria-label="Basic outlined example">
                    <button type="button" class="btn btn-outline-primary"><i class="bi bi-brightness-low"></i></button>
                    <button type="button" class="btn btn-outline-primary"><i class="bi bi-brightness-low-fill"></i></button>
                </div>
            </div>



        </div>
    );
};