import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import iconLogoColor from "../assets/img/iconLogo-Color.png";

export const DashboardBlockLarge = () => {
   
    return (

        <div className="container-fluid mt-3 mt-md-4 mb-3 ">
            <div className="row">
                <div className="col-12 p-0">
                    <div className="card rounded-4 shadow dashBoard-card-large">
                        {/* card-body  */}
                        <div className="card-body d-flex py-4 px-2 px-md-4 ">
                        <div className="dashBoard-card-large-border"></div>

                            {/* Informacion plan actual */}
                            <div className="col-9 col-md-10">
                                <div className="col-12 col-md-6 d-flex justify-content-start gap-3">
                                    <p className="fw-bold badge rounded-pill text-bg-warning">Status del plan</p>
                                    <p className="mb-2">02.03.26</p>
                                </div>

                                <div className="">
                                    <h2 className="fw-bold mb-3 h1 text-uppercase">Game night en tripping animals</h2>
                                </div>

                                <div className="d-flex justify-content-START gap-2 gap-md-2 ">
                                    <p className="badge rounded-pill text-bg-info px-md-4 m-0">information</p>
                                    <p className="badge rounded-pill text-bg-info px-md-4 m-0">info</p>
                                    <p className="badge rounded-pill text-bg-info px-md-4 m-0">informa</p>
                                </div>
                            </div>

                            <div className="col-3 col-md-2 d-flex flex-column justify-content-center">
                                <a className="nav-link text-center py-2 m-0" href="#">
                                    <img src={iconLogoColor} width="60" height="60" />
                                </a>
                                {/* o tal vez el status del plan? */}
                                <p className="badge rounded-pill text-bg-secondary px-0 m-0">4 propuestas</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    );
}; 