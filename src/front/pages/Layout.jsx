import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Topbar } from "../components/Topbar"
import { Navbar } from "../components/Navbar"
import { MobileNavbar } from "../components/MobileNavbar"
import { Footer } from "../components/Footer"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { useEffect } from "react"
import { verifyToken } from "../services/backEndServices"


// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    const { store, dispatch } = useGlobalReducer()

    useEffect(() => {        
        if (store.token && !store.user) {
            verifyToken(store.token, dispatch)
        }
    }, [store.token, store.user, dispatch]) 

    return (
        <ScrollToTop>

            {/* Layout general para dashboard */}
            <div className="d-flex vh-100 overflow-hidden">
                
                {/* Navbar - columna Izquierda */}
                <div className=" bg-light d-none d-lg-block">
                    <Navbar />
                </div>

                {/* Dashboard - columna Central */}
                <div className="flex-grow-1 d-flex flex-column">

                    {/* Barra de pagina */}
                    {/* <div className="d-lg-block">
                        <Topbar />
                    </div> */}

                    {/* Content */}
                    <div className="flex-grow-1 overflow-hidden p-3 pb-5 pb-lg-2">
                        <Outlet />
                    </div>

                </div>
            </div>

            {/* Navbar - Barra Mobil */}
            <div className="d-lg-none">
                <MobileNavbar />
            </div>

        </ScrollToTop>
    )
}
