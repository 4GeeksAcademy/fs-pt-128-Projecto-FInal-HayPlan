import React, { useEffect } from "react"
import iconLogoColor from "../assets/img/iconLogo-Color.png";


export const DashboardBlockLarge = (props) => {
    const featuredPlan = props.featuredPlan
    
    if (!featuredPlan) {
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
                                        <p className="fw-bold badge rounded-pill text-bg-danger">Sal de tu casa!</p>
                                        {/* <p className="mb-2">02.03.26</p> */}
                                    </div>

                                    <div className="">
                                        <h2 className="fw-bold mb-3 h1 text-uppercase">Sin plan todavia??</h2>
                                    </div>

                                    <div className="d-flex justify-content-START gap-2 gap-md-2 ">
                                        {/* <p className="badge rounded-pill text-bg-info px-md-4 m-0">Crea tu primer plan!</p> */}
                                        {/* <p className="badge rounded-pill text-bg-info px-md-4 m-0">info</p>
                                        <p className="badge rounded-pill text-bg-info px-md-4 m-0">informa</p> */}
                                    </div>
                                </div>

                                 <div className="col-3 col-md-2 d-flex flex-column justify-content-center">
                                    <a className="nav-link text-center py-2 m-0" href="#">
                                        <img src={iconLogoColor} width="60" height="60" />
                                    </a>
                                    {/*/* o tal vez el status del plan? */}
                                    <p className="badge rounded-pill text-bg-secondary px-0 m-0">Crear plan!</p>
                                </div> 
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }

    const planTitle = featuredPlan.title
    const planStatus = featuredPlan.status
    // const planLocation = featuredPlan.location
    const planOrganizer = featuredPlan.organizer_username
    const planDate = featuredPlan.date
    
    const dateObject = new Date(planDate)
    const date = dateObject.toLocaleDateString("es-ES", {
        weekday: "short",
        day: "numeric",
        month: "short"
    })

    const time = dateObject.toLocaleTimeString("en-US", {
	    hour: "numeric",
	    minute: "2-digit",
        hour12: false
    });

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
                                    <p className="fw-bold badge rounded-pill text-bg-warning">{planStatus}</p>
                                    <p className="mb-2">{date}</p>
                                </div>

                                <div>
                                    <h2 className="fw-bold h1 text-uppercase">{planTitle}</h2>
                                </div>

                                <div className="d-flex justify-content-start gap-2 gap-md-2 mb-2 featuredPlan-details">
                                    <p className="badge rounded-pill border px-md-4 m-0">{time}</p>
                                    <p className="badge rounded-pill border px-md-4 m-0">detalle 2</p>
                                    <p className="badge rounded-pill border px-md-4 m-0">detalle 3</p>
                                </div>

                                <div className="d-flex justify-content-start gap-2 gap-md-2">
                                    <p className="badge rounded-pill border px-md-4 m-0">Organizador: {planOrganizer}</p>
                                    <p className="badge rounded-pill border border-danger text-danger px-md-4 m-0">3/4 confirmados</p>
                                </div>
                            </div>

                            <div className="col-3 col-md-2 d-flex flex-column justify-content-center">
                                <a className="nav-link text-center py-2 m-0" href="#">
                                    <img src={iconLogoColor} width="60" height="60" />
                                </a>
                                {/* o tal vez el status del plan? */}
                                <p className="badge rounded-pill border border-danger text-danger px-0 m-0">4 propuestas</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}; 