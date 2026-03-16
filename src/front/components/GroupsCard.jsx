import { useEffect, useState } from "react"
import { getGroupMembers, getGroupPlans } from "../services/backEndServices"

export const GroupsCard = ({ group }) => {

    const [closePlan, setClosePlan] = useState(null)
    const [groupMembers, setGroupMembers] = useState([])

    const getInfo = async (group) => {
        const responsePlans = await getGroupPlans(group.id)
        console.log(responsePlans);

        const sortedPlan = responsePlans
            .filter(plan => new Date(plan.date) > new Date())
            .sort((a, b) => new Date(a.date) - new Date(b.date))[0]
        setClosePlan(sortedPlan)
        const responseMembers = await getGroupMembers(group.id)
        setGroupMembers(responseMembers)
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

    useEffect(() => {
        getInfo(group)
    }, [group.id])

    return (
        <div className="col-lg-4 col-md-6 p-2">
            <div className="card bg-transparent" style={{ width: "18rem" }}>
                <img src="123" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title text-white">{group.name.toUpperCase()}</h5>
                    <p>{groupMembers.length} miembro{groupMembers.length === 1 ? "" : "s"}</p>
                    <p className="card-text">Próximo plan:</p>
                    {closePlan ? (
                        <div>
                            <strong>{closePlan.title.toUpperCase()}</strong> <br />
                            {planDateFormat(closePlan.date)}
                        </div>
                    ) : (
                        <div>No hay proximo plan</div>
                    )}
                    <a href="#" className="btn btn-primary">Ver grupo</a>
                </div>
            </div>
        </div>
    )
}