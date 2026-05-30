import { v4 as uuidv4 } from "uuid";

export function ReducerAdd(currentState, actions) {
  switch (actions.type) {
    case "add": {
      const todosNew = {
        id: uuidv4(),
        title: actions.payload.title,
        details: "",
        completed: false,
      };

      const UpdatedTodos = [...currentState, todosNew];

      localStorage.setItem("Todos", JSON.stringify(UpdatedTodos));
      return UpdatedTodos;
    }
    case "delete": {
      const UpdatedTodos = currentState.filter(
        (t) => t.id !== actions.payload.id,
      );

      localStorage.setItem("Todos", JSON.stringify(UpdatedTodos));
      return UpdatedTodos;
    }
    case "update": {
      const UpdatedTodos = currentState.map((t) =>
        t.id === actions.payload.id
          ? {
              ...t,
              title: actions.payload.title,
              details: actions.payload.details,
            }
          : t,
      );

      localStorage.setItem("Todos", JSON.stringify(UpdatedTodos));
      return UpdatedTodos;
    }
    case "getStorage": {
      const storage = JSON.parse(localStorage.getItem("Todos")) || [];
      return storage;
    }
    case "Handleclicked": {
      const updatedTodo = currentState.map((t) => {
        if (t.id === actions.payload.id) {
          return {
            ...t,
            completed: !t.completed,
          };
        }
        return t;
      });

      localStorage.setItem("Todos", JSON.stringify(updatedTodo));

      return updatedTodo;
    }

    default: {
      throw new Error("Unknown action: " + actions.type);
    }
  }
}
