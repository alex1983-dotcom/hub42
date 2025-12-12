import React from "react";
import "./index.css";
import { useFetch } from "../../Helpers";
import { FooterSection, UrlSoc1als } from "../../types";
import { NavigationBar } from "../NavigationBar";
import tgPng from "../../assets/stash_telegram.png";
import insPng from "../../assets/mdi_instagram.png";
import { Link } from "react-router-dom";
import { ScrollLink } from "../../Helpers/ScrollLink";

export const Footer = () => {
   const { data, loading, error } = useFetch<FooterSection>(
      "http://localhost:8000/api/pages/footer/1/"
   );
   const { data: urls } = useFetch<UrlSoc1als>(
      "http://localhost:8000/api/social/"
   );

   if (loading) return <p>Loading…</p>;
   if (error) return <p>Ошибка загрузки</p>;

   // безопасно достаём активные ссылки
   const inst = urls?.results?.find?.((s: any) => s.name === "instagram");
   const tg = urls?.results?.find?.((s: any) => s.name === "telegram");

   return (
      <footer className="footer">
         <div className="footer__wrapper">
            <Link to="/">
               <h1 className="logo">{data?.title}</h1>
            </Link>
            <h3 className="footer__title">{data?.subtitle}</h3>
         </div>

         <div className="footer__inner">
            <ul className="header__wrapper-list footer">
               <li className="header__wrapper-item">
                  <ScrollLink to="#equipment">Оборудование</ScrollLink>
               </li>
               <li className="header__wrapper-item">
                  <ScrollLink to="#company">О компании</ScrollLink>
               </li>
               <li className="header__wrapper-item">
                  <ScrollLink to="#services">Наши услуги</ScrollLink>
               </li>
               <li className="header__wrapper-item">
                  <ScrollLink to="#request">Оставить заявку</ScrollLink>
               </li>
               <li className="header__wrapper-item">
                  <ScrollLink to="#FAQ">FAQ</ScrollLink>
               </li>
               <li className="header__wrapper-item">
                  <ScrollLink to="#blog">Блог</ScrollLink>
               </li>
            </ul>

            <div className="footer__UserAgreement">
               <Link to="/privacy" target="_blank" rel="noopener noreferrer">
                  Политикой конфиденциальности
               </Link>
               <Link to="/terms" target="_blank" rel="noopener noreferrer">
                  Пользовательское соглашение
               </Link>
            </div>

            <address className="footer__contacts">
               <p>Контакты:</p>
               <a href="mailto:office@hub.by">{data?.email}</a>
               <a href="tel:+375296999999">{data?.office_phone}</a>

               <div className="footer__pict">
                  {/* показываем иконку только если есть url */}
                  {tg?.url && (
                     <a href={tg.url} target="_blank" rel="noreferrer">
                        <img src={tgPng} alt="telegram" />
                     </a>
                  )}
                  {inst?.url && (
                     <a href={inst.url} target="_blank" rel="noreferrer">
                        <img src={insPng} alt="instagram" />
                     </a>
                  )}
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
