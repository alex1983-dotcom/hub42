import React from "react";
import { ConnectionButton } from "../ConnectionButton";
import { ButtonToPrinter } from "../ButtonToPrinter";

import { Printer } from "../../types";

export const ItemCard = ({ printer }: { printer: Printer }) => {
   return (
      <>
         <li className="header__menu-item">
            <h3 className="header__menu-title">{printer.name}</h3>
            <img src={printer.icon.url} alt={printer.name} />
            <h4 className="header__menu-tagline">{printer.tagline}</h4>
            <p className="header__menu-description">{printer.description}</p>
            <div className="header__menu-buttons">
               <ConnectionButton color="blueBg" content="Оставить заявку" />
               <ButtonToPrinter id={printer.id} />
            </div>
         </li>
      </>
   );
};
