import { useEffect } from "react";
import "./index.css";

export const NavDrawer = ({
   isOpen,
   onClose,
}: {
   isOpen: boolean;
   onClose: () => void;
}) => {
   useEffect(() => {
      const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
      if (isOpen) window.addEventListener("keydown", esc);
      return () => window.removeEventListener("keydown", esc);
   }, [isOpen, onClose]);

   if (!isOpen) return null;

   return (
      <>
         <div className="nav-drawer-overlay" onClick={onClose} />
         <aside className="nav-drawer">
         
            <nav className="nav-drawer-nav">
               <a href="#equipment" onClick={onClose}>
                  Оборудование
               </a>
               <a href="#company" onClick={onClose}>
                  О компании
               </a>
               <a href="#services" onClick={onClose}>
                  Наши услуги
               </a>
               <a href="#request" onClick={onClose}>
                  Оставить заявку
               </a>
               <a href="#FAQ" onClick={onClose}>
                  FAQ
               </a>
               <a href="#blog" onClick={onClose}>
                  Блог
               </a>
            </nav>
         </aside>
      </>
   );
};
