export const login = async (user) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/login`,
            {
                method: "POST",
                body: JSON.stringify(user),
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );

        // Si la respuesta no es exitosa.
        if (!response.ok) {
            const errorData = await response.json();
            return { error: errorData.msg || "Error al iniciar sesión" };
        }

        const data = await response.json();
        return data;
    } catch (error) {
        // Error de red (ej. no hay internet o el servidor está caído)
        return { error: "No se pudo conectar con el servidor" };
    }
};


export const editProfile = async (userData) => {
    try {
        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/editProfile`, 
            {
                method: "PUT",                
                body: JSON.stringify({ username: userData.username }), 
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            return { error: errorData.msg || "Error al actualizar perfil" };
        }

        const data = await response.json();
        return data; // Retorna el usuario actualizado
    } catch (error) {
        return { error: "Error de red al intentar actualizar el perfil" };
    }
};

export const verifyToken = async (token, dispatch) => {
    // Si no hay token, limpiamos el usuario en el estado global
    if (!token) {
        dispatch({ type: "auth_set_user", payload: null });
        return;
    }

    try {
        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/api/get_user`,
            {
                headers: {
                    // Enviamos el token para que el backend nos diga a quién pertenece
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        // Si el token expiró o es inválido (Error 401), cerramos sesión
        if (!response.ok) {
            dispatch({ type: "auth_logout" });
            return;
        }

        // Si el token es válido, guardamos los datos del usuario en el store
        const user = await response.json();
        dispatch({ type: "auth_set_user", payload: user });
    } catch (error) {
        console.error("Error verificando token:", error);        
    }
};

export const getUser = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/get_user`, {
        headers:{
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });
    const data = await response.json()
    if(!response.ok) {
        return false;
    }
    return data;
}

export const getAllPlans = async () => {
    const response = await fetch (`${import.meta.env.VITE_BACKEND_URL}/api/plans`, {
        headers:{
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });
    const data = await response.json()
    if(!response.ok) {
        return false;
    }
    return data;
}

export const getAllGroups = async () => {
    const response = await fetch (`${import.meta.env.VITE_BACKEND_URL}/api/groups`, {
        headers:{
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });
    const data = await response.json()
    if (!response.ok) {
        return false;
    }
    return data;
}