import React from "react";
import { useFetch } from "../../Helpers";
import { FooterResponse } from "../../types";
import "./index.css";
import { MdViewer } from "../Markdown";
export const Privacy = () => {
   const { data, loading, error } = useFetch<FooterResponse>(
      "http://localhost:8000/api/pages/footer/"
   );

   if (loading) return <p>Loading…</p>;

   if (error) return <p>Ошибка загрузки</p>;

   return (
      <div className="policy">
         <MdViewer
            markdown={
               data?.results[0].privacy_policy || "Материал подготавливается"
            }
         />
      </div>
   );
};
