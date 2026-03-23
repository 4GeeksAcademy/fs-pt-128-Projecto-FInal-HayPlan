import { Link } from "react-router-dom";
import iconLogoColor from "../../assets/img/iconLogo-Color.png";
import hayPlanHero from "../../assets/img/hayPlanHero.png"

export const Hero = () => {

    return (
        <div className="container pt-0 py-3 ">
            <div className="hero-box px-4 px-md-2 rounded-4 position-relative overflow-hidden">

                {/* Background Logo */}
                <img src={iconLogoColor} className="hero-logo" alt="" />
                <div className="row align-items-center ">
                    {/* LEFT → VIDEO */}
                    <div className="col-12 col-lg-6 mb-4 mb-lg-0 d-none d-lg-inline">
                        <div className="hero-media-container">
                            <img
                                src={hayPlanHero}
                                alt="App preview"
                                className="hero-media"
                            />
                        </div>
                    </div>

                    {/* RIGHT → TEXT */}
                    <div className="d-flex flex-column col-12 col-lg-6 text-lg-start">
                        
                        <div className="d-flex flex-column mb-3 p-4 text-center text-lg-start gap-2">
                            <h1 className="text-center m-0"><span className="pill-highlight highlight-h4 badge rounded-pill border shake-hover fancy-pill">Planifica</span></h1>
                            <h2 className="text-center ms-lg-5"><span className="highlight mb-0 d-inline-block">con tus amigos sin perder tiempo</span></h2>
                            <h2 className="text-center ms-lg-5"><span className="highlight"> y conviertelos <br /> en planes que </span> </h2>
                            <h2 className="text-center"><span className="pill-highlight-accent3 highlight-h4 btn badge rounded-pill border shake-hover"> sí pasan.</span> </h2>
                        </div>

                        <div className="d-flex gap-4 p- justify-content-center justify-content-lg-center">
                            <Link to="/login" className="btn btn-outline-light btn-lg px-4 px-lg-5 rounded-pill">
                                Login
                            </Link>
                            <Link to="/signup" className="btn btn-warning btn-lg px-4 px-lg-5 rounded-pill">
                                Sign up
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}