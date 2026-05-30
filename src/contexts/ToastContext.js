import { createContext, useState, useContext, useRef } from "react";
import SnackBar from "../Components/SnackBar";

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const timerRef = useRef(null);

  function showToast(msg) {
    setMessage(msg);
    setOpen(true);

    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setOpen(false);
    }, 2000);
  }

  return (
    <ToastContext.Provider value={showToast}>
      <SnackBar open={open} message={message} />
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
