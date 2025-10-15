import React from "react";
import "./index.css";
import { ButtonColor, ButtonContent } from "../../types";

export const ConnectionButton = ({ color,content }: { color: ButtonColor,content: ButtonContent }) => {
   return (
      <a href="#something" className={`connection__button ${color}`}>
         {content}
      </a>
   );
};
