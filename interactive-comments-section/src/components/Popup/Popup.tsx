import React, { useState } from "react";
import { Modal } from "./Modal/Modal";
import styles from "./popup.module.css";

interface Idropdown {
  button: React.ReactNode;
  children: (handleClose: () => void) => React.ReactNode;
  isOpen?: boolean;
}

let prevElem: null | Element;

export const Popup = ({ button, children, isOpen = false }: Idropdown) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(isOpen);

  const handleOpen = () => {
    if (isDropdownOpen) {
      return;
    }

    prevElem = document.activeElement;
    setIsDropdownOpen(true);
  };

  const handleClose = () => {
    if (!isDropdownOpen) {
      return;
    }
    setIsDropdownOpen(false);

    setTimeout(() => {
      if (prevElem instanceof HTMLElement) {
        prevElem.focus();
      }
    });
  };

  return (
    <div className={styles.container}>
      <div onClick={handleOpen}>{button}</div>
      {isDropdownOpen && (
        <Modal onClick={handleClose}>{children(handleClose)}</Modal>
      )}
    </div>
  );
};
