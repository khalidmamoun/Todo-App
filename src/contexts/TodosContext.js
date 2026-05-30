import { createContext, useReducer , useContext } from "react";
import { ReducerAdd } from "../reducer/Reducer";


export const TodoContext = createContext([]);

const TodoProvider = ({ children }) => {
  const [Todos, DispatchTodos] = useReducer(ReducerAdd, []);
  return (
    <TodoContext.Provider value={{ todo: Todos, dispatch: DispatchTodos }}>
      {children}
    </TodoContext.Provider>
  );
};

 export const UseTodos = () =>   useContext(TodoContext)
export default TodoProvider;
