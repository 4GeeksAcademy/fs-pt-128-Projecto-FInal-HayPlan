import plan1 from "../assets/img/placeholder/plan1.jpg"
import plan2 from "../assets/img/placeholder/plan2.webp"
import plan3 from "../assets/img/placeholder/plan3.jpg"
import plan4 from "../assets/img/placeholder/plan4.jpg"
import plan5 from "../assets/img/placeholder/plan5.jpeg"
import plan6 from "../assets/img/placeholder/plan6.jpg"
import plan7 from "../assets/img/placeholder/plan7.jpg"

import { Link } from "react-router-dom"
import { planDateFormatLarge } from "../functions/planDateFormatLarge"
import { planDateFormatShort } from "../functions/planDateFormatShort"
import { planStatusFormat } from "../functions/planStatusFormat"
import { useState } from "react"
import { PlanModal } from "../components/PlanModal"

export const PlansCard = ({ plan, user }) => {

    const [showPlanDetails, setShowPlanDetails] = useState(false)

    const groupImages = [plan1, plan2, plan3, plan4, plan5, plan6, plan7]
    const randomImage = groupImages[plan.id % groupImages.length]

    return (
        <div className="card border-0 shadow-sm rounded-4 h-100 dashBoard-card-medium-item  overflow-hidden dashboard-card-red-inverted ">

            {/* Imagen? */}
            {/* <div className="bg-dark" style={{ height: "140px" }}></div> */}
            <div style={{ height: "140px", overflow: "hidden" }}>
                <img
                    src={randomImage}
                    alt={plan.title}
                    className="w-100 h-100"
                    style={{
                        objectFit: "cover"
                    }}
                />
            </div>
            <div className="card-body d-flex flex-column">

                {/* Nombre */}
                <div className="mb-3">
                    <h5 className="fw-semibold text-white mb-1"> {plan.title.toUpperCase()} </h5>
                    <div className="text-white small"> {plan.group_name} </div>
                    <div className="small"> Organizado por:  {plan.organizer_username} </div>
                </div>

                <div className="d-flex align-items-center gap-4 m-0">
                    {/* Status */}
                    <span className={planStatusFormat(plan.status)}> {plan.status} </span>
                    {/* Fecha */}
                    <div className="small text-white"> {planDateFormatShort(plan.date)} </div>
                </div>

                <hr style={{ color: "var(--clr-primary-a50)" }} />
                {/* Button */}
                <button className="btn btn-outline-light rounded-pill mt-auto" onClick={() => setShowPlanDetails(true)}>Ver Plan</button>
                {showPlanDetails && <PlanModal onClose={() => setShowPlanDetails(false)} plan={plan} user={user} />}
            </div>
        </div>
    )
}