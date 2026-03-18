import iconLogoColor from "../assets/img/iconLogo-Color.png";

export const HowItWorks = () => {
    return (
        <div className="container px-4 py-5" id="custom-cards">
           <h2 className="pb-2 border-bottom fw-bold text-center text-md-start">
                ¿Cómo funciona?
            </h2>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-5 g-4 py-4">

                {/* CARD 1 */}
                <div className="col d-flex">
                    <div className="card w-100 rounded-4 shadow-lg text-bg-dark  border rounded-4">
                        <div className="card-body d-flex flex-column justify-content-end p-4">
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
                    <div className="card w-100 rounded-4 shadow-lg text-bg-dark  border rounded-4">
                        <div className="card-body d-flex flex-column justify-content-end p-4">
                            <h5 className="how-title fw-bold mb-2">
                                Votaciones rápidas
                            </h5>
                            <p className="small text-white-50 mb-0">
                                Propongan fechas y lugares, y dejen que el grupo vote en segundos.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CARD 3 */}
                <div className="col d-flex">
                    <div className="card w-100 rounded-4 shadow-lg text-bg-dark  border rounded-4">
                        <div className="card-body d-flex flex-column justify-content-end p-4">
                            <h5 className="how-title fw-bold mb-2">
                                Cuentas claras
                            </h5>
                            <p className="small text-white-50 mb-0">
                                Divide gastos fácilmente para que nadie termine pagando de más.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CARD 4 */}
                <div className="col d-flex">
                    <div className="card w-100 rounded-4 shadow-lg text-bg-dark  border rounded-4">
                        <div className="card-body d-flex flex-column justify-content-end p-4">
                            <h5 className="how-title fw-bold mb-2">
                                Hall of Fame
                            </h5>
                            <p className="small text-white-50 mb-0">
                                Revive los mejores planes y mira quién siempre organiza los mejores.
                            </p>
                        </div>
                    </div>
                </div>

                {/* CARD 5 */}
                <div className="col d-flex">
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
                </div>

            </div>
        </div>
    );
};