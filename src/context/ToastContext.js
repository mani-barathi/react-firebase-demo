import React, { createContext, useContext, useState } from "react";
import "../styles/toast.css";

const ToastContext = createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  function addToast(newToast) {
    const id = setTimeout(() => deleteToast(id), 5500);
    const type = newToast.type || "info";
    setToasts((prev) => [...prev, { id, ...newToast, type }]);
    return id;
  }

  function deleteToast(toastId) {
    clearTimeout(toastId);
    setToasts((prev) => prev.filter((t) => t.id !== toastId));
  }

  return (
    <ToastContext.Provider value={{ addToast, deleteToast }}>
      {children}
      {toasts && (
        <div className="toast-container">
          {toasts.map((t) => (
            <div className={`toast ${t.type}`} key={t.id}>
              <div className="toast-header">
                <h3 className="toast-title">{t.title}</h3>
                <span onClick={() => deleteToast(t.id)} className="toast-btn">
                  &times;
                </span>
              </div>
              <p className="toast-text">{t.text || ""}</p>
            </div>
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);

export default ToastProvider;
