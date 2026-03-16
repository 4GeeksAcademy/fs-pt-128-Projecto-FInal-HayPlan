import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { DashboardBlockSmall } from "../components/DashboardBlockSmall.jsx"
import { DashboardBlockLarge } from "../components/DashboardBlockLarge.jsx"
import { DashboardBlockMedium } from "../components/DashboardBlockMedium.jsx"
import { HallOfFame } from "../components/HallOfFame.jsx"

export const Group = () => {

	return (
		<>
			<p>Pagina de GRUPO INDIVIDUAL - agregar btn crear grupo & unirse con codigo.</p>
			<p>Agregar nueva vista modular de grupos</p>
			<DashboardBlockLarge />
			<div className="row">
				<div className="col-12 col-md-6 mb-3 mb-lg-0">
					<DashboardBlockMedium />
				</div>
				<div className="col-12 col-md-6">
					<HallOfFame />
				</div>
			</div>
		</>
	);
}; 