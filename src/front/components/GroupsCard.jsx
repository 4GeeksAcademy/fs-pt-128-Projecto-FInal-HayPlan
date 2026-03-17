import { useEffect, useState } from "react"
import { getGroupMembers, getGroupPlans } from "../services/backEndServices"

export const GroupsCard = ({ group }) => {

    const [closePlan, setClosePlan] = useState(null)
    const [groupMembers, setGroupMembers] = useState([])

    const getInfo = async (group) => {
        const responsePlans = await getGroupPlans(group.id)
        console.log(responsePlans)

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
            <div className="card border-0 shadow-sm rounded-4 h-100 dashBoard-card-medium-item overflow-hidden">

                {/* IMAGE */}
                <div style={{ height: "140px", overflow: "hidden" }}>
                    <img
                        src={group.image || "https://via.placeholder.com/600x300"}
                        alt={group.name}
                        className="w-100 h-100"
                        style={{
                            objectFit: "cover"
                        }}
                    />
                </div>

                <div className="card-body d-flex flex-column ">

                    {/* TITLE + MEMBERS */}
                    <div className=" d-flex flex-md-row flex-lg-column align-content-center justify-content-between gap-2 mb-4">
                        <h5 className="fw-semibold text-white m-0">
                            {group.name.toUpperCase()}
                        </h5>

                        <div className="d-flex flex-wrap gap-2">
                            <div className="px-3 px-4 border rounded-pill small ">
                                {groupMembers.length} miembro{groupMembers.length === 1 ? "" : "s"}
                            </div>
                        </div>
                    </div>

                    {/* NEXT PLAN */}
                    <div className="mb-4 flex-grow-1">
                        <p className="small text-uppercase fw-semibold mb-2">
                            Próximo plan
                        </p>

                        {closePlan ? (
                            <div className="rounded-4 p-3 dashBoard-card-medium-item">
                                <div className="fw-semibold text-white mb-1">
                                    {closePlan.title.toUpperCase()}
                                </div>
                                <div className="small">
                                    {planDateFormat(closePlan.date)}
                                </div>
                            </div>
                        ) : (
                            <div className="rounded-4 p-3 border border-danger">
                                <p className="small text-uppercase fw-semibold mb-2">
                                    No hay plan!
                                </p>
                                <div className="small">
                                    Cuando creen uno, aparecerá aquí.
                                </div>
                            </div>
                        )}
                    </div>

                    {/* BUTTON */}
                    <a href="#" className="btn btn-warning rounded-pill w-100 fw-medium">
                        Ver grupo
                    </a>

                </div>
            </div>
        </div>
    )
}