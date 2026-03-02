import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Topbar } from "../components/Topbar"
import { Navbar } from "../components/Navbar"
import { MobileNavbar } from "../components/MobileNavbar"
import { Footer } from "../components/Footer"


// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    return (
        <ScrollToTop>

            {/* Layout general para dashboard */}
            <div className="d-flex vh-100 overflow-hidden">
                {/* Navbar - columna Izquierda */}
                <div className="border-end bg-light d-none d-lg-block">
                    <Navbar />
                </div>

                {/* Dashboard - columna Central */}
                <div className="flex-grow-1 d-flex flex-column">
                    {/* Barra de pagina */}
                    <div className="border-bottom d-none d-lg-block">
                        <Topbar />
                    </div>
                    {/* Navbar - columna Izquierda */}
                    <div className="flex-grow-1 over-flow-auto p-3 pb-5 pb-lg-2">
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