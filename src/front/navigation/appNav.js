export const appNav = [
  {
    section: "Navegacion",
    items: [
      {
        label: "Dashboard",
        icon: "bi-border-style",
        path: "/app",
      },
       {
        label: "Mis grupos",
        icon: "bi-people",
        path: "/app/groups",
      },
      {
        label: "Planes",
        icon: "bi-people",
        path: "/app/plans",
      },
      {
        label: "Descubre",
        icon: "bi-search",
        path: "/app/descubre",
      }
      // {
      //   label: "Detalle de Plan",
      //   icon: "bi-journal-check",
      //   path: "/app/planDetails",
      // },
      // {
      //   label: "Detalle de Grupo",
      //   icon: "bi-bar-chart",
      //   path: "/app/group1",
      // },
      
    ],
  },
  {
    section: "Configuracion",
    items: [
      {
        label: "Perfil",
        icon: "bi-person-circle",
        path: "/app/profile",
      },
      {
        label: "Cerrar sesión",
        icon: "bi-box-arrow-right",
        path: "#",
        isLogout: true, // Esta es la "llave" que activa la alerta
      }
      // {
      //   label: "Ayuda",
      //   icon: "bi-info-circle",
      //   path: "/app/ayuda",
      // },
      
    ],
  },
  {
    section: "Mobile",
    items: [
      {
        label: "Perfil",
        icon: "bi-person-circle",
        path: "/app/perfil",
      },
      {
        label: "Stats",
        icon: "bi-bar-chart",
        path: "/app/stats",
      },
      {
        label: "Dashboard",
        icon: "bi-border-style",
        path: "/app",
      },
      {
        label: "Descubre",
        icon: "bi-info-circle",
        path: "/app/descubre",
      },
      {
        label: "Configuracion",
        icon: "bi-gear",
        path: "/app/ayuda",
      },
    ],
  },
];
