import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import { Topbar } from "../components/Topbar"


// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
    return (
        <ScrollToTop>
            {/* <Navbar />
                <Outlet />
            <Footer /> */}

            {/* Layout general para dashboard */}
            <div className="d-flex vh-100 overflow-hidden">

                {/* Navbar - columna Izquierda */}
                <div className="bg-ligh">
                    <Navbar />
                </div>

                 {/* Dashboard - columna Central */}
                <div className="flex-grow-1 d-flex flex-column">

                    {/* Barra de pagina */}
                    <div className="border-bottom">
                        <Topbar />
                    </div>

                {/* Navbar - columna Izquierda */}
                <div className="flex-grow-1">
                    <Outlet />
                </div>

                </div>
            </div>

        </ScrollToTop>
    )
}