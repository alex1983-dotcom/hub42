import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScrollToHash = () => {
   const { pathname, hash } = useLocation();

   useEffect(() => {
      if (!hash) return;
      const el = document.getElementById(hash.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth" });
   }, [pathname, hash]);

   // 👈 принудительно скроллим, даже если hash тот же
   useEffect(() => {
      const handleHashChange = () => {
         const hash = window.location.hash;
         if (!hash) return;
         const id = hash.slice(1);
         const el = document.getElementById(id);
         if (el) el.scrollIntoView({ behavior: "smooth" });
      };

      window.addEventListener("hashchange", handleHashChange);
      return () => window.removeEventListener("hashchange", handleHashChange);
   }, []);
};
