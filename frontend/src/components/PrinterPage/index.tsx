import React from "react";

import { useParams } from "react-router-dom";
import { useFetch } from "../../Helpers";
import { ItemCard } from "../ItemCard";
import { ObjectPrinters } from "../../types";
import { Printer } from "../../types";

const PrinterPage = () => {
   const { id } = useParams();
   const numericId = Number(id ?? 0);
   const { data, loading, error } = useFetch<Printer>(
      `http://localhost:8000/api/equipment/products/${id}`
   );
   if (loading) return <p>Loading…</p>;

   if (error) return <p>Ошибка загрузки</p>;
   return (
      <div>
         <ItemCard
            id={numericId}
            name={data?.name ?? ""}
            tagline={data?.tagline ?? ""}
            description={data?.description ?? ""}
            icon={data?.icon}
         />
         <div style={{ marginTop: 104 }}>я принтер {id}</div>
      </div>
   );
};

export default PrinterPage;
