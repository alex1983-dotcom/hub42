import React, { useRef, useState } from "react";
import "./index.css";
import { useFetch } from "../../Helpers";
import { Main } from "../../types";
import { ConnectionButton } from "../ConnectionButton";
import closeAccord from "../../assets/close_accord.png";
import openAccord from "../../assets/open_accord.png";
import { Link } from "react-router-dom";
import { routes } from "../../Routes";

export const ReviewsAnswersAccordion = ({
   url,
   idSection,
}: {
   url: string;
   idSection: string;
}) => {
   const [openId, setId] = useState<number | null>(0);
   const itemRef = useRef<HTMLParagraphElement | null>(null);

   const clickHandler = (id: number) => {
      if (id === openId) setId(null);
      else setId(id);
   };

   const { data, loading, error } = useFetch<Main>(url);

   if (loading) return <p>Loading…</p>;

   if (error) return <p>Ошибка загрузки</p>;
   return (
      <section className="accordion__section" id={idSection}>
         <h2 className="accordion__section-title">{data?.title}</h2>
         <div className="accordion__section-inner">
            <div className="accordion__section-wrapper">
               <h3 className="accordion__section-subtitle">{data?.subtitle}</h3>
               <p className="accordion__section-content">{data?.content}</p>
            </div>
            <div className="accordion__section-accordion">
               <ul className="accordion__section-list">
                  {data?.items.map((p, idx) => (
                     <li key={idx} className="accordion__section-item">
                        <button
                           className="accordion__section-item-button"
                           onClick={() => {
                              clickHandler(idx);
                           }}
                        >
                           <h4 className="accordion__section-item-title">
                              {p.title}
                           </h4>
                           <img
                              src={idx === openId ? closeAccord : openAccord}
                              alt=""
                              className="accordion__section-item-img"
                           />
                        </button>
                        <div
                           className={`accordion__secton-item-collapse ${
                              idx === openId ? "open" : ""
                           }`}
                        >
                           <p
                              className="accordion__section-item-content"
                              ref={itemRef}
                           >
                              {p.content}
                           </p>
                           {idx === 0 &&
                              (data.title === "О компании" ? (
                                 <div className="accordion__section-item-wrapper-link">
                                    <Link
                                       to={routes.opinions}
                                       className="accordion__section-item-link"
                                    >
                                       {" "}
                                       К Отзывам
                                    </Link>
                                 </div>
                              ) : (
                                 <div className="accordion__section-item-wrapper-link">
                                    <ConnectionButton
                                       color="white"
                                       content="Связаться"
                                       bgColor="#3c3aa5"
                                    />
                                 </div>
                              ))}
                        </div>
                     </li>
                  ))}
               </ul>
            </div>
         </div>
      </section>
   );
};
