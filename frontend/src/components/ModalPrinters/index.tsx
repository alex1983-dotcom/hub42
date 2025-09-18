import { useEffect, useState } from "react";
import { FC } from "react";
import { BurgerButtonPropsMini } from "../../types";
import "./index.css";
import { useFetch } from "../../Helpers";
import { Printer } from "../../types";
const url = "http://localhost:8000/api";

export const ModalPrinters: FC<BurgerButtonPropsMini> = ({ isOpen }) => {
   const endpoints = [
      "http://localhost:8000/api/equipment/products/protype-cd400ht/",
      "http://localhost:8000/api/equipment/products/cd400/",
      "http://localhost:8000/api/equipment/products/cd400/",
   ];
   const { printers, loading, error } = useFetch<Printer>(endpoints);

   if (loading) return <p>Loading…</p>;
   if (error) return <p>Ошибка загрузки</p>;

   return (
      <div className={`header__menu ${isOpen ? "active " : ""}`}>
         <h2 className="header__title">Наше Оборудование</h2>

         <ul className="header__menu-list">
            {printers.map((p) => (
               <li key={p.id} className="header__menu-item">
                  <h3 className="header__menu-title">{p.name}</h3>
                  <img src={p.image} alt={p.name} />
                  <h4 className="header__menu-tagline">{p.tagline}</h4>
                  <p className="header__menu-description">{p.description}</p>
               </li>
            ))}
         </ul>
      </div>
   );
};
