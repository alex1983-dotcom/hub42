// src/Helpers/ScrollLink.tsx
import { useNavigate } from "react-router-dom";

export const ScrollLink = ({
   to,
   children,
}: {
   to: string;
   children: React.ReactNode;
}) => {
   const navigate = useNavigate();

   const handleClick = () => {
      // 1. уходим на главную С хэшем сразу
      navigate("/" + to); // /#company, /#services и т.д.

      // 2. ждём полного монтирования Home, затем скроллим
      setTimeout(() => {
         const id = to.replace("#", "");
         const el = document.getElementById(id);
         if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300); // 100 мс надёжно
   };

   return (
      <a
         href="/"
         onClick={(e) => {
            e.preventDefault();
            handleClick();
         }}
      >
         {children}
      </a>
   );
};
