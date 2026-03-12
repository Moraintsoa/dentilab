import { createBrowserRouter, Navigate } from "react-router-dom";

import { Home } from "../../features/Home";

import { Login } from "../../features/auth/pages/Login";
import { Register } from "../../features/auth/pages/Register";
import { Reset } from "../../features/auth/pages/Reset";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

// pages
import { Dashboard } from "../../features/dashboard/pages/Dashboard";

import { Patients } from "../../features/patients/pages/Patients";
import { DetailPatient } from "../../features/patients/pages/DetailPatient";


import { Consultations } from "../../features/consultations/pages/Consultation";
import { RendezVous } from "../../features/rendezvous/pages/RendezVous";
import { Facturations } from "../../features/facturations/pages/Facturations";
import { Inventaire } from "../../features/inventaire/pages/Inventaire";
import { Rapports } from "../../features/rapports/pages/Rapports";
import { PatientForm } from "../../features/patients/pages/PatientForm";
import { Odontogramme } from "../../features/patients/components/Odontogramme";
import { HistoriqueConsultations } from "../../features/patients/components/HistoriqueConsultations";
import { FacturationsPatient } from "../../features/patients/components/FacturationsPatient";
import { InformationsPatient } from "../../features/patients/components/InformationsPatient";

const routes = createBrowserRouter([

  // redirect root
  {
    path: "/",
    element: <Navigate to="/dashboard" />
  },

  // PRIVATE ROUTES (layout + sidebar)
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),

    children: [

      {
        path: "dashboard",
        element: <Dashboard />
      },

      {
        path: "patients",
        element: <Patients />
      },
      {
        path: "patients/:id",
        element: <DetailPatient />,
        children: [
          {
            index: true,
            element: <Navigate to="odontogramme" />
          },
          {
            index: true,
            path: "odontogramme",
            element: <Odontogramme />
          },
          {
            path: "historiqueconsultations",
            element: <HistoriqueConsultations />
          },
          {
            path: "facturations",
            element: <FacturationsPatient />
          },
          {
            path:"informations",
            element:<InformationsPatient/>
          }
        ]
      },
      {
        path: "patients/:id/edit",
        element: <PatientForm />
      },
      {
        path: "patients/new",
        element: <PatientForm />
      },
      {
        path: "consultations",
        element: <Consultations />
      },

      {
        path: "rendezvous",
        element: <RendezVous />
      },

      {
        path: "facturation",
        element: <Facturations />
      },

      {
        path: "inventaire",
        element: <Inventaire />
      },

      {
        path: "rapports",
        element: <Rapports />
      }

    ]
  },

  // PUBLIC ROUTES
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    )
  },

  {
    path: "/register",
    element: (
      <PublicRoute>
        <Register />
      </PublicRoute>
    )
  },

  {
    path: "/reset",
    element: (
      <PublicRoute>
        <Reset />
      </PublicRoute>
    )
  }

]);

export default routes;