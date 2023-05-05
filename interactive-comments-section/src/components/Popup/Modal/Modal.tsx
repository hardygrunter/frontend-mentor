import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import styles from "./modal.module.css";

interface ImodalProps {
  children: React.ReactNode;
  onClick: () => void;
}

const onModal = (action: "open" | "close") => {
  if (action === "open") {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
};

export const Modal = ({ children, onClick }: ImodalProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const node = document.getElementById("modal");

  useEffect(() => {
    if (node) {
      document.body.style.paddingRight =
        window.innerWidth - node.offsetWidth + "px";
    }

    ref.current?.focus();

    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("focusout", focusTrap);
    onModal("open");

    return () => {
      document.body.style.paddingRight = "";
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("focusout", focusTrap);
      onModal("close");
    };
  }, []);

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.code === "Escape") {
      onClick();
    }
  };

  const focusTrap = (e: FocusEvent) => {
    if (
      e.relatedTarget instanceof Element &&
      !e.relatedTarget.closest("[aria-modal]")
    ) {
      ref.current?.focus();
    }
  };

  if (!node) {
    return node;
  }

  return ReactDOM.createPortal(
    <div className={styles.listContainer} onClick={onClick} role="alertdialog">
      <div
        ref={ref}
        className={styles.list}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
        aria-modal="true"
      >
        {children}
      </div>
    </div>,
    node
  );
};
