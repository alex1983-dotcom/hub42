import { useEffect, useState } from "react";

export const useFetch = <T,>(url: string) => {
   const [data, setData] = useState<T | null>(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      
      const customfetch = async () => {
         try {
            const response = await fetch(url);

            if (!response.ok) throw new Error("Something went wrong");

            const data = await response.json();

            setData(data);
            setError(null);
         } catch (error) {
            if (error instanceof Error) {
               setError(error.message);
            }
         } finally {
            setLoading(false);
         }
      };
      customfetch();
   }, [url]);
   return { data, error, loading };
};
