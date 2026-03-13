import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAllGroups, getAllPlans, getUser } from "../services/backEndServices"
import concertImg1 from "../assets/img/discover/discover_concert_1.jpg"
import concertImg2 from "../assets/img/discover/discover_concert_2.jpg"
import friendsImg1 from "../assets/img/discover/discover_friends_1.jpg"
import friendsImg2 from "../assets/img/discover/discover_friends_2.jpg"
import friendsImg3 from "../assets/img/discover/discover_friends_3.jpg"
import museumImg1 from "../assets/img/discover/discover_museum_1.jpg"
import museumImg2 from "../assets/img/discover/discover_museum_2.jpg"
import natureImg1 from "../assets/img/discover/discover_nature_1.jpg"
import natureImg2 from "../assets/img/discover/discover_nature_2.jpg"
import sportsImg1 from "../assets/img/discover/discover_sports_1.jpg"
import sportsImg2 from "../assets/img/discover/discover_sports_2.jpg"

export const Dashboard = () => {

  const navigate = useNavigate()

  const [loadingPage, setLoadingPage] = useState(true)
  const [user, setUser] = useState(null)
  const [nextPlans, setNextPlans] = useState([])
  const [closePlan, setClosePlan] = useState("")
  const [groups, setGroups] = useState([])
  const [currentImage, setCurrentImage] = useState(0)

  const discoverImages = [
    concertImg1, friendsImg1, museumImg1, natureImg1, sportsImg1, concertImg2, friendsImg2, museumImg2, natureImg2, sportsImg2, friendsImg3
  ]

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
    const responsePlans = await getAllPlans()
    const sortedPlans = responsePlans
      .filter(plan => new Date(plan.date) > new Date())
      .sort((a, b) => new Date(a.date) - new Date(b.date))
    // console.log(sortedPlans)
    setNextPlans(sortedPlans)

    if (sortedPlans.length > 0) {
      setClosePlan(closeDateFormat(sortedPlans[0].date))
    } else {
      setClosePlan("")
    }

    const responseGroups = await getAllGroups()
    setGroups(responseGroups)
  }

  const planDateFormat = (dateString) => {
    const date = new Date(dateString)
    let formatDate = date.toLocaleDateString("es-ES", {
      weekday: "short",
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit"
    })
    let formatDateSplit = formatDate.replace(",", "")
    let formatDatePoint = formatDateSplit.replace(",", " ·")
    let formatDateUpper = formatDatePoint
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
    return formatDateUpper
  }

  const closeDateFormat = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()

    const difference = date - now
    const secDifference = Math.floor(difference / 1000)
    const minDifference = Math.floor(secDifference / 60)
    const hourDifference = Math.floor(minDifference / 60)
    const dayDifference = Math.floor(hourDifference / 24)
    const weekDifference = Math.floor(dayDifference / 7)

    if (hourDifference < 1) return `en ${minDifference} minuto${minDifference == 1 ? "" : "s"}`
    if (dayDifference < 1) return `en ${hourDifference} hora${hourDifference == 1 ? "" : "s"}`
    if (weekDifference < 1) return `en ${dayDifference} día${dayDifference == 1 ? "" : "s"}`
    if (weekDifference >= 1) return `en ${weekDifference} semana${weekDifference == 1 ? "" : "s"}`
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

  useEffect(()=> {
    getInfo()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % discoverImages.length)
    }, 10000)

    return () => clearInterval(interval)
  }, [])


  return (
    <>
      {loadingPage ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="container-fluid py-3 px-3 px-lg-4">
          {/* Header */}
          <h2 className="mb-4">Hola, {user.username}!</h2>
          <div className="rounded-4 p-3 border d-flex justify-content-around align-items-center gap-2">
            <div>
              <i className="fa-solid fa-user-group"></i> <strong>{groups.length} grupo{groups.length == 1 ? "" : "s"}</strong> <span className="text-secondary">en total</span>
            </div>

            <div>
              <i className="fa-solid fa-calendar"></i> <strong>Próximo plan</strong> <span className="text-secondary">{closePlan}</span>
            </div>

            <div>
              <i className="fa-solid fa-bolt"></i> <strong>Asistencia media:</strong> <span className="text-secondary">87%</span>
            </div>
          </div>

          {/* Body */}
          <div className="my-2 row g-3">
            <div className="col-12 col-lg-4">
              <div className="dashBoard-card-large rounded-4 p-4 h-100">
                <div className="dashBoard-card-large-border"></div>
                <h5 className="">Acciones pendientes</h5>
              </div>
            </div>
            <div className="col-12 col-lg-8">
              <div className="dashBoard-card-large rounded-4 p-4 h-100">
                <div className="dashBoard-card-large-border"></div>
                <h5 className="">Próximos planes</h5>
                <div className="d-flex flex-column gap-3">
                  {
                    nextPlans.slice(0, 3).map(plan => {
                      return (
                        <div
                          key={plan.id}
                          className="dashBoard-card-medium-item rounded-4 p-3"
                        >
                          <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap">
                            <div>
                              <h5 className="mb-1">{plan.title}</h5>
                              <p className="mb-1 text-secondary">{plan.groupName}</p>
                              <small className="text-secondary">
                                {planDateFormat(plan.date)}
                                {plan.location ? ` · ${plan.location}` : ""}
                              </small>
                            </div>

                            <div className="d-flex flex-column align-items-end gap-2">
                              <span className="badge rounded-pill bg-success">
                                {plan.status}
                              </span>
                              <button className="btn btn-sm btn-outline-light rounded-pill px-3">
                                Ver plan
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
                <div className="mt-3 text-end">
                  <button className="btn btn-sm btn-outline-light rounded-pill px-3 mx-3">
                    Ver todos
                  </button>
                </div>

              </div>
            </div>
          </div>
          {/* Discover */}
          <div className="dashBoard-card-large rounded-4 overflow-hidden border px-0 mt-3">
            <div className="row g-0 align-items-stretch">
              <div className="col-12 col-lg-4">
                <div className="h-100">
                  <img
                    src={discoverImages[currentImage]}
                    alt="Descubre planes"
                    className="w-100 h-100 discover-image"
                  />
                </div>
              </div>

              <div className="col-12 col-lg-8">
                <div className="p-4 p-lg-5 h-100 d-flex flex-column justify-content-center">
                  <h2 className="mb-3">Descubre ideas para planes</h2>
                  <p className="mb-2 text-secondary">
                    Encuentra eventos, sitios y propuestas para tu próximo plan con amigos.
                  </p>
                  <div>
                    <button className="btn btn-warning rounded-pill px-4 py-2 fw-bold">
                      Explorar eventos
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}