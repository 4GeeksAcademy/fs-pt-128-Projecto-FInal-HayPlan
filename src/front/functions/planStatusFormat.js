export const planStatusFormat = (status) => {
    if( status === "propuesta") return "pill-highlight-accent4  badge rounded-pill border small px-4"
    if (status === "votacion") return "pill-highlight-accent badge rounded-pill border small px-4"
    if (status === "confirmado") return "pill-highlight-accent3 badge rounded-pill border small px-4"
    if (status === "activo") return "pill-highlight-accent4 badge rounded-pill border small px-4"
    if (status === "cerrado") return "pill-highlight-accent6 badge rounded-pill border small px-4"
}