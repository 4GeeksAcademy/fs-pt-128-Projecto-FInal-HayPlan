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

import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getAllGroups, getAllPlans, getUser } from "../services/backEndServices"
import { planDateFormatLarge } from "../functions/planDateFormatLarge"
import { DashboardGrid } from "../components/dashboard/DashboardGrid"
import { DashboardStatCard } from "../components/dashboard/DashboardStatCard"
import { PendingActionsCard } from "../components/dashboard/PendingActionsCard"
import { DiscoverCard } from "../components/dashboard/DiscoverCard"

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

  useEffect(() => {
    if (user) {
      getInfo()
    }
  }, [user])

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
        <div className="container-fluid py-3 px-3 px-lg-4 dashboard-rebrand">
          <h2 className="mb-4">Hola, {user.username}!</h2>

          <DashboardGrid>
            <div className="col-12 col-md-6 col-lg-4 d-flex">
              <DashboardStatCard
                variant="red"
                type="groups"
                groups={groups}
              />
            </div>

            <div className="col-12 col-md-6 col-lg-4 d-flex">
              <DashboardStatCard
                variant="yellow"
                type="next-plan"
                nextPlan={nextPlans[0]}
                closePlan={closePlan}
              />
            </div>

            <div className="col-12 col-md-6 col-lg-4 d-flex">
              <DashboardStatCard
                variant="orange"
                type="plans-count"
                value={nextPlans.length}
                nextPlans={nextPlans}
              />
            </div>

            <div className="col-12 col-md-6 col-lg-4 d-flex">
              <PendingActionsCard plans={nextPlans} />
            </div>

            <div className="col-12 col-md-6 col-lg-8 d-flex">
              <DiscoverCard image={discoverImages[currentImage]} />
            </div>
          </DashboardGrid>
        </div>
      )}
    </>
  )
}