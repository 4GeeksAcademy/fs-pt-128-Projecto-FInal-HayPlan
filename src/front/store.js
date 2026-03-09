export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      },
    ],
    token: localStorage.getItem("token") || null,
    user: null,
    showWelcomeModal: false,  
    events: [] /
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_hello":
      return {
        ...store,
        message: action.payload,
      };

    case "add_task":
      const { id, color } = action.payload;
      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo,
        ),
      };

    case "login":
      return {
        ...store,
        token: action.payload.token,
        user: action.payload.user,
      };

    case "auth_login":
      const { token } = action.payload;
      localStorage.setItem("token", token);
      return {
        ...store,
        token: token,
      };

    case "auth_set_user":
      return {
        ...store,
        user: action.payload,
      };

    case "show_welcome_modal":
      return {
        ...store,
        showWelcomeModal: true,
      };

    case "hide_welcome_modal":
      return {
        ...store,
        showWelcomeModal: false,
      };

    case "auth_logout":
      localStorage.removeItem("token");
      return {
        ...store,
        token: null,
        user: null,
        showWelcomeModal: false,
      };
  
    // Case para manejar los eventos (viene del backend)
    case "set_events":
      return {
        ...store,
        events: action.payload,
      };

    default:
      return store;
  }
}
