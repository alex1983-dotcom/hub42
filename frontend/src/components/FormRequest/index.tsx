import React from "react";
import "./index.css";
import { MyForm } from "../Form";
import { useFetch } from "../../Helpers";
import { IconsResponse } from "../../types";
import { useSelector } from "react-redux";
import { getIdPrinter } from "../../store/selectors";
import clsx from "clsx";
import { useLocation } from "react-router-dom";

const myData = {
   contact: {
      title: "Рассчитаем, сколько вы сэкономите с 3D-печатью",
      subtitle: "Проведем оценку на вашем производстве",
      items: [
         "Как ускорить производство",
         "Сколько сэкономите денег",
         "Какие детали можно перевести на 3d-печать в вашем производстве",
      ],
   },
   review: {
      title: "Оставить отзыв",
      subtitle: "Ваше мнение важно для нас",
      items: [
         "Заполните форму",
         "Наш администратор свяжется с вами для уточнения деталей",
      ],
   },
};

export const FormRequest = () => {
   const { data, loading, error } = useFetch<IconsResponse>(
      "http://localhost:8000/api/pages/icons/"
   );
   const { pathname } = useLocation(); // /opinions
   const isOpinionsPage = pathname === "/opinions";
   const currentId = useSelector(getIdPrinter);
   const sectionClass = clsx("formrequest__section", {
      printer: typeof currentId === "number" || isOpinionsPage,
   });

   if (loading) return <p>Loading…</p>;

   if (error) return <p>Ошибка загрузки</p>;

   const info = isOpinionsPage ? myData.review : myData.contact;

   return (
      <section className={sectionClass} id="request">
         <div className="formrequest__section-wrapper">
            <div className="formrequest__section-content">
               <h3 className="formrequest__section-title">{info.title}</h3>
               <h2 className="formrequest__section-subtitle">
                  {info.subtitle}
               </h2>
               <ul className="formrequest__section-list">
                  {info.items.map((p, idx) => (
                     <li className="formrequest__section-item" key={idx}>
                        <div className="formrequest__section-item-description">
                           <p>{p}</p>
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
