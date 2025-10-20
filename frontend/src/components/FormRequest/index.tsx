import React from "react";
import "./index.css";
import { MyForm } from "../Form";

const data = {
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
   return (
      <section className="formrequest__section" id="request">
         <div className="formrequest__section-wrapper">
            <div className="formrequest__section-content">
               <h3 className="formrequest__section-title">{data.title}</h3>
               <h2 className="formrequest__section-subtitle">
                  {data.subtitle}
               </h2>
               <ul className="formrequest__section-list">
                  {data.items.map((p, idx) => (
                     <li className="formrequest__section-item">
                        <div className="formrequest__section-item-description">
                           <p>{p.content}</p>
                        </div>
                     </li>
                  ))}
               </ul>
            </div>
            <MyForm />
         </div>
      </section>
   );
};
