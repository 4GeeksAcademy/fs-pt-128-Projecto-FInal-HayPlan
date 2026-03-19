import { Link } from "react-router-dom"
import { planDateFormatLarge } from "../functions/planDateFormatLarge"
import { planDateFormatShort } from "../functions/planDateFormatShort"
import { planStatusFormat } from "../functions/planStatusFormat"

export const PlansCard = ({ plan }) => {

    return (
        <div className="card border-0 shadow-sm rounded-4 h-100 dashBoard-card-medium-item  overflow-hidden dashboard-card-red-inverted ">

            {/* Imagen? */}
            <div className="bg-dark" style={{ height: "140px" }}></div>
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
                <Link to={`/app/plans/details/${plan.id}`} className="btn btn-outline-light rounded-pill mt-auto">
                    Ver plan
                </Link>
            </div>
        </div>
    )
}