import { Link } from "react-router-dom";
import iconLogoColor from "../assets/img/iconLogo-Color.png";


export const NavbarLanding = () => (
    <header className="p-3 text-bg-dark">
        <div className="container">
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-between">
                <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                    <img src={iconLogoColor} width="60" height="60" />
                </a>
                <div>
                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        {/* <li><a href="/" className="nav-link px-2 text-secondary">Home</a></li> */}
                        <li><a href="#about" className="nav-link px-2 text-white">About</a></li>
                        <li><a href="#how-it-works" className="nav-link px-2 text-white">Como funciona?</a></li>
                        {/* <li><a href="#" className="nav-link px-2 text-white">Pricing</a></li>
                        <li><a href="#" className="nav-link px-2 text-white">FAQs</a></li> */}
                    </ul>
                </div>

                <div className="text-end">
                    <Link to="login" className="btn btn-outline-light btn-lg px-3 py-1 rounded-pill me-3">Login</Link>
                    <Link to="signup" className="btn btn-warning btn-lg px-3 py-1 rounded-pill">Sign-up</Link>
                </div>
            </div>
        </div>
    </header>
);
