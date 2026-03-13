import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Hero } from "./Hero.jsx";
import { HowItWorks } from "./HowItWorks.jsx";

export const LandingPage = () => {

    return (
         <div className="container py-5">
            <Hero />
            <HowItWorks />
        </div>
    );
}; 