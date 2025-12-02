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
      const customFetch = async () => {
         try {
            const response = await fetch(url + "/pages/blocks/1");
            const response_img1 = await fetch(url + "/pages/icons/1");
            const response_img2 = await fetch(url + "/pages/icons/2");
            if (!response.ok || !response_img1.ok || !response_img2.ok)
               throw new Error("Something went wrong");
            const data = await response.json();
            const img_1 = await response_img1.json();
            const img_2 = await response_img2.json();

            setData(data);
            setImgs((prev) => ({
               ...prev,
               img_1: img_1.url,
               img_2: img_2.url,
            }));
         } catch (error) {
            console.log("here mistake");
         }
      };
      customFetch();
   }, []);
   if (loading) return <p>Loading…</p>;

   if (error) return <p>Ошибка загрузки</p>;
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
            <a href={urls?.results[1].url} target="_blank">
               <img src={imgs.img_1} alt="instagram" />
            </a>
            <a href={urls?.results[0].url} target="_blank">
               <img src={imgs.img_2} alt="instagram" />
            </a>
         </nav>
         <BurgerButton isOpen={isOpen} setOpen={setOpen} />
         <ModalPrinters isOpen={isOpen} onClose={() => setOpen(false)} />
         <NavDrawer isOpen={isOpen} onClose={() => setOpen(false)} />
      </header>
   );
};
