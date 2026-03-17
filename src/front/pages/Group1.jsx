
import { useParams } from "react-router-dom";
import { GroupInfoCard } from "../components/detalle-de-grupo/GroupInfoCard.jsx";
import { MemberListCard } from "../components/detalle-de-grupo/MemberListCard.jsx";
import { StatsRow } from "../components/detalle-de-grupo/StatsRow.jsx";
import { HallOfFame } from "../components/HallOfFame.jsx";

export const Group1 = () => {
	// Pagina de GRUPO INDIVIDUAL - agregar btn crear grupo & unirse con codigo

	const { groupId } = useParams()

	const mockGroup = {
		id: groupId,
		name: "Los de Siempre",
		description: "El grupo de siempre para armar planes",
		invite_code: "PLN42X",
		admin_id: 1,
		created_at: "2024-01-10"
	};

	const mockMembers = [
		{ id: 1, username: "Pedro", email: "pedro@email.com" },
		{ id: 2, username: "Cris", email: "cris@email.com" },
		{ id: 3, username: "Ana", email: "ana@email.com" },
		{ id: 4, username: "Luis", email: "luis@email.com" }
	];

	const mockPlans = [
    { id: 1, title: "Game Night", organizer_username: "Pedro" },
    { id: 2, title: "Viaje a Barcelona", organizer_username: "Cris" },
    { id: 3, title: "Nuevo Bar", organizer_username: "Ana" }
];

	return (
		<>
			<div className="row">

				{/* Detalles del grupo */}
				<div className="col-12 col-md-6 mb-3 mb-lg-0 px-1">
					<GroupInfoCard
						group={mockGroup}
						memberCount={mockMembers.length}
					/>
					<StatsRow
						memberCount={mockMembers.length}
						createdAt={mockGroup.created_at}
					/>
					
				</div>

				{/* miembros del grupo */}
				<div className="col-12 col-md-6 mb-3 mb-lg-0 px-1">
					<div className="card border-0 rounded-4 dashBoard-card-medium-container">
						<MemberListCard
							members={mockMembers}
						/>
					</div>
				</div>
			</div>

			<HallOfFame 
						plans={mockPlans}
			/>

			{/* Aceptacion de invitados */}
			{/* falta por serializar */}
			{/* <div className="row">
				<div className="col-12">
					<DashboardBlockMedium />
				</div>
			</div> */}
		</>
	);
}; 