import React from "react";
import "./index.css";
import { MyForm } from "../Form";
import { useFetch } from "../../Helpers";
import { IconsResponse } from "../../types";
import { useSelector } from "react-redux";
import { getIdPrinter } from "../../store/selectors";
import clsx from "clsx";

const myData = {
   title: "Рассчитаем, сколько вы сэкономите с 3D-печатью",
   subtitle: "Проведем оценку на вашем производстве ",
   items: [
      {
         id: 1,
         content: "Как ускорить производство",
      },
      {
         id: 2,
         content: "Сколько сэкэномите денег",
      },

      {
         id: 3,
         content:
            "Какие детали можно перевести на 3d-печать в вашем производстве",
      },
   ],
};

export const FormRequest = () => {
   const { data, loading, error } = useFetch<IconsResponse>(
      "http://localhost:8000/api/pages/icons/"
   );

   const currentId = useSelector(getIdPrinter);
   const sectionClass = clsx("formrequest__section", {
      printer: typeof currentId === "number",
   });

   if (loading) return <p>Loading…</p>;

   if (error) return <p>Ошибка загрузки</p>;

   return (
      <section className={sectionClass} id="request">
         <div className="formrequest__section-wrapper">
            <div className="formrequest__section-content">
               <h3 className="formrequest__section-title">{myData.title}</h3>
               <h2 className="formrequest__section-subtitle">
                  {myData.subtitle}
               </h2>
               <ul className="formrequest__section-list">
                  {myData.items.map((p, idx) => (
                     <li className="formrequest__section-item" key={idx}>
                        <div className="formrequest__section-item-description">
                           <p>{p.content}</p>
                        </div>
                     </li>
                  ))}
               </ul>
            </div>
            <MyForm />
         </div>
         {data?.results.map((icon, idx) => (
            <React.Fragment key={idx}>
               {(icon.id === 22 || icon.id === 23) && (
                  <img
                     src={icon.url}
                     alt={icon.name}
                     className={
                        icon.id === 22
                           ? "formrequest__section-img left"
                           : "formrequest__section-img right"
                     }
                  />
               )}
            </React.Fragment>
         ))}
      </section>
   );
};
