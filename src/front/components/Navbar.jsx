import { Link, NavLink, useNavigate } from "react-router-dom";
import { appNav } from "../navigation/appNav"
import iconLogoColor from "../assets/img/iconLogo-Color.png";
import iconLogo from "../assets/img/iconLogo.png";

export const Navbar = () => {
	const navigate = useNavigate();

	const handleLogout = (e) => {
		e.preventDefault(); // Evita que el enlace haga algo por defecto
		if (window.confirm("¿Seguro que quieres cerrar sesión?")) {
			localStorage.removeItem("token");
			navigate("/login");
		}
	};

	return (
		<nav className="sidebar">
			{/* posicion vertical altura 100% */}
			<div className="d-flex justify-content-between flex-column vh-100 py-0 px-1" style={{ width: "230px" }}>

				{/* Logo */}
				<div className="d-flex justify-content-center py-3 border-bottom">
					<NavLink to="/app" end className="d-flex align-items-center gap-2 text-decoration-none m-0">
						<img src={iconLogoColor} alt="Hay Plan Logo" style={{ width: "35px" }} />
						<h5 className="fw-bold m-0">Hay Plan?</h5>
					</NavLink>
				</div>

				{/* Navigation Items */}
				<div className="fw-bold px-2">
					<span className="nav-item-title">{appNav[0].section}</span>
					<div className="nav flex-column gap-2">
						{appNav[0].items.map((item) => {
							return (
								<NavLink
									key={item.path}
									to={item.path} end={item.path === "/app"}
									className={({ isActive }) => `btn d-flex align-items-center gap-2 py-1 ${isActive ? "active" : ""}`}
								>
									<i className={`bi ${item.icon}`}></i>
									<span className="nav-item">{item.label}</span>
								</NavLink>
							)
						})}
					</div>
				</div>

				{/* Settings Items */}
				<div className="fw-bold px-2 pb-4">
					<span className="nav-item-title">{appNav[1].section}</span>
					<div className="nav flex-column gap-2">
						{appNav[1].items.map((item) => {							
							const isLogout = item.label === "Cerrar sesión";

							return (
								<NavLink
									key={item.path}
									to={item.path} 
									end={item.path === "/app"}
									onClick={isLogout ? handleLogout : null} // logout, ejecuta la alerta
									className={({ isActive }) => 
										`btn d-flex align-items-center gap-2 py-1 logout-hover-effect ${isActive && !isLogout ? "active" : ""}`
									}
								>
									<i className={`bi ${item.icon}`}></i>
									<span className="nav-item">{item.label}</span>
								</NavLink>
							)
						})}						
					</div>
				</div>
				{/* <div className="nav flex-column gap-2">
					<div className="fw-bold px-2">
						<span className="nav-item-title">Navegacion</span>

						<NavLink to="/app" end className="btn d-flex align-items-center gap-2 py-1">
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

						<NavLink to="/app/descubre" className="btn d-flex align-items-center gap-2">
							<i className="bi bi-search"></i>
							<span clasName="nav-item">Descubre</span>
						</NavLink>
					</div>
				</div> */}

				{/* Setting Items */}
				{/* <div className="nav flex-column gap-2 pb-2">
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
				</div> */}
			</div>
		</nav>
	);
};

