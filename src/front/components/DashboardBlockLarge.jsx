import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import iconLogoColor from "../assets/img/iconLogo-Color.png";


export const DashboardBlockLarge = () => {

    return (

        <div className="container-fluid mt-3 mt-md-4 mb-3 dashBoard-card-large">
            <div className="row">
                <div className="col-12 p-0">
                    <div className="card border-0">
                        {/* card-body  */}
                        <div className="card-body d-flex py-4 px-2 px-md-4 border rounded-4 shadow">

                            {/* Informacion plan actual */}
                            <div className="col-9 col-md-10">
                                <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-start gap-5">
                                    <p className="fw-bold text-muted badge rounded-pill text-bg-warning">Status del plan</p>
                                    <p className="text-muted mb-2">02.03.26</p>
                                </div>

                                <div className="text-center text-md-start">
                                    <h2 className="fw-bold mb-3 h1 text-uppercase">Titulo del plan</h2>
                                </div>

                                <div className="d-flex justify-content-center gap-1 justify-content-md-start gap-md-2 ">
                                    <p className="badge rounded-pill text-bg-info px-md-4 m-0">information</p>
                                    <p className="badge rounded-pill text-bg-info px-md-4 m-0">info</p>
                                    <p className="badge rounded-pill text-bg-info px-md-4 m-0">informa</p>
                                </div>
                            </div>

                            <div className="col-3 col-md-2 d-flex flex-column justify-content-between">
                                <a className="nav-link text-center py-2" href="#">
                                    <img src={iconLogoColor} width="60" height="60" />
                                </a>
                                <p className="badge rounded-pill text-bg-secondary m-0">propuestas</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
}; 