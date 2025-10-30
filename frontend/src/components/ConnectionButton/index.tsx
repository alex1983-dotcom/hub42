import React from "react";
import "./index.css";
import { PropsConnectionButtons } from "../../types";

export const ConnectionButton = ({
   bgColor,
   content,
   color,
}: PropsConnectionButtons) => {
   return (
      <a
         href="#request"
         className="connection__button"
         style={{ backgroundColor: `${bgColor}`, color: `${color}` }}
      >
         {content}
      </a>
   );
};
