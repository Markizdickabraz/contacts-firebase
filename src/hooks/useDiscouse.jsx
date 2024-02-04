import { useState } from "react";

const useDiscouse = () => {

    const [isOpen, setIsOpen] = useState(false);

   const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };
    return { onClose, onOpen, isOpen };
}

export default useDiscouse;
