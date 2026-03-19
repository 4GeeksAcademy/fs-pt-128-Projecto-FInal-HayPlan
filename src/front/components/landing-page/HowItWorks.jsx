import iconLogoColor from "../../assets/img/iconLogo-Color.png";

export const HowItWorks = () => {
    return (
        <div className="container px-4 py-3" id="how-it-works">
            <h2 className="pb-2 border-bottom fw-bold text-center text-md-start">
                ¿Cómo funciona?
            </h2>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-3 g-4 py-4">

                {/* CARD 1 */}
                <div className="col d-flex">
                    <div className="card w-100 rounded-4 shadow-lg text-bg-dark border rounded-4">
                        <div className="card-body d-flex flex-column justify-content-start p-4">
                            <img className="mb-3" src={iconLogoColor} alt="Hay Plan Logo" style={{ width: "50px" }} />
                            <h5 className="how-title fw-bold mb-2">
                                Ruleta del Plan
                            </h5>
                            <p className="small text-white-50 mb-0">
                                ¿No saben qué hacer? Dejen que la ruleta decida el plan por ustedes.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CARD 2 */}
                <div className="col d-flex">
                    <div className="card w-100 rounded-4 shadow-lg text-bg-dark border rounded-4">
                        <div className="card-body d-flex flex-column justify-content-end p-4">
                            <h5 className="how-title fw-bold my-2">
                                Votaciones rápidas
                            </h5>
                            <p className="small text-white-50 mb-3">
                                Propongan fechas y lugares, y dejen que el grupo vote en segundos.
                            </p>
                            <span className="small mb-0 mt-3 pill-highlight-accent badge rounded-pill border align-self-start ">
                                votacion
                            </span>
                        </div>
                    </div>
                </div>

                {/* CARD 3 */}
                {/* <div className="col d-flex">
                    <div className="card w-100 rounded-4 shadow-lg text-bg-dark  border rounded-4">
                        <div className="card-body d-flex flex-column justify-content-end p-4">
                            <h5 className="how-title fw-bold mb-2">
                                Cuentas claras
                            </h5>
                            <p className="small text-white-50 mb-3">
                                Divide gastos fácilmente para que nadie termine pagando de más.
                            </p>
                            <span className="small mb-0 pill-highlight-accent3 badge rounded-pill border">
                                votacion
                            </span>
                        </div>
                    </div>
                </div> */}

                {/* CARD 4 */}
                <div className="col d-flex">
                    <div className="card w-100 rounded-4 shadow-lg text-bg-dark border rounded-4">
                        <div className="card-body d-flex flex-column justify-content-end  p-4">
                            <div className="d-flex mb-3">
                                <span className="h2 fw-bold m-0 accent-color4">
                                    <span className="h5 m-0" >#</span>2
                                </span>
                            </div>
                            <h5 className="how-title fw-bold mb-2">
                                Hall of Fame
                            </h5>
                            <p className="small text-white-50 mb-3">
                                Revive los mejores planes y mira quién siempre organiza los mejores.
                            </p>
                            {/* <span className="small mb-0 pill-highlight-accent5 badge rounded-pill border">
                                votacion
                            </span> */}
                        </div>
                    </div>
                </div>

                {/* CARD 5 */}
                {/* <div className="col d-flex">
                    <div className="card w-100 rounded-4 shadow-lg text-bg-dark  border rounded-4">
                        <div className="card-body d-flex flex-column justify-content-end p-4">
                            <h5 className="how-title fw-bold mb-2">
                                Recuerdos
                            </h5>
                            <p className="small text-white-50 mb-0">
                                Guarda fotos y momentos para recordar cada plan que hicieron juntos.
                            </p>
                        </div>
                    </div>
                </div> */}

            </div>
        </div>
    );
};