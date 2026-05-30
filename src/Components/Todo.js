// MUI Components
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import IconButton from "@mui/material/IconButton";

import "../Styles/mainCss.css";
import { useToast } from "../contexts/ToastContext";

// React hooks + context
import { UseTodos } from "../contexts/TodosContext";
// Component
export default function Todo({ todo, HandleUpdateOpen, HandleClickDeleted }) {
  // context
  const { dispatch } = UseTodos();

  const toast = useToast();

  // complete todo
  function HandleClickchiledTrue() {
    dispatch({
      type: "Handleclicked",
      payload: {
        id: todo.id,
      },
    });

    toast("تم إكمال المهمة بنجاح");
  }

  return (
    <>
      <Card
        className="Todo"
        sx={{
          minWidth: 275,
          padding: 2,
          textAlign: "right",
          marginTop: 5,

          textDecoration: todo.completed ? "line-through" : "none",
        }}
        style={{
          background: "#000000",
          color: "#ffffff",
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            {/* todo data */}
            <Grid size={8}>
              <Typography variant="h5">{todo.title}</Typography>

              <Typography variant="h6">{todo.details}</Typography>
            </Grid>

            {/* buttons */}
            <Grid
              size={4}
              style={{
                color: "#e2e8f0",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              {/* complete */}
              <IconButton
                onClick={HandleClickchiledTrue}
                className="btn"
                aria-label="check"
                style={{
                  background: todo.completed ? "#22c55e" : "#334155",

                  color: todo.completed ? "#334155" : "#22c55e",

                  border: "2px solid #1e293b",
                }}
              >
                <CheckIcon />
              </IconButton>

              {/* edit */}
              <IconButton
                onClick={() => {
                  HandleUpdateOpen(todo);
                }}
                className="btn"
                aria-label="edit"
                style={{
                  background: "#3b82f6",
                  color: "#ffffff",
                  border: "2px solid #1e3a8a",
                }}
              >
                <EditIcon />
              </IconButton>

              {/* delete */}
              <IconButton
                onClick={() => {
                  HandleClickDeleted(todo);
                }}
                className="btn"
                aria-label="delete"
                style={{
                  background: "#ef4444",
                  color: "#ffffff",
                  border: "2px solid #7f1d1d",
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
