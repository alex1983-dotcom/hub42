import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { routes } from "../../Routes";
export const ButtonToPrinter = ({ id }: { id: number }) => {
   return (
      <Link to={routes.printerId(id)}>
         <a className="header__menu-button--printer" href="#something">
            К принтеру
         </a>
      </Link>
   );
};
