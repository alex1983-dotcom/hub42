import React from "react";
import "./index.css";
export const NavigationBar = () => {
   return (
      <ul className="header__wrapper-list footer">
         <li className="header__wrapper-item">
            <a href="#equipment">Оборудование</a>
         </li>
         <li className="header__wrapper-item">
            <a href="#company">О компании</a>
         </li>
         <li className="header__wrapper-item">
            <a href="#services">Наши услуги</a>
         </li>
         <li className="header__wrapper-item">
            <a href="#request">Оставить заявку</a>
         </li>
         <li className="header__wrapper-item">
            <a href="#FAQ">FAQ</a>
         </li>
         <li className="header__wrapper-item">
            <a href="#blog">Блог</a>
         </li>
      </ul>
   );
};
