import React from "react";
import "./index.css";
import { ButtonColor } from "../../types";

export const ConnectionButton = ({ color }: { color: ButtonColor }) => {
   return (
      <a href="#something" className={`connection__button ${color}`}>
         Связаться
      </a>
   );
};
