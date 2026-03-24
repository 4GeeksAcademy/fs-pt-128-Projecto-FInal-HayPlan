import React, { useEffect, useState } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import iconLogoColor from "../assets/img/iconLogo-Color.png";
import { planStatusFormat } from "../functions/planStatusFormat.js";
import { planDateFormatShort } from "../functions/planDateFormatShort.js";
import { PlanModal } from "./PlanModal.jsx";


export const DashboardBlockMedium = ({ plan, user }) => {

    const [organizer, setOrganizer] = useState(false)
    const [showPlanDetails, setShowPlanDetails] = useState(false)

    useEffect(() => {
        if (user.id === plan.organizer_id && plan.status !== "cerrado" && plan.status !== "confirmado" && plan.status !== "activo") {
            setOrganizer(true)
        } else {
            setOrganizer(false)
        }
    }, [user, plan])

    return (
        <div className="card border rounded-4 dashBoard-card-medium-item" >
            <div className="card-body d-flex align-items-center gap-3 p-3">
                {/* icono o imagen?  */}
                <div className="d-flex align-items-center justify-content-center rounded-3">
                    <i className="bi bi-journal-check"></i>
                </div>
                {/* info del plan */}
                <div className="flex-grow-1">
                    <div className="fw-bold ">{plan.title}</div>
                    <div className="d-flex gap-3 small text-muted mt-1">
                        <span className={planStatusFormat(plan.status)}>
                            {plan.status}
                        </span>
                        <span>
                            {planDateFormatShort(plan.date)}
                        </span>
                    </div>
                </div>
                {/* boton */}
                <div className="d-flex align-items-center gap-1">
                    {organizer && <button className="btn badge rounded-pill text-bg-secondary px-3">Editar Plan</button>}
                    <button className="btn badge rounded-pill text-bg-success px-3 me-2" onClick={() => setShowPlanDetails(true)}>Ver Plan</button>
                    {showPlanDetails && <PlanModal onClose={() => setShowPlanDetails(false)} plan={plan} user={user}/>}
                </div>
            </div>
        </div >
    );
}; 