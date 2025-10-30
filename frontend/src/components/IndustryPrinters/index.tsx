import React from "react";
import { Icon, Main } from "../../types";
import { useFetch } from "../../Helpers";
import "./index.css";
import { ConnectionButton } from "../ConnectionButton";

export const IndustryPrinters = () => {
   const {
      data: blockData,
      loading: blockLoading,
      error: blockError,
   } = useFetch<Main>("http://localhost:8000/api/pages/blocks/2");
   const {
      data: iconData,
      loading: iconLoading,
      error: iconError,
   } = useFetch<Icon>("http://localhost:8000/api/pages/icons/3/");
   const loading = blockLoading || iconLoading;
   const error = blockError || iconError;
   if (loading) return <p>Loading…</p>;

   if (error) return <p>Ошибка загрузки</p>;
   return (
      <section className="industry__section">
         <div className="industry__section-block">
            <h1 className="industry__title">{blockData?.title}</h1>
            <p className="industry__content">{blockData?.content}</p>
            <div className="industry__wrapper-buttons">
               <ConnectionButton color="white" content="Оставить заявку" bgColor="#3c3aa5"/>
               <a href="#equipment" className="industry__section-toPrinter">
                  К принтерам
               </a>
            </div>
         </div>
         <img src={iconData?.url} alt="" className="industry__section-img" />
      </section>
   );
};
