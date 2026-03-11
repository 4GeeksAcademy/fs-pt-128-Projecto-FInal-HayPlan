import React, { useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { DashboardBlockSmall } from "../components/DashboardBlockSmall.jsx"
import { DashboardBlockLarge } from "../components/DashboardBlockLarge.jsx"
import { DashboardBlockMedium } from "../components/DashboardBlockMedium.jsx"
import { HallOfFame } from "../components/HallOfFame.jsx"

export const Grupos = () => {

	//Testing modes: "loading" | "empty" | "normal" | "stress"
	const [testMode] = useState("stress")

	const normalPlans = [
		{
			id: 1,
			title: "Game night en Tripping Animals",
			description: "Noche de juegos y cervezas",
			group_id: 1,
			organizer_id: 1,
			organizer_username: "Pedro",
			status: "votacion",
			location: "Tripping Animals Brewery",
			date: "2026-03-22T20:00:00",
			created_at: "2026-03-10T10:00:00",
			rating: null,
			rating_count: 0
		},
		{
			id: 2,
			title: "Viaje a Barcelona",
			description: "Planificando vuelos y estadía",
			group_id: 1,
			organizer_id: 2,
			organizer_username: "Sofia",
			status: "confirmado",
			location: "Barcelona",
			date: "2026-04-15T09:00:00",
			created_at: "2026-03-09T14:30:00",
			rating: 4.8,
			rating_count: 12
		},
		{
			id: 3,
			title: "Nuevo bar",
			description: "Ir a conocer el sitio nuevo",
			group_id: 2,
			organizer_id: 1,
			organizer_username: "Pedro",
			status: "cerrado",
			location: "Downtown",
			date: "2026-02-22T21:00:00",
			created_at: "2026-02-18T18:00:00",
			rating: 4.2,
			rating_count: 7
		},
		{
			id: 4,
			title: "Brunch del domingo",
			description: "Brunch relax con el grupo",
			group_id: 2,
			organizer_id: 3,
			organizer_username: "Ana",
			status: "activo",
			location: "Las Olas",
			date: "2026-03-16T11:30:00",
			created_at: "2026-03-08T09:00:00",
			rating: null,
			rating_count: 0
		},
		{
			id: 5,
			title: "Beach day",
			description: "Día de playa y picnic",
			group_id: 3,
			organizer_id: 4,
			organizer_username: "Luis",
			status: "propuesta",
			location: "Fort Lauderdale Beach",
			date: "2026-03-29T12:00:00",
			created_at: "2026-03-10T08:15:00",
			rating: null,
			rating_count: 0
		}
	];

	const stressPlans = [
		...normalPlans,
		{
			id: 6,
			title: "Cena italiana",
			description: "Reserva para 8 personas",
			group_id: 1,
			organizer_id: 2,
			organizer_username: "Sofia",
			status: "votacion",
			location: "Miami",
			date: "2026-03-18T19:30:00",
			created_at: "2026-03-10T11:15:00",
			rating: null,
			rating_count: 0
		},
		{
			id: 7,
			title: "Escape room",
			description: "Competencia entre equipos",
			group_id: 2,
			organizer_id: 3,
			organizer_username: "Ana",
			status: "confirmado",
			location: "Boca Raton",
			date: "2026-03-25T18:00:00",
			created_at: "2026-03-07T16:00:00",
			rating: 4.6,
			rating_count: 9
		},
		{
			id: 8,
			title: "Movie night",
			description: "Cine + comida",
			group_id: 3,
			organizer_id: 4,
			organizer_username: "Luis",
			status: "cerrado",
			location: "Aventura",
			date: "2026-02-10T20:00:00",
			created_at: "2026-02-01T13:00:00",
			rating: 4.9,
			rating_count: 15
		},
		{
			id: 9,
			title: "Padel Saturday",
			description: "Reservar cancha",
			group_id: 1,
			organizer_id: 1,
			organizer_username: "Pedro",
			status: "activo",
			location: "Fort Lauderdale",
			date: "2026-03-14T10:00:00",
			created_at: "2026-03-05T12:30:00",
			rating: null,
			rating_count: 0
		},
		{
			id: 10,
			title: "Road trip a Orlando",
			description: "Fin de semana fuera",
			group_id: 2,
			organizer_id: 3,
			organizer_username: "Ana",
			status: "propuesta",
			location: "Orlando",
			date: "2026-04-02T07:00:00",
			created_at: "2026-03-10T07:45:00",
			rating: null,
			rating_count: 0
		}
	];

	const plans = 
		testMode == "empty" ? [] 
		: testMode == "stress" ? stressPlans
		: testMode == "loading" ? []
		: normalPlans;

	const isLoading = testMode === "loading"

	// ------- Data -------

	// ====== Estadisticas para small blocks ======
	// cantidad total de planes
	const totalPlans = plans.length

	// planes pendientes segun status
	const pendingPlans = plans.filter(
		(plan) => plan.status === "propuesta" || plan.status === "votacion"
	).length

	// planes activos segun status 
	const activePlans = plans.filter(
		(plan) => plan.status === "activo" || plan.status === "confirmado"
	).length

	// planes ue han sido clasificados
	const ratedPlans = plans.filter(
		(plan) => typeof plan.rating === "number"
	)

	// Average de planes clasificados
	const averageRating = ratedPlans.length === 0 ? null
		: Math.floor(
			ratedPlans.reduce((sum, plan) => sum + plan.rating, 0) / ratedPlans.length
		)
		
	
	// // ====== Informacion para Large & Medium Block ======

	const upcomingPLans = [...plans].filter(
		(plan) => plan.status !== "cerrado").sort((earlierPlan, laterPlan) =>{
			const earlierDate = new Date(earlierPlan.date)
			const laterDate = new Date(laterPlan.date)

			return earlierDate - laterDate
		})

	const featuredPlan = upcomingPLans.length > 0 ? upcomingPLans[0] : null

		// mejorar logica para solo mostrar eventos que vienen pronto, no los que ya pasaron. 
	const recentPlans = [...plans].sort((newerPlan, olderPlan) => {
		const newerDate = new Date(newerPlan.created_at)
		const olderDate = new Date(olderPlan.created_at)

		return newerDate - olderDate
	}).slice(0,3)

	const hallOfFamePlans = [...plans].filter(
		(plan) => plan.status === "cerrado" && typeof plan.rating === "number"
	).sort((higherRatedPlan, lowerRatingPlan) => {
		return lowerRatingPlan.rating - higherRatedPlan.rating
	}).slice(0,3)

	console.log("testMode", testMode);
	console.log("plans", plans)
	console.log("featuredPlan:", featuredPlan)
	console.log("recentPlans:", recentPlans);
	console.log("hallOfFamePlans:", hallOfFamePlans)
	
	return (
		<>
			<DashboardBlockSmall 
				totalPlans={totalPlans}
				pendingPlans={pendingPlans}
				activePlans={activePlans}
				averageRating={averageRating}
			/>
			<DashboardBlockLarge 
				featuredPlan={featuredPlan} 
			/>
			<div className="row">
				<div className="col-12 col-md-6 mb-3 mb-lg-0">
					<DashboardBlockMedium 
						recentPlans={recentPlans}
					/>
				</div>
				<div className="col-12 col-md-6">
					<HallOfFame 
						hallOfFamePlans={hallOfFamePlans}
					/>
				</div>
			</div>
		</>
	);
}; 