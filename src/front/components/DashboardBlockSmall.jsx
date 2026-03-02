import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const DashboardBlockSmall = () => {

    return (
        // <div className="dashBoard-container-small">
        <div className="container-fluid px-0">
            <div className="row g-1 g-md-2">
                {/* dashBoard-card-small for custom styling */}
                <div className="col-3 p-1 m-0 dashBoard-card-small">
                    <div className="card border rounded-4 shadow-sm">
                        <div className="card-body py-4 px-2 px-md-4">
                            <h2 className="fw-bold m-0 text-center text-md-start">45</h2>
                            <p className="text-muted d-none d-md-inline">Planes</p>
                        </div>
                    </div>
                </div>
                {/* dashBoard-card-small for custom styling */}
                <div className="col-3 p-1 m-0 dashBoard-card-small">
                    <div className="card border rounded-4 shadow-sm">
                        <div className="card-body py-4 px-2 px-md-4">
                            <h2 className="fw-bold m-0 text-center text-md-start">45</h2>
                            <p className="text-muted d-none d-md-inline">Planes</p>
                        </div>
                    </div>
                </div>
                {/* dashBoard-card-small for custom styling */}
                <div className="col-3 p-1 m-0 dashBoard-card-small">
                    <div className="card border rounded-4 shadow-sm">
                        <div className="card-body py-4 px-2 px-md-4">
                            <h2 className="fw-bold m-0 text-center text-md-start">45</h2>
                            <p className="text-muted d-none d-md-inline">Planes</p>
                        </div>
                    </div>
                </div>
                {/* dashBoard-card-small for custom styling */}
                <div className="col-3 p-1 m-0 dashBoard-card-small">
                    <div className="card border rounded-4 shadow-sm">
                        <div className="card-body py-4 px-2 px-md-4">
                            <h2 className="fw-bold m-0 text-center text-md-start">45</h2>
                            <p className="text-muted d-none d-md-inline">Planes</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        // </div>
    );
}; 