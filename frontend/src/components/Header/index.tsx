import { useEffect, useState } from "react";
import { Main } from "../../types";
import "./index.css";
import { BurgerButton, ModalPrinters, NavDrawer } from "../index";

const url = "http://localhost:8000/api";
export const Header = () => {
   const [isOpen, setOpen] = useState(false);
   const [data, setData] = useState<Main>();
   const [imgs, setImgs] = useState({ img_1: "", img_2: "" });
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

   return (
      <div className="app">
         <header className="header">
            <h1 className="logo">{data?.title}</h1>
            <nav className="header__nav__bar">
               <ul className="wrapper">
                  <li className="wrapper-items">
                     <a href="#equipment">Оборудование</a>
                  </li>
                  <li className="wrapper-items">
                     <a href="#company">О компании</a>
                  </li>
                  <li className="wrapper-items">
                     <a href="#services">Наши услуги</a>
                  </li>
                  <li className="wrapper-items">
                     <a href="#request">Оставить заявку</a>
                  </li>
                  <li className="wrapper-items">
                     <a href="#FAQ">FAQ</a>
                  </li>
                  <li className="wrapper-items">
                     <a href="#blog">Блог</a>
                  </li>
                  <li className="wrapper-items">
                     <a href="something">
                        <img src={imgs.img_1} alt="instagram" />
                     </a>
                  </li>
                  <li className="wrapper-items">
                     <a href="something">
                        <img src={imgs.img_2} alt="instagram" />
                     </a>
                  </li>
               </ul>
            </nav>
            <BurgerButton isOpen={isOpen} setOpen={setOpen} />
            <ModalPrinters isOpen={isOpen} />
            <NavDrawer isOpen={isOpen} onClose={() => setOpen(false)} />
         </header>
      </div>
   );
};
