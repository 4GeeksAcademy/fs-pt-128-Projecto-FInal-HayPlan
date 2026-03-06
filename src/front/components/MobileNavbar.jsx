import { NavLink } from "react-router-dom";
import iconLogoColor from "../assets/img/iconLogo-Color.png";


export const MobileNavbar = () => {

    return (
        <nav className="navbar border-top fixed-bottom d-lg-none">
            <div className="container-fluid">
                <div className="nav nav-fill  w-100">

                    {/* Grupos */}
                    <NavLink to="/" className="nav-link text-center py-2">
						<i className="bi bi-people fs-1"></i>
                    </NavLink>

                    {/* stats */}
                    <NavLink to="/" className="nav-link text-center py-2">
                        <i className="bi bi-bar-chart fs-1"></i>
                    </NavLink>
                   
                    {/* Dashboard */}
                    <a className="nav-link text-center py-2" href="#">
                        <img src={iconLogoColor} width="60" height="60" />
                    </a>

                    {/* descubre */}
                    <NavLink to="/" className="nav-link text-center py-2">
						<i className="bi bi-search fs-1"></i>
                    </NavLink>

                    {/* Settings */}
                    <NavLink to="/" className="nav-link text-center py-2">
                        <i className="bi bi-gear fs-1"></i>
                    </NavLink>

                </div>
            </div>
        </nav>
    );
};