import { useEffect, useState } from "react";


export const useFetch = <T,>(endpoints: string[]) => {
   const [printers, setPrinters] = useState<T[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<unknown>(null);

   useEffect(() => {
      if (!endpoints.length) return;

      let cancelled = false;

      const load = async () => {
         try {
            const res = await Promise.all(
               endpoints.map((e) => fetch(e).then((r) => r.json()))
            );
            if (!cancelled) setPrinters(res.flat()); // .flat() если каждый endpoint возвращает массив
         } catch (e) {
            if (!cancelled) setError(e);
         } finally {
            if (!cancelled) setLoading(false);
         }
      };

      load();
      return () => {
         cancelled = true;
      };
   }, [endpoints]);

   return { printers, loading, error };
};
