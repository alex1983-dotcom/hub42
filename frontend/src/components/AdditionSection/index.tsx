import React from "react";
import { ConnectionButton } from "../ConnectionButton";
import "./index.css";

export const AdditionSection = () => {
   return (
      <section className="addition__section">
         <h2 className="addition__section-title">
            Наши клиенты запускают печать без оснастки, получают детали за часы,
            а не недели
         </h2>
         <ConnectionButton color="whiteBg" content="Связаться" />
      </section>
   );
};
