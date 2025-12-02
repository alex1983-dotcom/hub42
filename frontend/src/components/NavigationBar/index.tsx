import React from "react";
import "./index.css";
import { ScrollLink } from "../../Helpers/ScrollLink";
export const NavigationBar = () => {
   return (
      <ul className="header__wrapper-list footer">
         <li className="header__wrapper-item">
            <ScrollLink to="#equipment">Оборудование</ScrollLink>
         </li>
         <li className="header__wrapper-item">
            <ScrollLink to="#company">О компании</ScrollLink>
         </li>
         <li className="header__wrapper-item">
            <ScrollLink to="#services">Наши услуги</ScrollLink>
         </li>
         <li className="header__wrapper-item">
            <ScrollLink to="#request">Оставить заявку</ScrollLink>
         </li>
         <li className="header__wrapper-item">
            <ScrollLink to="#FAQ">FAQ</ScrollLink>
         </li>
         <li className="header__wrapper-item">
            <ScrollLink to="#blog">Блог</ScrollLink>
         </li>
      </ul>
   );
};
