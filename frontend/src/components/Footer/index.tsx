import React from "react";
import "./index.css";
import { useFetch } from "../../Helpers";
import { FooterSection } from "../../types";
import { NavigationBar } from "../NavigationBar";
import tgPng from "../../assets/stash_telegram.png";
import insPng from "../../assets/mdi_instagram.png";
export const Footer = () => {
   const { data, loading, error } = useFetch<FooterSection>(
      "http://localhost:8000/api/pages/footer/1/"
   );

   if (loading) return <p>Loading…</p>;

   if (error) return <p>Ошибка загрузки</p>;
   return (
      <footer className="footer">
         <div className="footer__wrapper">
            <h1 className="logo">{data?.title}</h1>
            <h3 className="footer__title">{data?.subtitle}</h3>
         </div>
         <div className="footer__inner">
            <NavigationBar />
            <div className="footer__UserAgreement">
               <a href="">Пользовательское соглашение</a>
               <a href="">Политика конфиденциальности</a>
            </div>
            <address className="footer__contacts">
               <p>Контакты:</p>
               <a href="mailto:office@hub.by">{data?.email}</a>
               <a href="tel:+375296999999">{data?.office_phone}</a>
               <div className="footer__pict">
                  <a href="some">
                     <img src={tgPng} alt="" />
                  </a>
                  <a href="some">
                     <img src={insPng} alt="" />
                  </a>
               </div>
            </address>
            <address className="footer__address">
               <p>Офис:</p>
               <p>{data?.office_address}</p>
            </address>
         </div>
      </footer>
   );
};
