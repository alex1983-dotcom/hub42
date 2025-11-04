import React, { useEffect } from "react";
import "./index.css";
import { useFetch } from "../../Helpers";
import { Blogs, Main } from "../../types";

export const OpinionsByUsersList = () => {
   const { data, loading, error } = useFetch<Blogs>(
      "http://localhost:8000/api/requests/reviews/"
   );

   useEffect(() => {
      if (data) console.log("📦 reviews:", data.results);
   }, [data]);

   if (loading) return <p>Loading…</p>;

   if (error) return <p>Error :</p>;
   return <div></div>;
};
