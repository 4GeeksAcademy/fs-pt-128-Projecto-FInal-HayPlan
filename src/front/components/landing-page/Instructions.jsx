import iconLogoColor from "../../assets/img/iconLogo-Color.png";

export const Instructions = () => {
    return (
        <div className="container px-4 py-3">
            <div className="card rounded-4 shadow-lg text-bg-dark border">
                <div className="card-body p-4 p-lg-5">
                    <div className="row align-items-stretch">

                        {/* LEFT → TEXT */}
                        <div className="col-12 col-lg-4 mb-4 mb-lg-0">
                            <div className="h-100 d-flex flex-column justify-content-start pe-lg-3">
                                <h5 className="how-title fw-bold mb-2">
                                    De la idea al plan!
                                </h5>
                                <p className="small text-white-50 mb-0">
                                    Primero creamos nuestro grupo, luego nos inventamos un plan.
                                </p>
                            </div>
                        </div>

                        {/* RIGHT → GRID INSIDE SAME CARD */}
                        <div className="col-12 col-lg-8">
                            <div className="row g-3">

                                {/* CARD 1 */}
                                <div className="col-12 col-md-6 d-flex">
                                    <div className="card w-100 rounded-4 shadow-lg text-bg-dark border">
                                        <div className="card-body p-4">
                                            <h6 className="fw-bold">Ruleta del Plan</h6>
                                            <p className="small text-white-50 mb-0">
                                                ¿No saben qué hacer? Dejen que la ruleta decida.
                                            </p>
                                            <img
                                                className="mt-3"
                                                src={iconLogoColor}
                                                alt="Hay Plan logo"
                                                style={{ width: "60px" }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* CARD 2 */}
                                <div className="col-12 col-md-6 d-flex">
                                    <div className="card w-100 rounded-4 shadow-lg text-bg-dark border">
                                        <div className="card-body p-4">
                                            <h6 className="fw-bold">Votaciones</h6>
                                            <p className="small text-white-50 mb-0">
                                                Decidan rápido entre todos, sin excusa!
                                            </p>
                                            <div className="d-flex flex-column justify-content-center">
                                                <span className="small mb-0 mt-3 pill-highlight-accent3 badge rounded-pill border align-self-start px-4">
                                                    si voy!
                                                </span>
                                                <span className="small mb-0 mt-2 pill-highlight-accent6 badge rounded-pill border align-self-start px-4">
                                                    Nah, otro dia.. 
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* CARD 3 */}
                                <div className="col-12 col-md-6 d-flex">
                                    <div className="card w-100 rounded-4 shadow-lg text-bg-dark border">
                                        <div className="card-body p-4">
                                            <h6 className="fw-bold">Invita amigos</h6>
                                            <p className="small text-white-50 mb-0">
                                                Crea tu grupo en segundos.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* CARD 4 */}
                                <div className="col-12 col-md-6 d-flex">
                                    <div className="card w-100 rounded-4 shadow-lg text-bg-dark border">
                                        <div className="card-body p-4">
                                            <h6 className="fw-bold">Confirma el plan</h6>
                                            <p className="small text-white-50 mb-0">
                                                Todo listo sin mil mensajes.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};