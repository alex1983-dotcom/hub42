import React, { useEffect } from "react";
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
      <section className="products__section" id="equipment">
         <h2 className="products__section-title">{data?.title}</h2>
         <h3 className="products__secton-subtitle">{data?.subtitle}</h3>
         <ListPrinters />
      </section>
   );
};
