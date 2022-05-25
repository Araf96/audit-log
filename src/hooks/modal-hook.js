import { useCallback, useState } from "react";

export const useModal = () => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const modalOpenHandler = useCallback((text, type) => {
    setModalState({ isOpen: true, message: text, type: type });
  });

  const modalCloseHandler = () => {
    setModalState({ isOpen: false, message: "", type: "" });
  };

  return [modalState, modalOpenHandler, modalCloseHandler];
};
