import { useEffect, useState } from "react";
import { Main, UrlSoc1als } from "../../types";
import "./index.css";
import { BurgerButton, ModalPrinters, NavDrawer } from "../index";
import { useFetch } from "../../Helpers";
import { Link } from "react-router-dom";
import { ScrollLink } from "../../Helpers/ScrollLink";

const url = "http://localhost:8000/api";

export const Header = () => {
   const [isOpen, setOpen] = useState(false);
   const [data, setData] = useState<Main>();
   const [imgs, setImgs] = useState({ img_1: "", img_2: "" });

   const {
      data: urls,
      loading,
      error,
   } = useFetch<UrlSoc1als>(`${url}/social/`);

   /* --------- данные блока --------- */
   useEffect(() => {
      const loadBlocks = async () => {
         try {
            const r = await fetch(`${url}/pages/blocks/1`);
            if (r.ok) setData(await r.json());
         } catch {
            console.log("blocks fetch failed");
         }
      };
      loadBlocks();
   }, []);

   /* --------- иконки всегда --------- */
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
      <header className="header">
         <Link to="/">
            <h1 className="logo">{data?.title}</h1>
         </Link>

         <nav className="header__nav__bar">
            <ul className="header__wrapper-list">
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
            <a
               href={inst?.url || undefined}
               target="_blank"
               rel="noreferrer"
               className="header__wrapper-item"
            >
               <img src={imgs.img_1} alt="instagram" />
            </a>

            <a
               href={tg?.url || undefined}
               target="_blank"
               rel="noreferrer"
               className="header__wrapper-item"
            >
               <img src={imgs.img_2} alt="telegram" />
            </a>
         </nav>

         <BurgerButton isOpen={isOpen} setOpen={setOpen} />
         <ModalPrinters isOpen={isOpen} onClose={() => setOpen(false)} />
         <NavDrawer isOpen={isOpen} onClose={() => setOpen(false)} />
      </header>
   );
};
