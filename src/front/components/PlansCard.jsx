import { Link } from "react-router-dom"
import { planDateFormatLarge } from "../functions/planDateFormatLarge"
import { planDateFormatShort } from "../functions/planDateFormatShort"
import { planStatusFormat } from "../functions/planStatusFormat"

export const PlansCard = ({ plan }) => {

    const membersCount =
        plan.members?.length ||
        plan.participants?.length ||
        plan.users?.length ||
        0

    return (
        <div className="card border-0 shadow-sm rounded-4 h-100 dashBoard-card-medium-item overflow-hidden">

            {/* Imagen? */}
            <div className="bg-dark" style={{ height: "140px" }}></div>

            <div className="card-body d-flex flex-column">

                {/* Nombre */}
                <div className="mb-3">
                    <h5 className="fw-semibold text-white m-0">
                        {plan.title.toUpperCase()}
                    </h5>
                </div>

                <div className="d-flex align-items-center justify-content-around m-0">

                    {/* Status */}
                    <span className={planStatusFormat(plan.status)}>
                        {plan.status}
                    </span>

                    {/* Fecha */}
                    <div className="small text-white">
                        {planDateFormatShort(plan.date)}
                    </div>
                </div>
                <hr style={{ color: "var(--clr-primary-a50)" }} />

                {/* Miembros */}
                {/* <div className="mb-4">
                    <div className="px-3 border rounded-pill small d-inline-block">
                        {membersCount} miembro{membersCount === 1 ? "" : "s"}
                    </div>
                </div> */}

                {/* Button */}
                <Link to={`/app/plans/details/${plan.id}`} className="btn btn-outline-light rounded-pill mt-auto">
                    Ver plan
                </Link>

            </div>
        </div>
    )
}