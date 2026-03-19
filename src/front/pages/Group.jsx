import React, { useEffect, useState } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { DashboardBlockSmall } from "../components/DashboardBlockSmall.jsx"
import { DashboardBlockLarge } from "../components/DashboardBlockLarge.jsx"
import { DashboardBlockMedium } from "../components/DashboardBlockMedium.jsx"
import { HallOfFame } from "../components/HallOfFame.jsx"
import { useNavigate, useParams } from "react-router-dom";
import { getGroup, getGroupPlans, getTopPlans, getUser } from "../services/backEndServices.jsx";

export const Group = () => {
	const navigate = useNavigate()
	const { group_id } = useParams();

	const [loadingPage, setLoadingPage] = useState(true)
	const [user, setUser] = useState(null)
	const [groupInfo, setGroupInfo] = useState([])
	const [groupPlans, setGroupPlans] = useState([])
	const [closePlan, setClosePlan] = useState([])
	const [topPlans, setTopPlans] = useState([])

	const checkToken = async () => {
		const response = await getUser()
		if (response) {
			setUser(response)
			setLoadingPage(false)
		}
		else {
			localStorage.removeItem("token")
			navigate("/")
		}
	}

	const getInfo = async () => {
		const responseGroupInfo = await getGroup(group_id)
		setGroupInfo(responseGroupInfo)
		const responseGroupPlans = await getGroupPlans(group_id)
		setGroupPlans(responseGroupPlans)
		const sortedPlans = responseGroupPlans
			.filter(plan => new Date(plan.date) > new Date())
			.sort((a, b) => new Date(a.date) - new Date(b.date))
		setClosePlan(sortedPlans[0])
		const responseTopPlans = await getTopPlans(group_id)
		setTopPlans(responseTopPlans.slice(0, 5))
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
		getInfo()
	}, [group_id])

	return (
		<>
			{loadingPage ? (
				<div className="d-flex justify-content-center align-items-center vh-100">
					<div className="spinner-border" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				</div>
			) : (
				<div>
					<div className="d-flex justify-content-between">
						<h1 className="mb-3">{groupInfo.name?.toUpperCase()}</h1>
						<div className="me-2">
							<button 
								className="btn btn-outline-warning rounded-pill px-4 my-3 me-2"
								onClick={() => navigate(`/app/groups/details/${groupInfo.id}`)}	
							>
								Ver mas detalles
							</button>
							<button
								className="btn btn-warning rounded-pill px-4 fw-bold shadow-sm"
								onClick={() => navigate("create-plan")}
							>
								Crear plan
							</button>
						</div>
					</div>
					<DashboardBlockSmall plans={groupPlans} />
					<h5 className="mt-4 text-uppercase small fw-semibold">Próximo plan</h5>
					<DashboardBlockLarge plan={closePlan} />
					<div className="row">
						<div className="col-12 col-xl-6 mb-3 mb-lg-0">
							<div className="card border-0 rounded-4 dashBoard-card-medium-container">
								<div className="card-body px-2 py-0 p-md-3 px-md-1">
									{/* Header */}
									<span className="text-uppercase small fw-semibold">
										Todos los planes
									</span>
									{/* <button className="btn btn-sm rounded-pill px-3">
                        							Ver todos
                    							</button> */}
									<div className="d-flex flex-column gap-2 px-md-2 mt-3">
										{groupPlans.map(plan => <DashboardBlockMedium key={plan.id} plan={plan} user={user} />)}
									</div>
								</div>
							</div>
						</div>
						<div className="col-12 col-xl-6">
							<div className="card border-0 rounded-4 dashBoard-card-medium-container">
								<div className="card-body px-2 py-0 p-md-3 px-md-1">
									{/* Header */}
									<span className="text-uppercase small fw-semibold">
										Hall of Fame
									</span>
									{/* <button className="btn btn-sm rounded-pill px-3">
                        							Ver todos
                    							</button> */}
									<div className="d-flex flex-column gap-2 px-md-2 mt-3">
										{topPlans.map((plan, index) => <HallOfFame key={plan.id} plan={plan} position={index + 1} />)}
									</div>
								</div>
							</div>

						</div>
					</div>
				</div>
			)}
		</>
	);
}; 