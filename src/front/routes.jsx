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

import { DescubreResultados } from "./pages/DescubreResultados";
import { Planes } from "./pages/Planes";
import { Plans } from "./pages/Plans";
import { Groups } from "./pages/Groups";
import { Componentes } from "./pages/Componentes";
import { CreatePlan } from "./pages/CreatePlan";
import { CreateGroup } from "./pages/CreateGroup";
import { Group } from "./pages/Group";
import { GroupDetails } from "./pages/GroupDetails";

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
        <Route path="plans" element={<Plans />} />
        <Route path="planes" element={<Planes />} />
        <Route path="groups" element={<Groups />} />
        <Route path="groups/:group_id" element={<Group />} />
        {/* <Route path="groups/:groupId" element={<Group1 />} />  */}
        <Route path="groups/details/:group_id" element={<GroupDetails />} /> 
        <Route path="descubre" element={<Descubre />} />
        <Route path="descubre-resultados/:city" element={<DescubreResultados />} />
        <Route path="componentes" element={<Componentes />} />
        <Route path="plans" element={<Plans />} />
        <Route path="plans/create-plan" element={<CreatePlan />} />
        <Route path="groups/:groupId/create-plan" element={<CreatePlan />} />
        <Route path="groups/create-group" element={<CreateGroup />} />

      </Route>
    </>
  )
);
