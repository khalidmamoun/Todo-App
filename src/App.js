import MainTodoList from "./Components/MainTodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastProvider } from "./contexts/ToastContext";

import TodoProvider from "./contexts/TodosContext";
const theme = createTheme({
  typography: {
    fontFamily: ["font"],
  },
  palette: {
    primary: {
      main: "#ff0000",
    },
  },
});

function App() {
  return (
    <TodoProvider>
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <div
            className="App"
            style={{
              background: "#191b1f",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              direction: "rtl",
            }}
          >
            <MainTodoList />
          </div>
        </ToastProvider>
      </ThemeProvider>
    </TodoProvider>
  );
}

export default App;
