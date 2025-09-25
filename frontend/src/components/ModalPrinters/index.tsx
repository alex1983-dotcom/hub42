import React, { useMemo } from "react";
import { BurgerButtonPropsMini } from "../../types";
import { useFetch } from "../../Helpers";
import { Printer } from "../../types";
import "./index.css";
import { ButtonRequest } from "../ButtonRequest";
import { ButtonToPrinter } from "../ButtonToPrinter";

const ENDPOINTS = [
   "http://localhost:8000/api/equipment/products/cd400/",
   "http://localhost:8000/api/equipment/products/cd400ht",
   "http://localhost:8000/api/equipment/products/filo",
];

export const ModalPrinters: React.FC<BurgerButtonPropsMini> = ({ isOpen }) => {
   const endpoints = useMemo(() => ENDPOINTS, []);
   const { printers, loading, error } = useFetch<Printer>(endpoints);

   if (loading) return <p>Loading…</p>;

   if (error) return <p>Ошибка загрузки</p>;



   return     (
      <div className={`header__menu ${isOpen ? "active" : ""}`}>
         <h2 className="header__title">Наше Оборудование</h2>
         <ul className="header__menu-list">
            {printers.map((p, idx) => (
               <li key={idx} className="header__menu-item">
                  <h3 className="header__menu-title">{p.name}</h3>
                  <img src={p.icon.url} alt={p.name} />
                  <h4 className="header__menu-tagline">{p.tagline}</h4>
                  <p className="header__menu-description">{p.description}</p>
                  <div className="header__menu-buttons">
                     <ButtonRequest />
                     <ButtonToPrinter />
                  </div>
               </li>
            ))}
         </ul>
      </div>
   );
};
