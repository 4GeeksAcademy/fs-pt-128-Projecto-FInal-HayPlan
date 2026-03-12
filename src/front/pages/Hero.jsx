import { Link } from "react-router-dom";
import iconLogoColor from "../assets/img/iconLogo-Color.png";

export const Hero = () => {

    return (
        <div className="container my-5">
            <div className="p-5 text-center bg-body-tertiary rounded-3">
                <img src={iconLogoColor} width="100" height="100" />
                <h1 className="text-body-emphasis">Organiza tus salidas</h1>
                <h2 className="text-body-emphasis">sin complicaciones!</h2>
                <p className="col-lg-8 mx-auto fs-5 text-muted">
                    Hay Plan organiza ideas, votaciones y fechas en un solo lugar para que los planes realmente sucedan.
                </p>
                <div className="d-inline-flex gap-2 mb-5">
                    <Link to="/signup" className="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill" type="button">
                        Sign up
                    </Link>
                    <Link to="/login" className="btn btn-outline-secondary btn-lg px-4 rounded-pill" type="Link">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    )
}