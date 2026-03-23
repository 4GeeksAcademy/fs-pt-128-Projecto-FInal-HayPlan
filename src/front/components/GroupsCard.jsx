import { useEffect, useState } from "react"
import { getGroupMembers, getGroupPlans } from "../services/backEndServices"
import { Link } from "react-router-dom"
import { planDateFormatLarge } from "../functions/planDateFormatLarge"
import { planStatusFormat } from "../functions/planStatusFormat"

export const GroupsCard = ({ group }) => {

    const [closePlan, setClosePlan] = useState(null)
    const [groupMembers, setGroupMembers] = useState([])

    const getInfo = async (group) => {
        const responsePlans = await getGroupPlans(group.id)

        const sortedPlan = responsePlans
            .filter(plan => new Date(plan.date) > new Date())
            .sort((a, b) => new Date(a.date) - new Date(b.date))[0]

        setClosePlan(sortedPlan)

        const responseMembers = await getGroupMembers(group.id)
        setGroupMembers(responseMembers)
    }

    useEffect(() => {
        getInfo(group)
    }, [group.id])

    return (
        <div className="col-lg-4 col-md-6 p-2">
            <div className="card border-0 shadow-sm rounded-4 h-100 dashBoard-card-medium-item overflow-hidden">

                {/* IMAGE */}
                <div className="bg-dark" style={{ height: "160px" }}></div>
                {/* <div style={{ height: "140px", overflow: "hidden" }}>
                    <img
                        src={group.image || "https://via.placeholder.com/600x300"}
                        alt={group.name}
                        className="w-100 h-100"
                        style={{
                            objectFit: "cover"
                        }}
                    />
                </div> */}
                <div className="card-body d-flex flex-column dashboard-card-red-inverted ">
                    {/* TITLE + MEMBERS */}
                    <div className=" d-flex flex-md-row flex-lg-column align-content-center justify-content-between gap-2 mb-2">
                        <h5 className="fw-semibold text-white mb-2">
                            {group.name.toUpperCase()}
                        </h5>

                        <div className="d-flex flex-wrap mb-1">
                            <div className="px-3 px-4 border rounded-pill small ">
                                {groupMembers.length} miembro{groupMembers.length === 1 ? "" : "s"}
                            </div>
                        </div>
                    </div>

                    {/* NEXT PLAN */}
                    <div className="mb-4 flex-grow-1">
                        <p className="small text-uppercase fw-semibold mb-2">
                            Siguiente plan
                        </p>

                        {closePlan ? (
                            <div className="rounded-4 p-3 dashBoard-card-medium-item text-bg-dark border border-light border-opacity-10">
                                <div className="fw-semibold text-white mb-1">
                                    {closePlan.title.toUpperCase()}
                                </div>

                                <div className="small text-white-50 mb-3">
                                    {planDateFormatLarge(closePlan.date)}
                                </div>

                                <div>
                                    <span className={planStatusFormat(closePlan.status)}>
                                        {closePlan.status}
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <div className="rounded-4 p-3 dashBoard-card-medium-item text-bg-dark border border-light border-opacity-10">
                                <div className="fw-semibold text-white mb-1">
                                    No hay plan!
                                </div>

                                <div className="small text-white-50 mb-3">
                                    Y entonces?
                                </div>
                                <span className={planStatusFormat("cerrado")}> No hay plan! </span>
                            </div>
                        )}
                    </div>

                    {/* BUTTON */}
                    <Link to={`${group.id}`} className="btn btn-outline-light rounded-pill ">
                        Ver grupo
                    </Link>

                </div>
            </div>
        </div>
    )
}