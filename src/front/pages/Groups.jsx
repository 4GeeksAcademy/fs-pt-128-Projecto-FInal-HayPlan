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
                        <div className="container">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h2 className="text-white">Mis grupos</h2>
                                {groups.length > 0 && (
                                    <button
                                        className="btn btn-warning rounded-pill px-4 fw-bold shadow-sm"
                                        onClick={() => navigate("/app/groups/create-group")}
                                    >
                                        + Nuevo Grupo
                                    </button>
                                )}
                            </div>

                            {groups.length === 0 ? (
                                <div className="empty-state text-center mt-5">
                                    <h2 className="text-white">Aún no tienes grupos</h2>
                                    <p className="text-secondary">Crea un grupo para empezar a organizar planes con tus amigos.</p>
                                    {/* Aplicado estilo de la imagen al botón central */}
                                    <button
                                        className="btn btn-warning btn-lg rounded-pill px-5 fw-bold mt-3 shadow-sm"
                                        onClick={() => navigate("/app/groups/create-group")}
                                    >
                                        + Crear grupo
                                    </button>
                                </div>
                            ) : (
                                <div className="row px-md-3">
                                    {groups.map(group =>
                                        <GroupsCard key={group.id} group={group} />)}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

