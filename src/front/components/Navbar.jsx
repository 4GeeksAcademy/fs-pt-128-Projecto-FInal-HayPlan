import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";


export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			{/* posicion vertical altura 100% */}
			<div className="d-flex justify-content-between flex-column vh-100 px-3 py-0">

				{/* Logo */}
				<div className="mb-4 h-10">
					<a class="navbar-brand" href="#">
						<img src={logo} alt="Bootstrap" style={{ width: "100px" }} />
					</a>
				</div>

				{/* Navigation Items */}
				<div className="nav nav-pills flex-column gap-4" style={{ height: "350px" }}>
					<div className="fw-bold">Navegacion</div>

					<Link to="/" className="fw-semibold mb-0 text-decoration-none text-dark">
						Inicio
					</Link>
					<Link to="/" className="fw-semibold mb-0 text-decoration-none text-dark">
						Planes
					</Link>
					<Link to="/" className="fw-semibold mb-0 text-decoration-none text-dark">
						Stats
					</Link>
					<Link to="/" className="fw-semibold mb-0 text-decoration-none text-dark">
						Hay Planes?
					</Link>
				</div>

				{/* Setting Items */}
				<div className="nav nav-pills flex-column gap-3 pb-5">
					<div className="fw-bold">Settings</div>
					<Link to="/" className="fw-semibold mb-0 text-decoration-none text-dark">
						Perfil
					</Link>
					<Link to="/" className="fw-semibold mb-0 text-decoration-none text-dark">
						Ayuda
					</Link>
					<Link to="/" className="fw-semibold mb-0 text-decoration-none text-dark">
						Rate
					</Link>
				</div>

			</div>
		</nav>
	);
};