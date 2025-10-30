import React from "react";
import { ConnectionButton } from "../ConnectionButton";
import "./index.css";
import { PropsAdditionSection } from "../../types";
import { useSelector } from "react-redux";
import { getIdPrinter } from "../../store/selectors";
import clsx from "clsx";

export const AdditionSection = ({
   color,
   bgColor,
   content,
   mainContent,
}: PropsAdditionSection) => {
   const currentId = useSelector(getIdPrinter);
   const sectionClass = clsx("addition__section", {
      printer: typeof currentId === "number",
   });
   return (
      <section className={sectionClass}>
         <h2 className="addition__section-title">{mainContent}</h2>
         <ConnectionButton color={color} content={content} bgColor={bgColor} />
      </section>
   );
};
