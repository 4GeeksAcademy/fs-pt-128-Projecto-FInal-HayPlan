const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

<<<<<<< Updated upstream
export const getEvents = async (dispatch, city) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/ticketmaster-events?city=${city}`);
        
        if(!response.ok) return;        
=======
export const getTicketmasterEvents = async (
  dispatch,
  city,
  classificationId,
) => {
  if (!BACKEND_URL) return;

  try {
    const params = new URLSearchParams({
      apikey: import.meta.env.VITE_TICKETMASTER_API_KEY,
      city,
      size: 20,
      sort: "date,asc",
    });
>>>>>>> Stashed changes

        const data = await response.json();
        
        // Extrae la lista en bruto de la API
        const rawEvents = data._embedded ? data._embedded.events : [];
        
        // IMPRIME EN LA CONSOLA **** BORRAR ******
        console.log("Lista de eventos encontrados (rawEvents):", rawEvents);

        // Aplicamos el filtro con Map para evitar repetidos por nombre
        const uniqueEventsMap = new Map();
        
        rawEvents.forEach(event => {
            const eventName = event.name.toLowerCase().trim();
            if (!uniqueEventsMap.has(eventName)) {
                uniqueEventsMap.set(eventName, event);
            }
        });

        // 3. Envia al store la lista ya filtrada
        dispatch({
            type: "set_events", 
            payload: Array.from(uniqueEventsMap.values()) 
        });

    } catch (error) {
        console.error("Error de red:", error);
    }
}

<<<<<<< Updated upstream

=======
    const response = await fetch(
      `${BACKEND_URL}/api/ticketmaster-events?${params.toString()}`,
    );

    if (!response.ok) return;

    const data = await response.json();
    const rawEvents = data._embedded?.events || [];

    // Elimina duplicados por nombre
    const uniqueEvents = Array.from(
      rawEvents
        .reduce((map, e) => {
          const key = e.name?.toLowerCase() || "sin-nombre";
          if (!map.has(key)) map.set(key, e);
          return map;
        }, new Map())
        .values(),
    );

    // Guarda en el estado global
    dispatch({ type: "set_events", payload: uniqueEvents });
  } catch (error) {}
};
>>>>>>> Stashed changes
