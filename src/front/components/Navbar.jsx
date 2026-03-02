import { Link } from "react-router-dom";
import iconLogoColor from "../assets/img/iconLogo-Color.png";
import iconLogo from "../assets/img/iconLogo.png";




export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			{/* posicion vertical altura 100% */}
			<div className="d-flex justify-content-between flex-column vh-100 px-3 py-0 ">

				{/* Logo */}
				<div className="">
					<a className="navbar-brand m-0" href="#">
						<img src={iconLogoColor} alt="Bootstrap" style={{ width: "150px" }} />
					</a>
				</div>

				{/* Navigation Items */}
				<div className="nav nav-pills flex-column gap-2" style={{ height: "350px" }}>
					<div className="fw-bold px-3 mb-2">Navegacion</div>
					<Link
						to="/"
						className="nav-link text-dark d-flex align-items-center gap-2"
					>
						<i class="bi bi-border-style fs-4"></i>
						<span>Inicio</span>
					</Link>
					<Link
						to="/"
						className="nav-link text-dark d-flex align-items-center gap-2"
					>
						<img src={iconLogo} width="30" height="30" />
						<span>Planes</span>

					</Link>
					<Link
						to="/"
						className="nav-link text-dark d-flex align-items-center gap-2"
					>
						<i class="bi bi-people fs-4"></i>
						<span>Grupos</span>
					</Link>
					<Link
						to="/"
						className="nav-link text-dark d-flex align-items-center gap-2"
					>
						<i className="bi bi-bar-chart fs-4"></i>
						<span>Stats</span>
					</Link>
					<Link
						to="/"
						className="nav-link text-dark d-flex align-items-center gap-2"
					>
						<i class="bi bi-search fs-5"></i>
						<span>Descubre</span>
					</Link>
				</div>

				{/* Setting Items */}
				<div className="nav nav-pills flex-column gap-2 pb-5">
					<div className="fw-bold px-3 mb-2">Settings</div>
					<Link 
						to="/" 
						className="nav-link text-dark d-flex align-items-center gap-2"
					>
						<i class="bi bi-person-circle"></i>
						<span>Perfil</span>
					</Link>
					<Link 
						to="/" 
						className="nav-link text-dark d-flex align-items-center gap-2"
					>
						<i class="bi bi-info-circle"></i>
						<span>Ayuda</span>
					</Link>
					<Link 
						to="/" 
						className="nav-link text-dark d-flex align-items-center gap-2"
					>
						<i class="bi bi-star-half"></i>
						<span>Rate</span>
					</Link>
				</div>

			</div>
		</nav>
	);
};