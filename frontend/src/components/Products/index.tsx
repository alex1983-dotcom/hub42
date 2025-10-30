import "./index.css";
import { ListPrinters } from "../ListPrinters";
import { useFetch } from "../../Helpers";
import { Main } from "../../types";
import { useSelector } from "react-redux";
import { getIdPrinter } from "../../store/selectors";
import clsx from "clsx";

export const Products = () => {
   const currentId = useSelector(getIdPrinter);

   const url =
      currentId === null && currentId === undefined
         ? "http://localhost:8000/api/pages/blocks/5/"
         : "http://localhost:8000/api/pages/blocks/6/";

   const { data, loading, error } = useFetch<Main>(url);

   const sectionClass = clsx("products__section", {
      printer: typeof currentId === "number",
   });
   if (loading) return <p>Loading…</p>;

   if (error) return <p>Ошибка загрузки</p>;
   return (
      <section className={sectionClass} id="equipment">
         <h2 className="products__section-title">{data?.title}</h2>
         <h3 className="products__secton-subtitle">{data?.subtitle}</h3>
         <ListPrinters />
      </section>
   );
};
