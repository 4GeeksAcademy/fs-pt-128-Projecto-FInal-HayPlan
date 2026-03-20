import React, { useEffect } from "react"
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { HowItWorks } from "../components/landing-page/HowItWorks.jsx";
import { Hero } from "../components/landing-page/Hero.jsx";
import { Instructions } from "../components/landing-page/Instructions.jsx";


export const LandingPage = () => {

    return (
         <div className="container py-4">
            <Hero />
            <HowItWorks />
            <Instructions />
        </div>
    );
}; 