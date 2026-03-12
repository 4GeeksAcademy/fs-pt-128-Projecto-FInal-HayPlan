// Import necessary components and functions from react-router-dom.

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
// import { Layout } from "./pages/Layout";
// import { Home } from "./pages/Home";
// import { Single } from "./pages/Single";
// import { Demo } from "./pages/Demo";

import { PublicLayout } from "./pages/PublicLayout";
import { AppLayout } from "./pages/AppLayout";

import { LandingPage } from "./pages/LandingPage";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";

import { Home } from "./pages/Home"

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Rutas Publicas */}
      <Route path="/" element={<PublicLayout />} errorElement={<h1>Not found!</h1>} >
      <Route index element={<LandingPage />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      </Route >

      {/* Rutas Privadas */}
      <Route path="/app" element={<AppLayout />} errorElement={<h1>Not found!</h1>} >
      <Route index element={<Home />} /> {/* CAMBIA A DASHBOARD.jsx */}
      {/* <Route path="" element={} />
        <Route path="" element={} /> */}
      </Route>
    </>
  )
);