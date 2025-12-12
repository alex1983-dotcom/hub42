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
   } = useFetch<UrlSoc1als>("http://localhost:8000/api/social/");

   useEffect(() => {
      const loadHeaderData = async () => {
         // 1. блок с логотипом
         try {
            const rPage = await fetch(url + "/pages/blocks/1");
            if (rPage.ok) setData(await rPage.json());
         } catch {
            console.log("blocks fetch failed");
         }

         // 2. иконки – берём ТОЛЬКО активные
         try {
            const rIcons = await fetch(url + "/pages/icons/");
            if (!rIcons.ok) throw new Error("icons empty");
            const list: {
               id: number;
               url?: string;
               css_class?: string;
               name?: string;
            }[] = await rIcons.json();

            // ищем нужные картинки
            const instIcon = list.find((i) =>
               (i.css_class || i.name || "").toLowerCase().includes("instagram")
            );
            const tgIcon = list.find((i) =>
               (i.css_class || i.name || "").toLowerCase().includes("telegram")
            );

            setImgs({
               img_1: instIcon?.url ?? "",
               img_2: tgIcon?.url ?? "",
            });
         } catch {
            // если бэк вернул 404 или пустой массив – ничего не ставим
            setImgs({ img_1: "", img_2: "" });
         }
      };

      loadHeaderData();
   }, []);

   if (loading) return <p>Loading…</p>;
   if (error) return <p>Ошибка загрузки</p>;

   const inst = urls?.results?.find((s: any) => s.name === "instagram");
   const tg = urls?.results?.find((s: any) => s.name === "telegram");

   return (
      <header className="header">
         <Link to={"/"}>
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

            {/* рендерим только если есть и url и картинка */}
            {inst?.url && imgs.img_1 && (
               <a href={inst.url} target="_blank" rel="noreferrer">
                  <img src={imgs.img_1} alt="instagram" />
               </a>
            )}
            {tg?.url && imgs.img_2 && (
               <a href={tg.url} target="_blank" rel="noreferrer">
                  <img src={imgs.img_2} alt="telegram" />
               </a>
            )}
         </nav>

         <BurgerButton isOpen={isOpen} setOpen={setOpen} />
         <ModalPrinters isOpen={isOpen} onClose={() => setOpen(false)} />
         <NavDrawer isOpen={isOpen} onClose={() => setOpen(false)} />
      </header>
   );
};
