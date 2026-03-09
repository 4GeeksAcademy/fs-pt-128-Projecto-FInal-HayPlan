// Usamos la URL de tu Backend (Flask) que ya tienes en el .env
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const getEvents = async (dispatch) => {
    try {
        // LLAMADA A AL BACKEND.
        const response = await fetch(`${BACKEND_URL}/api/ticketmaster-events`);
        
        if(!response.ok) {
            console.error("Error al cargar eventos desde el backend:", response.status);
            return;        
        }

        const data = await response.json();        
        
        const events = data._embedded ? data._embedded.events : [];
        
        dispatch({
            type: "set_events", 
            payload: events 
        });
    } catch (error) {
        console.error("Error de red al obtener eventos:", error);
    }
}
