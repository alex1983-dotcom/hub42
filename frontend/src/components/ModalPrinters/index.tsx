import "./index.css";
import { useEffect } from "react";
import { ListPrinters } from "../ListPrinters";

export const ModalPrinters = ({
   isOpen,
   onClose,
}: {
   isOpen: boolean;
   onClose: () => void;
}) => {
   useEffect(() => {
      const drawer = document.querySelector(".header__menu");
      if (!drawer) return;

      const handleClick = (e: Event) => {
         const target = e.target as Element | null;
         if (!target) return;

         const link = target.closest("a");
         if (link) {
            onClose();
            return;
         }

         const card = target.closest(".header__menu-item");
         if (!card) onClose();
      };

      drawer.addEventListener("click", handleClick);
      return () => drawer.removeEventListener("click", handleClick);
   }, [isOpen, onClose]);

   return (
      <div className={`header__menu ${isOpen ? "active" : ""}`}>
         <h2 className="header__title">Наше Оборудование</h2>
         <ListPrinters />
      </div>
   );
};
