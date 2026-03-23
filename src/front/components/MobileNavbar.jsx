import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

import iconLogoColor from "../assets/img/iconLogo-Color.png";


export const MobileNavbar = () => {

    return (
        <nav className="sidebar fixed-bottom d-lg-none">
            <div className="container-fluid">

                <div className="nav d-flex justify-content-center gap-3 w-100">
                    {/* Dashboard */}
                    <NavLink to="/app" end className="btn text-center px-3">
                        <i className="bi bi-border-style"></i>
                    </NavLink>

                    {/* Mis grupos */}
                    <NavLink to="/app/groups" className="btn text-center px-3">
                        <i className="bi bi-people"></i>
                    </NavLink>

                    {/* Planes */}
                    <NavLink to="/app/plans" className="btn text-center" >
                        <img src={iconLogoColor} width="60" height="60" />
                    </NavLink>

                    {/* descubre */}
                    <NavLink to="/app/descubre" className="btn text-center px-3">
                        <i className="bi bi-search"></i>
                    </NavLink>

                    {/* Settings */}
                    <NavLink to="/app/profile" className="btn text-center px-3">
                        <i className="bi bi-gear"></i>
                    </NavLink>

                </div>
            </div>
        </nav>
    );
};