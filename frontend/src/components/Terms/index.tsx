import React from "react";
import { FooterResponse } from "../../types";
import { useFetch } from "../../Helpers";
import "./index.css";
import { MdViewer } from "../Markdown";
export const Terms = () => {
   const { data, loading, error } = useFetch<FooterResponse>(
      "http://localhost:8000/api/pages/footer/"
   );

   if (loading) return <p>Loading…</p>;

   if (error) return <p>Ошибка загрузки</p>;

   return (
      <div className="terms">
         <MdViewer
            markdown={
               data?.results[0].user_agreement || "Материал подготавливается"
            }
         />
      </div>
   );
};
