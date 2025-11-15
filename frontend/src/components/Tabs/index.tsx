import React from "react";
import { Link } from "react-router-dom";
import "./index.css";
export const Tabs = ({
   isReviewPage,
   content,
}: {
   isReviewPage: boolean;
   content: string;
}) => {
   return (
      <div
         className={
            isReviewPage
               ? "printer__section-navigation forOpinions"
               : "printer__section-navigation"
         }
      >
         <Link to="/" className="printer__section-linkToMain">
            Главная
         </Link>
         <span className="printer__section-span">/</span>
         <span className="printer__section-span">{content}</span>
      </div>
   );
};
