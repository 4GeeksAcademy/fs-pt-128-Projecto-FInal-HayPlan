import { useEffect, useState } from "react"
import { getAllPlans, getUser } from "../services/backEndServices"
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
        const responsePlans = await getAllPlans()
        setAllPlans(responsePlans)
        const sortedMyPlans = responsePlans.filter(plan => plan.organizer_id == user?.id)
        setMyPlans(sortedMyPlans)
        const sortedProposalPlans = responsePlans.filter(plan => plan.status === "propuesta")
        setProposalPlans(sortedProposalPlans)
        const sortedVotePlans = responsePlans.filter(plan => plan.status === "votacion")
        setVotePlans(sortedVotePlans)
        const sortedConfirmedPlans = responsePlans.filter(plan => plan.status === "confirmado")
        setConfirmedPlans(sortedConfirmedPlans)
        const sortedActivePlans = responsePlans.filter(plan => plan.status === "activo")
        setActivePlans(sortedActivePlans)
        const sortedClosedPlans = responsePlans.filter(plan => plan.status === "cerrado")
        setClosedPlans(sortedClosedPlans)
        const sortedNextPlans = responsePlans
            .filter(plan => new Date(plan.date) > new Date())
            .sort((a, b) => new Date(a.date) - new Date(b.date))
        setNextPlans(sortedNextPlans)
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
            setLoadingPage(false)
        }
    }, [user])

    return (
        <>
            {loadingPage ? (
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="container">
                    <nav>
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <button className="nav-link active" id="nav-all-tab" data-bs-toggle="tab" data-bs-target="#nav-all" type="button" role="tab" aria-controls="nav-all" aria-selected="true">Todos</button>
                            <button className="nav-link" id="nav-next-tab" data-bs-toggle="tab" data-bs-target="#nav-next" type="button" role="tab" aria-controls="nav-next" aria-selected="false">Proximos</button>
                            <button className="nav-link" id="nav-my-tab" data-bs-toggle="tab" data-bs-target="#nav-my" type="button" role="tab" aria-controls="nav-my" aria-selected="false">Mis Planes</button>
                            <button className="nav-link" id="nav-proposal-tab" data-bs-toggle="tab" data-bs-target="#nav-proposal" type="button" role="tab" aria-controls="nav-proposal" aria-selected="false">Propuestos</button>
                            <button className="nav-link" id="nav-vote-tab" data-bs-toggle="tab" data-bs-target="#nav-vote" type="button" role="tab" aria-controls="nav-vote" aria-selected="false">En Votación</button>
                            <button className="nav-link" id="nav-confirmed-tab" data-bs-toggle="tab" data-bs-target="#nav-confirmed" type="button" role="tab" aria-controls="nav-confirmed" aria-selected="false">Confirmados</button>
                            <button className="nav-link" id="nav-active-tab" data-bs-toggle="tab" data-bs-target="#nav-active" type="button" role="tab" aria-controls="nav-active" aria-selected="false">Activos</button>
                            <button className="nav-link" id="nav-closed-tab" data-bs-toggle="tab" data-bs-target="#nav-closed" type="button" role="tab" aria-controls="nav-closed" aria-selected="false">Cerrados</button>
                        </div>
                    </nav>
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-all" role="tabpanel" aria-labelledby="nav-all-tab" tabIndex="0">
                            {allPlans.length < 1 ? "No hay planes que mostrar" : allPlans.map((plan) => <PlansCard key={plan.id} plan={plan} />)}
                        </div>
                        <div className="tab-pane fade" id="nav-next" role="tabpanel" aria-labelledby="nav-next-tab" tabIndex="0">
                            {nextPlans.length < 1 ? "No hay planes que mostrar" : nextPlans.map((plan) => <PlansCard key={plan.id} plan={plan} />)}
                        </div>
                        <div className="tab-pane fade" id="nav-my" role="tabpanel" aria-labelledby="nav-my-tab" tabIndex="0">
                            {myPlans.length < 1 ? "No hay planes que mostrar" : myPlans.map((plan) => <PlansCard key={plan.id} plan={plan} />)}
                        </div>
                        <div className="tab-pane fade" id="nav-proposal" role="tabpanel" aria-labelledby="nav-proposal-tab" tabIndex="0">
                            {proposalPlans.length < 1 ? "No hay planes que mostrar" : proposalPlans.map((plan) => <PlansCard key={plan.id} plan={plan} />)}
                        </div>
                        <div className="tab-pane fade" id="nav-vote" role="tabpanel" aria-labelledby="nav-vote-tab" tabIndex="0">
                            {votePlans.length < 1 ? "No hay planes que mostrar" : votePlans.map((plan) => <PlansCard key={plan.id} plan={plan} />)}
                        </div>
                        <div className="tab-pane fade" id="nav-confirmed" role="tabpanel" aria-labelledby="nav-confirmed-tab" tabIndex="0">
                            {confirmedPlans.length < 1 ? "No hay planes que mostrar" : confirmedPlans.map((plan) => <PlansCard key={plan.id} plan={plan} />)}
                        </div>
                        <div className="tab-pane fade" id="nav-active" role="tabpanel" aria-labelledby="nav-active-tab" tabIndex="0">
                            {activePlans.length < 1 ? "No hay planes que mostrar" : activePlans.map((plan) => <PlansCard key={plan.id} plan={plan} />)}
                        </div>
                        <div className="tab-pane fade" id="nav-closed" role="tabpanel" aria-labelledby="nav-closed-tab" tabIndex="0">
                            {closedPlans.length < 1 ? "No hay planes que mostrar" : closedPlans.map((plan) => <PlansCard key={plan.id} plan={plan} />)}
                        </div>

                    </div>

                </div>
            )}
        </>
    )
}