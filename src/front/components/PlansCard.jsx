export const PlansCard = ({ plan }) => {
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
    return (
        <div className="card d-flex flex-row border rounded-4 dashBoard-card-medium-item">
            <div className="col-10 row g-1 p-3">
                <h5 className="mb-1 text-uppercase ">{plan.title}</h5>
                <span className={`w-auto badge rounded-pill px-4 ${plan.status === "votacion" ? "bg-warning" : "bg-success"}`}>
                    {plan.status}
                </span>
                <p className="mb-1 text-secondary">{plan.groupName}</p>
                <small className="text-secondary">
                    {planDateFormat(plan.date)}
                    {plan.location ? ` · ${plan.location}` : ""}
                    {` · ${plan.group_name}`}
                </small>
            </div>

            <div className="d-flex flex-column align-items-end gap-3 col-2 p-2">
                
                <button className="btn btn-sm btn-outline-light rounded-pill px-3">
                    Ver plan
                </button>
            </div>
        </div>
    )
}