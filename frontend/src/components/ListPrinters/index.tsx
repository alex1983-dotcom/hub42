import "./index.css";
import { useFetch } from "../../Helpers";
import { ObjectPrinters } from "../../types";
import { ItemCard } from "../ItemCard";
import { useSelector } from "react-redux";
import { getIdPrinter } from "../../store/selectors";

export const ListPrinters = () => {
   const { data, loading, error } = useFetch<ObjectPrinters>(
      "http://localhost:8000/api/equipment/products/"
   );
   const currentId = useSelector(getIdPrinter);
   if (loading) return <p>Loading…</p>;

   if (error) return <p>Ошибка загрузки</p>;

   return (
      <ul className="header__menu-list">
         {data?.results?.map((p) => {
            /* рисуем карточку ТОЛЬКО если currentId не совпадает с p.id */
            if (
               currentId !== null &&
               currentId !== undefined &&
               p.id === currentId
            ) {
               return null; // не рендерим этот элемент
            }
            return <ItemCard printer={p} key={p.id} />;
         })}
      </ul>
   );
};
