import React from "react";
import { ConnectionButton } from "../ConnectionButton";
import { ButtonToPrinter } from "../ButtonToPrinter";

import { Printer } from "../../types";

export const ItemCard = ({ id, name, tagline, description, icon }: Printer) => {
   return (
      <>
         <h3 className="header__menu-title">{name}</h3>
         <img src={icon.url} alt={name} />
         <h4 className="header__menu-tagline">{tagline}</h4>
         <p className="header__menu-description">{description}</p>
         <div className="header__menu-buttons">
            <ConnectionButton color="blueBg" content="Оставить заявку" />
            <ButtonToPrinter id={id} />
         </div>
      </>
   );
};
