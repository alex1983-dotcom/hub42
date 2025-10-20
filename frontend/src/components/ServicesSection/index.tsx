import React from "react";
import "./index.css";
import { useFetch } from "../../Helpers";
import { ServicesResponse } from "../../types";
import { ConnectionButton } from "../ConnectionButton";

export const ServicesSection = () => {
   const { data, loading, error } = useFetch<ServicesResponse>(
      "http://localhost:8000/api/pages/services/"
   );

   if (loading) return <p>Loading…</p>;

   if (error) return <p>Ошибка загрузки</p>;
   return (
      <section className="services__section" id="services">
         <h2 className="services__title">
            {data?.results[0]?.parent_block.title ?? "error 404"}
         </h2>
         <div className="services__wrapper">
            <ul className="services__wrapper-list">
               {data?.results.map((serviceType, idx) => (
                  <li key={idx} className="services__wrapper-item">
                     <h3 className="services__wrapper-item-title">
                        <span>0{idx + 1}</span>
                        {serviceType.title}
                     </h3>
                     <div className="services__wrapper-item-inner">
                        <img
                           src={serviceType.icon.url}
                           alt="тут какаят-о картинка"
                           className="services__wrapper-item-inner-img"
                        />
                        <div className="services__wrapper-item-inner-roadmap">
                           <h4 className="services__wrapper-item-inner-roadmap-title">
                              Roadmap
                           </h4>
                           <ul className="services__wrapper-item-inner-roadmap-list">
                              {serviceType.roadmap_items.map(
                                 (roadMap, idx2) => (
                                    <li
                                       className="services__wrapper-item-inner-roadmap-item"
                                       key={idx2}
                                    >
                                       <div className="services__wrapper-item-inner-roadmap-item-description">
                                          <span>0{idx2 + 1}</span>
                                          <p>{roadMap.text}</p>
                                       </div>
                                    </li>
                                 )
                              )}
                           </ul>
                        </div>
                        <div className="services__wrapper-item-inner-offers-wrapper">
                           <div className="services__wrapper-item-inner-offers">
                              <h4 className="services__wrapper-item-inner-offers-title">
                                 Услуги
                              </h4>
                              <ul className="services__wrapper-item-inner-offers-list">
                                 {serviceType.offer_items.map((offer, idx3) => (
                                    <li
                                       className="services__wrapper-item-inner-offers-item"
                                       key={idx3}
                                    >
                                       <div className="services__wrapper-item-inner-offers-item-description">
                                          <p>{offer.text}</p>
                                       </div>
                                    </li>
                                 ))}
                              </ul>
                           </div>
                           <ConnectionButton
                              color="blueBg"
                              content="Связаться"
                           />
                        </div>
                     </div>
                  </li>
               ))}
            </ul>
         </div>
      </section>
   );
};
