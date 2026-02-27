import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	const loadMessage = async () => {
		
	}

	// useEffect(() => {
	// 	loadMessage()
	// }, [])

	return (
		<div className="container text-center mt-5">

			<div className="container">
				<div className="row g-3">
					<div className="col-12 col-md-6 col-lg-3">
						<div className="card shadow-sm border-0 h-100">

						<div className="card-body">
							<h2 className="fw-b">
								45
							</h2>
							<p className="text-muted mb-0">
								label
							</p>
						</div>
						</div>

					</div>
				</div>
			</div>
			
		</div>
	);
}; 