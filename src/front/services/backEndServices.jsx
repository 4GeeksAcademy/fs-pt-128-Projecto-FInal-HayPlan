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

export const getGroupPlans = async (groupId) => {
    const response = await fetch (`${import.meta.env.VITE_BACKEND_URL}/api/groups/${groupId}/plans`, {
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

export const getGroupMembers = async (groupId) => {
    const response = await fetch (`${import.meta.env.VITE_BACKEND_URL}/api/groups/${groupId}/members`, {
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

export const getGroup = async (groupId) => {
    const response = await fetch (`${import.meta.env.VITE_BACKEND_URL}/api/groups/${groupId}`, {
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

export const getTopPlans = async (groupId) => {
    const response = await fetch (`${import.meta.env.VITE_BACKEND_URL}/api/groups/${groupId}/plans/top`, {
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
export const createGroup = async (groupData) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/groups`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(groupData)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            return false;
        }
        return data;
    } catch (error) {
        console.error("Error creating group:", error);
        return false;
    }
};


export const createPlan = async (groupId, planData) => {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/groups/${groupId}/plans`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(planData)
        });
        if (response.ok) {
            return await response.json();
        }
        return null;
    } catch (error) {
        console.error("Error creating plan:", error);
        return null;
    }
};

export const searchGroup = async (code) => {
    const response = await fetch (`${import.meta.env.VITE_BACKEND_URL}/api/groups/${code}`, {
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

export const addMember = async (groupId, memberId) => {
    const response = await fetch (`${import.meta.env.VITE_BACKEND_URL}/api/groups/${groupId}/members`, {
        method: "POST",
        headers:{
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ user_id: memberId })
    });
    const data = await response.json()
    if (!response.ok) {
        return false;
    }
    return data;
}
export const deleteMember = async (groupId, memberId) => {
    const response = await fetch (`${import.meta.env.VITE_BACKEND_URL}/api/groups/${groupId}/members/${memberId}`, {
        method: "DELETE",
        headers:{
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        }
    });
    const data = await response.json()
    if (!response.ok) {
        return false;
    }
    return data;
}

export const getVotePlan = async (groupId, planId) => {
    const response = await fetch (`${import.meta.env.VITE_BACKEND_URL}/api/groups/${groupId}/plans/${planId}/votes`, {
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

export const advanceStatus = async (groupId, planId) => {
    const response = await fetch (`${import.meta.env.VITE_BACKEND_URL}/api/groups/${groupId}/plans/${planId}/advance_status`, {
        method: "POST",
        headers:{
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        }
    });
    const data = await response.json()
    if (!response.ok) {
        return false;
    }
    return data;
}

export const getMemoriesPlan = async (groupId, planId) => {
    const response = await fetch (`${import.meta.env.VITE_BACKEND_URL}/api/groups/${groupId}/plans/${planId}/memories`, {
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
export const addMemoryPlan = async (groupId, planId, comment) => {
    const response = await fetch (`${import.meta.env.VITE_BACKEND_URL}/api/groups/${groupId}/plans/${planId}/memories`, {
        method: "POST",
        headers:{
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ comment: comment })
    });
    const data = await response.json()
    if (!response.ok) {
        return false;
    }
    return data;
}
export const votePlan = async (groupId, planId, vote) => {
    const response = await fetch (`${import.meta.env.VITE_BACKEND_URL}/api/groups/${groupId}/plans/${planId}/vote`, {
        method: "POST",
        headers:{
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ vote })
    });
    const data = await response.json()
    if (!response.ok) {
        return false;
    }
    return data;
}
export const ratePlan = async (groupId, planId, score) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/groups/${groupId}/plans/${planId}/rating`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ score })
    });

    const data = await response.json();

    if (!response.ok) {
        console.error(data);
        return false;
    }

    return data;
};