import React from "react";
import { Main } from "../../types";
import { useFetch } from "../../Helpers";
import "./index.css";

export const Print = () => {
   const { data, loading, error } = useFetch<Main>(
      "http://localhost:8000/api/pages/blocks/3"
   );

   if (loading) return <p>Loading…</p>;

   if (error) return <p>Ошибка загрузки</p>;
   return (
      <section className="print__section">
         <div className="print__section-block">
            <h2 className="print__section-title">{data?.title}</h2>
            <div className="print__section-wrapper">
               <h3 className="print__section-subtitle">{data?.subtitle}</h3>
               <ul className="print__section-list">
                  {data?.items.map((p, idx) => (
                     <li key={idx} className="print__section-item">
                        <span>0{idx + 1}</span>
                        <p className="print__section-item-description">
                           {p.content}
                        </p>
                     </li>
                  ))}
               </ul>
            </div>
         </div>
      </section>
   );
};
