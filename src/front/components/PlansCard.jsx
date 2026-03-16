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
        <div className="d-flex justify-content-between align-items-start gap-3 flex-wrap">
            <div>
                <h5 className="mb-1">{plan.title}</h5>
                <p className="mb-1 text-secondary">{plan.groupName}</p>
                <small className="text-secondary">
                    {planDateFormat(plan.date)}
                    {plan.location ? ` · ${plan.location}` : ""}
                    {` · ${plan.group_name}`}
                </small>
            </div>

            <div className="d-flex flex-column align-items-end gap-2">
                <span className={`badge rounded-pill ${plan.status === "votacion" ? "bg-warning" : "bg-success"}`}>
                    {plan.status}
                </span>
                <button className="btn btn-sm btn-outline-light rounded-pill px-3">
                    Ver plan
                </button>
            </div>
        </div>
    )
}