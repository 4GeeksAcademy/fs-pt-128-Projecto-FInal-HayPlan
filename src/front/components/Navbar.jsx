import { Link, NavLink } from "react-router-dom";
import iconLogoColor from "../assets/img/iconLogo-Color.png";
import iconLogo from "../assets/img/iconLogo.png";

export const Navbar = () => {

	return (
		<nav className="sidebar">
			{/* posicion vertical altura 100% */}
			<div className="d-flex justify-content-between flex-column vh-100 py-0 px-1" style={{ width: "230px" }}>

				{/* Logo */}
				<div className="d-flex justify-content-center py-2 border-bottom">
					<a className="d-flex align-items-center gap-2 text-decoration-none m-0" href="#">
						<img src={iconLogoColor} alt="Bootstrap" style={{ width: "35px" }} />
						<h5 className="fw-bold m-0">Hay Plan?</h5>
					</a>
				</div>

				{/* Navigation Items */}
				<div className="nav flex-column gap-2">
					<div className="fw-bold px-2">
						<span className="nav-item-title">Navegacion</span>

						<NavLink to="/app" className="btn d-flex align-items-center gap-2 py-1">
							<i className="bi bi-border-style"></i>
							<span clasName="nav-item">Inicio</span>
						</NavLink>

						<NavLink to="/app/planes" className="btn d-flex align-items-center gap-2">
							<img src={iconLogoColor} width="18" height="18" />
							<span clasName="nav-item">Planes</span>
						</NavLink>

						<NavLink to="/app/grupos" className="btn d-flex align-items-center gap-2">
							<i className="bi bi-people"></i>
							<span clasName="nav-item">Grupos</span>
						</NavLink>

						<NavLink to="/app/stats" className="btn d-flex align-items-center gap-2">
							<i className="bi bi-bar-chart"></i>
							<span clasName="nav-item">Stats</span>
						</NavLink>

						<NavLink to="/descubre" className="btn d-flex align-items-center gap-2">
							<i className="bi bi-search"></i>
							<span clasName="nav-item">Descubre</span>
						</NavLink>
					</div>
				</div>

				{/* Setting Items */}
				<div className="nav flex-column gap-2 pb-2">
					<div className="fw-bold px-2">
						<span className="nav-item-title">Settings</span>

						<Link to="/app/perfil" className="btn d-flex align-items-center gap-2">
							<i className="bi bi-person-circle"></i>
							<span clasName="nav-item">Perfil</span>
						</Link>

						<Link to="/app/ayuda" className="btn d-flex align-items-center gap-2">
							<i className="bi bi-info-circle"></i>
							<span clasName="nav-item">Ayuda</span>
						</Link>

						<Link to="/app/rateUs" className="btn d-flex align-items-center gap-2">
							<i className="bi bi-star-half"></i>
							<span clasName="nav-item">Rate</span>
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
};