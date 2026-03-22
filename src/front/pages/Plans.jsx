import { useEffect, useState } from "react"
import { getAllPlans, getUser, getGroupMembers } from "../services/backEndServices"
import { PlansCard } from "../components/PlansCard"
import { useNavigate } from "react-router-dom"

export const Plans = () => {

    const navigate = useNavigate()

    const [loadingPage, setLoadingPage] = useState(true)
    const [user, setUser] = useState(null)
    const [allPlans, setAllPlans] = useState([])
    const [nextPlans, setNextPlans] = useState([])
    const [myPlans, setMyPlans] = useState([])
    const [proposalPlans, setProposalPlans] = useState([])
    const [votePlans, setVotePlans] = useState([])
    const [confirmedPlans, setConfirmedPlans] = useState([])
    const [activePlans, setActivePlans] = useState([])
    const [closedPlans, setClosedPlans] = useState([])

    const getInfo = async () => {
    try {
        const responsePlans = await getAllPlans()
        const plans = Array.isArray(responsePlans) ? responsePlans : []

        setAllPlans(plans)

        const sortedMyPlans = plans.filter(plan => plan.organizer_id === user?.id)
        setMyPlans(sortedMyPlans)

        const sortedProposalPlans = plans.filter(plan => plan.status === "propuesta")
        setProposalPlans(sortedProposalPlans)

        const sortedVotePlans = plans.filter(plan => plan.status === "votacion")
        setVotePlans(sortedVotePlans)

        const sortedConfirmedPlans = plans.filter(plan => plan.status === "confirmado")
        setConfirmedPlans(sortedConfirmedPlans)

        const sortedActivePlans = plans.filter(plan => plan.status === "activo")
        setActivePlans(sortedActivePlans)

        const sortedClosedPlans = plans.filter(plan => plan.status === "cerrado")
        setClosedPlans(sortedClosedPlans)

        const sortedNextPlans = plans
            .filter(plan => new Date(plan.date) > new Date())
            .sort((a, b) => new Date(a.date) - new Date(b.date))
        setNextPlans(sortedNextPlans)

    } catch (error) {
        console.error("Error loading plans:", error)

        setAllPlans([])
        setNextPlans([])
        setMyPlans([])
        setProposalPlans([])
        setVotePlans([])
        setConfirmedPlans([])
        setActivePlans([])
        setClosedPlans([])
    } finally {
        setLoadingPage(false)
    }
}

    const checkToken = async () => {
        const response = await getUser()
        if (response) {
            setUser(response)
            console.log(response);
        }
        else {
            localStorage.removeItem("token")
            navigate("/")
        }
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
        if (user) {
            getInfo()
            // setLoadingPage(false)
        }
    }, [user])

    const renderPlansGrid = (plans) => {
        if (plans.length < 1) {
            return (
                <div className="text-white-50 py-4">
                    No hay planes que mostrar
                </div>
            )
        }

        return (
            <div className="row g-4 mt-1">
                {plans.map((plan) => (
                    <div key={plan.id} className="col-12 col-md-6 col-xl-4">
                        <PlansCard
                            plan={plan}
                            user={user}
                        />
                    </div>
                ))}
            </div>
        )
    }

    return (
        <>
            {loadingPage ? (
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="container py-0">
                    <div className="d-flex  flex-lg-row justify-content-between align-items-start align-items-lg-center gap-3 mb-4">
                        <h2 className="text-white m-0">Planes</h2>

                        <button
                            className="btn btn-warning rounded-pill px-4 py-2 fw-semibold text-uppercase"
                            onClick={() => navigate("/app/plans/create-plan")}
                        >
                            Crear plan
                        </button>
                    </div>
                    {allPlans.length === 0 ? (
                        <div className="empty-state text-center mt-5">
                            <h2 className="text-white">Aún no tienes planes</h2>
                            <p className="text-secondary">
                                Crea tu primer plan para empezar a organizar salidas, eventos y reuniones.
                            </p>
                            <button
                                className="btn btn-warning btn-lg rounded-pill px-5 fw-bold mt-3 shadow-sm"
                                onClick={() => navigate("/app/plans/create-plan")}
                            >
                                Crear plan
                            </button>
                        </div>
                    ) : (
                        <>
                            <nav className="d-flex justify-content-center mb-0">
                                <div
                                    className="nav nav-pills gap-2 flex-wrap pb-2 justify-content-center"
                                    id="nav-tab"
                                    role="tablist"
                                >
                                    <button className="nav-link btn btn-sm btn-outline-light rounded-pill px-3 active" id="nav-all-tab" data-bs-toggle="tab" data-bs-target="#nav-all" type="button" role="tab" aria-controls="nav-all" aria-selected="true">Todos</button>
                                    <button className="nav-link btn btn-sm btn-outline-light rounded-pill px-3" id="nav-next-tab" data-bs-toggle="tab" data-bs-target="#nav-next" type="button" role="tab" aria-controls="nav-next" aria-selected="false">Próximos</button>
                                    <button className="nav-link btn btn-sm btn-outline-light rounded-pill px-3" id="nav-my-tab" data-bs-toggle="tab" data-bs-target="#nav-my" type="button" role="tab" aria-controls="nav-my" aria-selected="false">Mis Planes</button>
                                    <button className="nav-link btn btn-sm btn-outline-light rounded-pill px-3" id="nav-proposal-tab" data-bs-toggle="tab" data-bs-target="#nav-proposal" type="button" role="tab" aria-controls="nav-proposal" aria-selected="false">Propuestos</button>
                                    <button className="nav-link btn btn-sm btn-outline-light rounded-pill px-3" id="nav-vote-tab" data-bs-toggle="tab" data-bs-target="#nav-vote" type="button" role="tab" aria-controls="nav-vote" aria-selected="false">En Votación</button>
                                    <button className="nav-link btn btn-sm btn-outline-light rounded-pill px-3" id="nav-confirmed-tab" data-bs-toggle="tab" data-bs-target="#nav-confirmed" type="button" role="tab" aria-controls="nav-confirmed" aria-selected="false">Confirmados</button>
                                    <button className="nav-link btn btn-sm btn-outline-light rounded-pill px-3" id="nav-active-tab" data-bs-toggle="tab" data-bs-target="#nav-active" type="button" role="tab" aria-controls="nav-active" aria-selected="false">Activos</button>
                                    <button className="nav-link btn btn-sm btn-outline-light rounded-pill px-3" id="nav-closed-tab" data-bs-toggle="tab" data-bs-target="#nav-closed" type="button" role="tab" aria-controls="nav-closed" aria-selected="false">Cerrados</button>
                                </div>
                            </nav>

                            <div className="tab-content" id="nav-tabContent">
                                <div className="tab-pane fade show active" id="nav-all" role="tabpanel" aria-labelledby="nav-all-tab" tabIndex="0">
                                    {renderPlansGrid(allPlans)}
                                </div>

                                <div className="tab-pane fade" id="nav-next" role="tabpanel" aria-labelledby="nav-next-tab" tabIndex="0">
                                    {renderPlansGrid(nextPlans)}
                                </div>

                                <div className="tab-pane fade" id="nav-my" role="tabpanel" aria-labelledby="nav-my-tab" tabIndex="0">
                                    {renderPlansGrid(myPlans)}
                                </div>

                                <div className="tab-pane fade" id="nav-proposal" role="tabpanel" aria-labelledby="nav-proposal-tab" tabIndex="0">
                                    {renderPlansGrid(proposalPlans)}
                                </div>

                                <div className="tab-pane fade" id="nav-vote" role="tabpanel" aria-labelledby="nav-vote-tab" tabIndex="0">
                                    {renderPlansGrid(votePlans)}
                                </div>

                                <div className="tab-pane fade" id="nav-confirmed" role="tabpanel" aria-labelledby="nav-confirmed-tab" tabIndex="0">
                                    {renderPlansGrid(confirmedPlans)}
                                </div>

                                <div className="tab-pane fade" id="nav-active" role="tabpanel" aria-labelledby="nav-active-tab" tabIndex="0">
                                    {renderPlansGrid(activePlans)}
                                </div>

                                <div className="tab-pane fade" id="nav-closed" role="tabpanel" aria-labelledby="nav-closed-tab" tabIndex="0">
                                    {renderPlansGrid(closedPlans)}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    )
}
