export const planStatusFormat = (status) => {
    if( status === "propuesta") return "fw-bold badge rounded-pill text-bg-light px-3"
    if (status === "votacion") return "fw-bold badge rounded-pill text-bg-warning px-3"
    if (status === "confirmado") return "fw-bold badge rounded-pill text-bg-success px-3"
    if (status === "activo") return "fw-bold badge rounded-pill text-bg-info px-3"
    if (status === "cerrado") return "fw-bold badge rounded-pill text-bg-danger px-3"
}