import React from "react";
import { ConnectionButton } from "../ConnectionButton";
import "./index.css";
import { PropsAdditionSection } from "../../types";

export const AdditionSection = ({
   color,
   bgColor,
   content,
   mainContent,
}: PropsAdditionSection) => {
   return (
      <section className="addition__section">
         <h2 className="addition__section-title">{mainContent}</h2>
         <ConnectionButton color={color} content={content} bgColor={bgColor} />
      </section>
   );
};
