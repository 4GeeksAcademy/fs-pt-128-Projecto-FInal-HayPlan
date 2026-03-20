import { Outlet, Navigate } from "react-router-dom" 
import ScrollToTop from "../components/ScrollToTop"
import { Topbar } from "../components/Topbar"
import { Navbar } from "../components/Navbar"
import { MobileNavbar } from "../components/MobileNavbar"
import { Footer } from "../components/Footer"
import useGlobalReducer from "../hooks/useGlobalReducer"
import { useEffect } from "react"
import { verifyToken } from "../services/backEndServices"


// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const AppLayout = () => {
    const { store, dispatch } = useGlobalReducer()

    // --- PROTECCIÓN DE RUTAS PRIVADAS ---
        const token = store.token || localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    
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
                    {/* content */}
                    <div className="flex-grow-1 overflow-auto p-3 pb-5 pb-lg-2">
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

