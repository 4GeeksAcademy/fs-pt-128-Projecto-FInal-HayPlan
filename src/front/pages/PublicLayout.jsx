// import useGlobalReducer from "../hooks/useGlobalReducer"
// import { useEffect } from "react"
// import { verifyToken } from "../services/backEndServices"
import { Outlet } from "react-router-dom"
import ScrollToTop from "../components/ScrollToTop"
import { NavbarLanding } from "../components/NavbarLandingPage"
import { Footer } from "../components/Footer"


// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const PublicLayout = () => {
    // const { store, dispatch } = useGlobalReducer()

    // useEffect(() => {
    //     if (store.token && !store.user) {
    //         verifyToken(store.token, dispatch)
    //     }
    // }, [store.token, store.user, dispatch])

    return (
        <ScrollToTop>
            <div className="min-vh-100 d-flex flex-column">
                <NavbarLanding />

                {/* contenido del landing page */}
                <main className="flex-grow-1">
                    <Outlet />
                </main>

                <Footer />
            </div>
        </ScrollToTop>
    )
}
