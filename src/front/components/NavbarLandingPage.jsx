import { Link } from "react-router-dom";
import iconLogoColor from "../assets/img/iconLogo-Color.png";


export const NavbarLanding = () => (
    <header className="p-3 text-bg-dark">
        <div className="container"> <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
                  <img src={iconLogoColor} width="60" height="60" />
            </a>
            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <li><a href="#" className="nav-link px-2 text-secondary">Home</a></li>
                <li><a href="#" className="nav-link px-2 text-white">Features</a></li>
                <li><a href="#" className="nav-link px-2 text-white">Pricing</a></li>
                <li><a href="#" className="nav-link px-2 text-white">FAQs</a></li>
                <li><a href="#" className="nav-link px-2 text-white">About</a></li>
            </ul>
            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search" data-landmark-index="1">
                <input type="search" className="form-control form-control-dark text-bg-dark" placeholder="Search..." aria-label="Search" />
            </form> <div className="text-end"> <Link to="/login" type="button" className="btn btn-outline-light me-2">Login</Link>
                <Link to="/signup" type="button" className="btn btn-warning">Sign-up</Link>
            </div>
        </div>
        </div>
    </header>
);
