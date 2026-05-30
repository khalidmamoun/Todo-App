import * as React from "react";

import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { styled } from "@mui/material/styles";
import { useState, useEffect, useContext, useMemo } from "react";

import Todo from "./Todo";

import { useToast } from "../contexts/ToastContext";
import { UseTodos } from "../contexts/TodosContext";
// =========================
// Styled Filter Buttons
// =========================
const StyledToggleButtonGroup = styled(ToggleButtonGroup)(() => ({
  gap: "10px",

  "& .MuiToggleButton-root": {
    borderRadius: "12px",
    border: "1px solid #334155",
    color: "#e2e8f0",
    background: "#0f172a",
    padding: "8px 16px",
    textTransform: "none",
  },

  "& .MuiToggleButton-root.Mui-selected": {
    background: "#3b82f6",
    color: "#ffffff",
    border: "1px solid #3b82f6",
  },

  "& .MuiToggleButton-root:hover": {
    background: "#1e293b",
  },
}));

export default function MainTodoList() {
  const { todo: Todos, dispatch: Dispatch } = UseTodos();
  const toast = useToast();

  const [InputTodos, setInputTodos] = useState("");
  const [CompletedTodos, SetCompletedTodos] = useState("All");

  // update dialog
  const [HandleOpenUpdate, SetHandleOpenUpdate] = useState(false);
  const [UpdatedTodo, SetUpdatedTodo] = useState({
    id: "",
    title: "",
    details: "",
  });

  // delete dialog
  const [DeleteTodo, SetDeleteTodo] = useState(false);
  const [DeletedTodoState, SetDeletedTodoState] = useState(null);

  // =========================
  // Load LocalStorage
  // =========================
  useEffect(() => {
    Dispatch({
      type: "getStorage",
    });
  }, []);

  // =========================
  // Add Todo
  // =========================
  function HandleClicked() {
    Dispatch({
      type: "add",
      payload: {
        title: InputTodos,
      },
    });

    setInputTodos("");
    toast("تمت الإضافة بنجاح");
  }

  // =========================
  // Open Update
  // =========================
  function HandleUpdateOpen(todo) {
    SetUpdatedTodo(todo);
    SetHandleOpenUpdate(true);
  }

  function HandleCloseDialogUpdate() {
    SetHandleOpenUpdate(false);
  }

  function HandleUpdateTodosAdd() {
    Dispatch({
      type: "update",
      payload: {
        id: UpdatedTodo.id,
        title: UpdatedTodo.title,
        details: UpdatedTodo.details,
      },
    });

    toast("تم تعديل المهمة بنجاح");
    SetHandleOpenUpdate(false);

    console.log(UpdatedTodo);
  }

  // =========================
  // Delete Todo
  // =========================
  function HandleClickDeleted(todo) {
    SetDeletedTodoState(todo);
    SetDeleteTodo(true);
  }

  function HandleCloseDialog() {
    SetDeleteTodo(false);
  }

  function HandleClickDeletedConfirm() {
    Dispatch({
      type: "delete",
      payload: {
        id: DeletedTodoState.id,
      },
    });

    toast("تم الحذف بنجاح");
    SetDeleteTodo(false);
  }

  // =========================
  // Filter
  // =========================
  const filteredTodos = useMemo(() => {
    if (CompletedTodos === "Completed") {
      return Todos.filter((t) => t.completed);
    }

    if (CompletedTodos === "NotCompleted") {
      return Todos.filter((t) => !t.completed);
    }

    return Todos;
  }, [Todos, CompletedTodos]);

  return (
    <>
      {/* ========================= */}
      {/* UPDATE DIALOG */}
      {/* ========================= */}
      <Dialog
        open={HandleOpenUpdate}
        onClose={HandleCloseDialogUpdate}
        style={{ direction: "rtl" }}
      >
        <DialogTitle>تعديل المهمة</DialogTitle>

        <DialogContent>
          <TextField
            value={UpdatedTodo.title}
            onChange={(e) =>
              SetUpdatedTodo({ ...UpdatedTodo, title: e.target.value })
            }
            fullWidth
            margin="dense"
            label="العنوان"
          />

          <TextField
            value={UpdatedTodo.details}
            onChange={(e) =>
              SetUpdatedTodo({ ...UpdatedTodo, details: e.target.value })
            }
            fullWidth
            margin="dense"
            label="التفاصيل"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={HandleCloseDialogUpdate}>اغلاق</Button>
          <Button onClick={HandleUpdateTodosAdd}>تعديل</Button>
        </DialogActions>
      </Dialog>

      {/* ========================= */}
      {/* DELETE DIALOG */}
      {/* ========================= */}
      <Dialog
        open={DeleteTodo}
        onClose={HandleCloseDialog}
        style={{ direction: "rtl" }}
      >
        <DialogTitle>تأكيد الحذف</DialogTitle>

        <DialogContent>
          <DialogContentText>هل أنت متأكد من حذف هذه المهمة؟</DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={HandleCloseDialog}>اغلاق</Button>
          <Button onClick={HandleClickDeletedConfirm}>حذف</Button>
        </DialogActions>
      </Dialog>

      {/* ========================= */}
      {/* MAIN UI */}
      {/* ========================= */}
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        <Card sx={{ padding: 2, maxHeight: "80vh", overflowY: "scroll" }}>
          <CardContent>
            <Typography variant="h3">مهامي</Typography>

            <Divider sx={{ my: 2 }} />

            {/* FILTER */}
            <StyledToggleButtonGroup
              value={CompletedTodos}
              exclusive
              onChange={(e, value) => {
                if (value !== null) SetCompletedTodos(value);
              }}
            >
              <ToggleButton value="All">الكل</ToggleButton>
              <ToggleButton value="Completed">منجز</ToggleButton>
              <ToggleButton value="NotCompleted">غير منجز</ToggleButton>
            </StyledToggleButtonGroup>

            {/* TODOS */}
            {filteredTodos.map((t) => (
              <Todo
                key={t.id}
                todo={t}
                HandleUpdateOpen={HandleUpdateOpen}
                HandleClickDeleted={HandleClickDeleted}
              />
            ))}
          </CardContent>

          {/* ========================= */}
          {/* ADD TODO */}
          {/* ========================= */}
          <Card sx={{ padding: 2, marginTop: 3 }}>
            <Grid container spacing={2}>
              <Grid size={8}>
                <TextField
                  value={InputTodos}
                  onChange={(e) => setInputTodos(e.target.value)}
                  fullWidth
                  label="المهمة"
                />
              </Grid>

              <Grid size={4}>
                <Button
                  onClick={HandleClicked}
                  fullWidth
                  variant="contained"
                  style={{ height: "100%" }}
                  disabled={!InputTodos}
                >
                  إضافة
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Card>
      </Container>
    </>
  );
}
