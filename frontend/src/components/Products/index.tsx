import React from "react";
import "./index.css";
import { ListPrinters } from "../ListPrinters";
import { useFetch } from "../../Helpers";
import { Main } from "../../types";

export const Products = () => {
   const { data, loading, error } = useFetch<Main>(
      "http://localhost:8000/api/pages/blocks/5/"
   );

   if (loading) return <p>Loading…</p>;

   if (error) return <p>Ошибка загрузки</p>;
   return (
      <section className="products__section">
         <h2 className="products__section-title">{data?.block_type}</h2>
         <p className="products__secton-subtitle">{data?.title}</p>
         <ListPrinters />
      </section>
   );
};
