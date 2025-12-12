import React, { useEffect } from "react";
import "./index.css";
import { useFetch } from "../../Helpers";
import { FooterSection, UrlSoc1als } from "../../types";
import { Link } from "react-router-dom";
import { ScrollLink } from "../../Helpers/ScrollLink";

const url = "http://localhost:8000/api";

export const Footer = () => {
   const { data, loading, error } = useFetch<FooterSection>(
      `${url}/pages/footer/1/`
   );
   const { data: urls } = useFetch<UrlSoc1als>(`${url}/social/`);

   const [imgs, setImgs] = React.useState({ img_1: "", img_2: "" });

   /* иконки всегда */
   useEffect(() => {
      const loadIcons = async () => {
         try {
            const [r1, r2] = await Promise.all([
               fetch(`${url}/pages/icons/1/`),
               fetch(`${url}/pages/icons/2/`),
            ]);
            const instIcon = r1.ok ? await r1.json() : null;
            const tgIcon = r2.ok ? await r2.json() : null;
            setImgs({
               img_1: instIcon?.url ?? "",
               img_2: tgIcon?.url ?? "",
            });
         } catch {
            setImgs({ img_1: "", img_2: "" });
         }
      };
      loadIcons();
   }, []);

   if (loading) return <p>Loading…</p>;
   if (error) return <p>Ошибка загрузки</p>;

   const inst = urls?.results?.find((s) => s.name === "instagram");
   const tg = urls?.results?.find((s) => s.name === "telegram");

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
               <a href={`mailto:${data?.email}`}>{data?.email}</a>
               <a href={`tel:${data?.office_phone}`}>{data?.office_phone}</a>

               <div className="footer__pict">
                  {/* иконки всегда, ссылка – если активна */}

                  <a
                     href={tg?.url || undefined}
                     target="_blank"
                     rel="noreferrer"
                  >
                     <img src={imgs.img_2} alt="telegram" />
                  </a>

                  <a
                     href={inst?.url || undefined}
                     target="_blank"
                     rel="noreferrer"
                  >
                     <img src={imgs.img_1} alt="instagram" />
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
