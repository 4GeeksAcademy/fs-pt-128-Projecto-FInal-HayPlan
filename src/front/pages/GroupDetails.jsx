
import { useNavigate, useParams } from "react-router-dom";
import { GroupInfoCard } from "../components/detalle-de-grupo/GroupInfoCard.jsx";
import { MemberListCard } from "../components/detalle-de-grupo/MemberListCard.jsx";
import { StatsRow } from "../components/detalle-de-grupo/StatsRow.jsx";
import { HallOfFame } from "../components/HallOfFame.jsx";
import { useEffect, useState } from "react";
import { getGroup, getGroupMembers, getGroupPlans, getTopPlans, getUser } from "../services/backEndServices.jsx";
import { PendingInvitesCard } from "../components/detalle-de-grupo/PendingMembersCard.jsx";

export const GroupDetails = () => {
	const navigate = useNavigate()
	const { group_id } = useParams()

	const [user, setUser] = useState(null)
	const [loadingPage, setLoadingPage] = useState(true)
	const [group, setGroup] = useState(null)
	const [members, setMembers] = useState([])
	const [topPlans, setTopPlans] = useState([])
	const [admin, setAdmin] = useState(false)

	const checkToken = async () => {
		const response = await getUser()

		if (response) {
			setUser(response)
			// setLoadingPage(false)
		}
		else {
			localStorage.removeItem("token")
			navigate("/")
		}
	}

	const getInfo = async () => {
		const responseGroup = await getGroup(group_id)
		setGroup(responseGroup)
		if (user?.id === group?.admin_id) {
			setAdmin(true)
		}

		const responseMembers = await getGroupMembers(group_id)
		setMembers(responseMembers)

		const responseGroupPlans = await getGroupPlans(group_id)
		const responseTopPlans = await getTopPlans(group_id)

		if (responseTopPlans.length > 0) {
			setTopPlans(responseTopPlans.slice(0, 3))
		} else {
			const upcomingPlans = responseGroupPlans
				.filter(plan => new Date(plan.date) > new Date())
				.sort((a, b) => new Date(a.date) - new Date(b.date))

			setTopPlans(upcomingPlans.slice(0, 3))
		}

		setLoadingPage(false)
	}

	useEffect(() => {
		if (!localStorage.getItem("token")) {
			setTimeout(() => {
				navigate("/")
			}, 1000)
		} else {
			checkToken()
		}
	}, [])
	useEffect(() => {
		if (group_id) {
			getInfo()
		}
	}, [group_id])

	return (
		<>
			{loadingPage || !group ? (
				<div className="d-flex justify-content-center align-items-center vh-100">
					<div className="spinner-border" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				</div>
			) : (
				<>
					<button onClick={() => navigate(-1)} className="btn btn-link text-white p-0 me-3 border-0 shadow-none" style={{ textDecoration: 'none' }}>
						<span style={{ fontSize: '1.5rem' }}>←</span>
					</button>
					<div className="row">

						<div className="col-12 col-md-6 mb-3 mb-lg-0 px-1">
							<GroupInfoCard
								group={group}
								memberCount={members.length}
							/>
							<StatsRow
								memberCount={members.length}
								// TODO: replace with real group.created_at when backend adds it
								createdAt={"2024-01-10"}
							/>
						</div>

						<div className="col-12 col-md-6 mb-3 mb-lg-0 px-1">
							<div className="card border-0 rounded-4 dashBoard-card-medium-container">
								<MemberListCard members={members} admin={admin} group={group} />
							</div>
						</div>
					</div>

					<div className="d-flex flex-column gap-2 px-md-2 mt-3">
						<PendingInvitesCard />
					</div>
				</>
			)}
		</>
	)
}; 