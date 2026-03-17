export const StatsRow = ({memberCount, createdAt}) => {

    const formatDate = (date) => {
        if(!date) return ""

        const day = new Date(date)
        return day.toLocaleDateString("es-ES", {
            year: "numeric",
            month: "short"
        })
    }

    return (
        <div className="row g-2 mt-2 px-2">
            {/* Members */}
            <div className="col-6 m-0">
                <div className="card rounded-4 shadow-sm dashBoard-card-small">
                    <div className="card-body py-3 px-3">
                        <p className="small text-uppercase fw-bold mb-0 mt-1">
                            Miembros
                        </p>
                        <h2
                            className="m-0 fw-bold"
                            style={{ color: "var(--accent)" }}
                        >
                            {memberCount}
                        </h2>
                    </div>
                </div>
            </div>

            {/* Created date */}
            <div className="col-6 m-0">
                <div className="card rounded-4 shadow-sm dashBoard-card-small">
                    <div className="card-body py-3 px-3">
                        <p className="small text-uppercase fw-bold mb-0 mt-1">
                            Desde
                        </p>
                        <h2
                            className="m-0 fw-bold"
                            style={{ color: "var(--accent2)" }}
                        >
                            {formatDate(createdAt)}
                        </h2>
                    </div>
                </div>
            </div>
        </div>
    )
}