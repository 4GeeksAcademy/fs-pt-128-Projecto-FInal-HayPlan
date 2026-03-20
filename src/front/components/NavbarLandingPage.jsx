import { Link } from "react-router-dom";
import iconLogoColor from "../assets/img/iconLogo-Color.png";


export const NavbarLanding = () => (
     <header className="landing-navbar text-bg-dark">
        <div className="container">
            <div className="d-flex align-items-center justify-content-between gap-3 py-3">

                {/* LOGO */}
                <a href="/" className="d-flex align-items-center text-white text-decoration-none flex-shrink-0">
                    <img src={iconLogoColor} width="60" height="60" alt="Hay Plan logo" />
                </a>

                {/* NAV */}
                <ul className="nav landing-nav justify-content-center mb-0 flex-grow-1">
                    {/* <li className="nav-item">
                        <a href="#about" className="nav-link px-2 text-white">About</a>
                    </li> */}
                    <li className="nav-item">
                        <a href="#how-it-works" className="nav-link px-2 text-white">Como funciona?</a>
                    </li>
                </ul>

                {/* ACTIONS */}
                <div className="landing-actions d-flex align-items-center gap-2 flex-shrink-0">
                    <Link to="/login" className="btn btn-outline-light rounded-pill px-3 py-1">
                        Login
                    </Link>
                    <Link to="/signup" className="btn btn-warning rounded-pill px-3 py-1">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    </header>
);
