import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
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
            <Navbar />
                <Outlet />
            <Footer />
        </ScrollToTop>
    )
}
