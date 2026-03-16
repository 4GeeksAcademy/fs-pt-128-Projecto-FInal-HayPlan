import { Link } from "react-router-dom";
import iconLogoColor from "../assets/img/iconLogo-Color.png";

export const Hero = () => {

    return (
        <div className="container my-5">
            <div className="hero-box p-5 text-center rounded-4 position-relative overflow-hidden">
                {/* Background Logo */}
                <img src={iconLogoColor} className="hero-logo" alt="" />

                <h1 className="text-white">Organiza tus salidas</h1>
                <h2 className="text-warning">sin complicaciones!</h2>
                <p className="col-lg-8 mx-auto fs-5 text-muted">
                    Hay Plan organiza ideas, votaciones y fechas en un solo lugar para que los planes realmente sucedan.
                </p>

                <div className="d-inline-flex gap-2 mb-4">
                    <Link to="/login" className="btn btn-outline-light btn-lg px-4 rounded-pill">
                        Login
                    </Link>
                     <Link to="/signup" className="btn btn-warning btn-lg px-4 rounded-pill">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    )
}