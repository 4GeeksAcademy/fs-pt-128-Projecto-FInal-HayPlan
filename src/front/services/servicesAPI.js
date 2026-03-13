const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getEvents = async (dispatch, city) => {
    try {
        const response = await fetch(`${BACKEND_URL}/api/ticketmaster-events?city=${city}`);
        
        if(!response.ok) return;        

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


