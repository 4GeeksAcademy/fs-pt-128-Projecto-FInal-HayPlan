const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getTicketmasterEvents = async (
  dispatch,
  city,
  classificationId,
) => {
  try {
    const params = new URLSearchParams({
      apikey: import.meta.env.VITE_TICKETMASTER_API_KEY,
      city,
      size: 20,
      sort: "date,asc",
    });

    if (classificationId && classificationId !== "Comida") {
      params.append("classificationId", classificationId);
    }

    const response = await fetch(
      `${BACKEND_URL}/api/ticketmaster-events?${params.toString()}`,
    );
    if (!response.ok) {
      console.error(
        "Error al obtener eventos de Ticketmaster:",
        response.statusText,
      );
      return;
    }

    const data = await response.json();
    const rawEvents = data._embedded?.events || [];

    // Eliminar duplicados por nombre
    const uniqueEvents = Array.from(
      rawEvents
        .reduce((map, e) => {
          const key = e.name.toLowerCase();
          if (!map.has(key)) map.set(key, e);
          return map;
        }, new Map())
        .values(),
    );

    // Guardamos en el estado global
    dispatch({ type: "set_events", payload: uniqueEvents });
  } catch (error) {
    console.error("Error en la petición a Ticketmaster:", error);
  }
};
