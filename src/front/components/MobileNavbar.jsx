import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

import iconLogoColor from "../assets/img/iconLogo-Color.png";


export const MobileNavbar = () => {

    return (
        <nav className="sidebar fixed-bottom d-lg-none">
            <div className="container-fluid">

                <div className="nav d-flex justify-content-center gap-3 w-100">
                    {/* Grupos */}
                    <NavLink to="/" className="btn text-center px-3">
                        <i className="bi bi-people"></i>
                    </NavLink>

                    {/* stats */}
                    <NavLink to="/" className="btn text-center px-3">
                        <i className="bi bi-bar-chart"></i>
                    </NavLink>

                    {/* Dashboard */}
                    <a className="btn text-center" href="#">
                        <img src={iconLogoColor} width="60" height="60" />
                    </a>

                    {/* descubre */}
                    <NavLink to="/" className="btn text-center px-3">
                        <i className="bi bi-search"></i>
                    </NavLink>

                    {/* Settings */}
                    <NavLink to="/" className="btn text-center px-3">
                        <i className="bi bi-gear"></i>
                    </NavLink>

                </div>
            </div>
        </nav>
    );
};