import "./index.css";
import { ButtonToPrinter } from "../ButtonToPrinter";
import { useFetch } from "../../Helpers";
import { ObjectPrinters } from "../../types";
import { ConnectionButton } from "../ConnectionButton";

export const ListPrinters = () => {
   const { data, loading, error } = useFetch<ObjectPrinters>(
      "http://localhost:8000/api/equipment/products/"
   );

   if (loading) return <p>Loading…</p>;

   if (error) return <p>Ошибка загрузки</p>;

   return (
      <ul className="header__menu-list">
         {data?.results.map((p, idx) => (
            <li key={idx} className="header__menu-item">
               <h3 className="header__menu-title">{p.name}</h3>
               <img src={p.icon.url} alt={p.name} />
               <h4 className="header__menu-tagline">{p.tagline}</h4>
               <p className="header__menu-description">{p.description}</p>
               <div className="header__menu-buttons">
                  <ConnectionButton color="blueBg" content="Оставить заявку"/>
                  <ButtonToPrinter />
               </div>
            </li>
         ))}
      </ul>
   );
};
