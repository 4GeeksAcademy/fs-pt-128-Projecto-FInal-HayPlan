import { useEffect, useState } from "react"
import { getAllGroups, getUser } from "../services/backEndServices"
import { GroupsCard } from "../components/GroupsCard"
import { useNavigate } from "react-router-dom"

export const Groups = () => {

    const navigate = useNavigate()

    const [loadingPage, setLoadingPage] = useState(true)
    const [user, setUser] = useState(null)
    const [groups, setGroups] = useState([])

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

    const getInfo = async () => {
        const responseGroups = await getAllGroups()
        setGroups(responseGroups)
        console.log(responseGroups);
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
        if (user) {
            getInfo()
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

                <div className="card border-0 rounded-4 dashBoard-card-medium-container">
                    <div className="card-body px-2 py-0 p-md-3 px-md-1">

                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-uppercase small fw-semibold">
                            Mis Grupos
                        </span>
                        {/* <button className="btn btn-sm rounded-pill px-3 text-light border">
                            Nuevo grupo
                        </button> */}
                    </div>

                    {groups.length === 0 ? (
                        <div className="empty-state">
                            <h2>Aún no tienes grupos</h2>
                            <p>Crea un grupo para empezar a organizar planes con tus amigos.</p>

                            <button className="create-group-btn">
                                Crear grupo
                            </button>
                        </div>
                    ) : (
                        <div className="row">
                            {groups.map(group => 
                                <GroupsCard key={group.id} group={group} />)}
                        </div>
                    )}
                    </div>
                </div>
            )}
        </>
    )
}