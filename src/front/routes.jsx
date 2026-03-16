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
import { Dashboard } from "./pages/Dashboard";
import { Descubre } from "./pages/Descubre";

import { Grupos } from "./pages/Grupos"
import { DescubreResultados } from "./pages/DescubreResultados";
import { Planes } from "./pages/Planes";

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
        <Route index element={<Dashboard />} />
        {/* <Route path="/single/:theId" element={<Single />} />  Dynamic route for single items */}
        {/* <Route path="demo" element={<Demo />} /> */}
        {/* <Route path="dashboard" element={<Dashboard/>} /> */}
        {/* <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} /> */}
        <Route path="planes" element={<Planes />} />
        <Route path="grupos" element={<Grupos />} />
        <Route path="descubre" element={<Descubre />} />
        <Route path="descubre-resultados/:city" element={<DescubreResultados />} />

        {/* <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>} > */}

        </Route>
      </>
      )
      );
