import "./index.css";
import { ButtonToPrinter } from "../ButtonToPrinter";
import { useFetch } from "../../Helpers";
import { ObjectPrinters } from "../../types";
import { ConnectionButton } from "../ConnectionButton";
import { ItemCard } from "../ItemCard";


export const ListPrinters = () => {
   const { data, loading, error } = useFetch<ObjectPrinters>(
      "http://localhost:8000/api/equipment/products/"
   );

   if (loading) return <p>Loading…</p>;

   if (error) return <p>Ошибка загрузки</p>;

   return (
      <ul className="header__menu-list">
         {data?.results.map((p, idx) => (
            <li key={p.id} className="header__menu-item">
               <ItemCard {...p}></ItemCard>
            </li>
         ))}
      </ul>
   );
};
