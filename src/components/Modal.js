import React, { useEffect } from "react";
import ReactDom from "react-dom";
import "../styles/modal.css";

function Modal(props) {
  const { isOpen, onClose, title, children } = props;

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDom.createPortal(
    <div className="modal-container">
      <div className="modal">
        <div className="modal-header">
          <h1>{title}</h1>
          <button onClick={onClose}> &#10006;</button>
        </div>
        <div>{children}</div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}

export default Modal;
