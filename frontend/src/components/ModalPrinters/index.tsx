
import { BurgerButtonPropsMini, ObjectPrinters } from "../../types";
import { useFetch } from "../../Helpers";
import "./index.css";
import { ButtonRequest } from "../ButtonRequest";
import { ButtonToPrinter } from "../ButtonToPrinter";
import { BASE_URL } from "../../config/env";


export const ModalPrinters: React.FC<BurgerButtonPropsMini> = ({ isOpen }) => {
   
   const { data, loading, error } = useFetch<ObjectPrinters>(BASE_URL+'/equipment/products/');
   
   if (loading) return <p>Loading…</p>;

   if (error) return <p>Ошибка загрузки</p>;

   return (
      <div className={`header__menu ${isOpen ? "active" : ""}`}>
         <h2 className="header__title">Наше Оборудование</h2>
         <ul className="header__menu-list">
            {data?.results.map((p, idx) => (
               <li key={idx} className="header__menu-item">
                  <h3 className="header__menu-title">{p.name}</h3>
                  <img src={p.icon.url} alt={p.name} />
                  <h4 className="header__menu-tagline">{p.tagline}</h4>
                  <p className="header__menu-description">{p.description}</p>
                  <div className="header__menu-buttons">
                     <ButtonRequest />
                     <ButtonToPrinter />
                  </div>
               </li>
            ))}
         </ul>
      </div>
   );
};
