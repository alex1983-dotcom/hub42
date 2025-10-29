import { Link, useParams } from "react-router-dom";
import { useFetch } from "../../Helpers";
import { Printer } from "../../types";
import "./index.css";
import { ConnectionButton } from "../ConnectionButton";

export const PrinterSection = () => {
   const { id } = useParams();

   const { data, loading, error } = useFetch<Printer | null>(
      `http://localhost:8000/api/equipment/products/${id}`
   );
   if (loading) return <p>Loading…</p>;

   if (error) return <p>Ошибка загрузки</p>;
   return (
      <section className="printer__section">
         <div className="printer__section-navigation">
            <Link to="/" className="printer__section-linkToMain">
               Главная
            </Link>
            <span className="printer__section-span">/</span>
            <span className="printer__section-span">Наши продукты</span>
         </div>
         <div className="printer__section-printer">
            <div className="printer__section-inner">
               <div className="printer__section-content">
                  <h3 className="printer__section-printer-title header__menu-title">
                     {data?.name}
                  </h3>
                  <h4 className="printer__section-printer-tagline header__menu-tagline">
                     {data?.tagline}
                  </h4>
                  <div className="printer__section-printer-description ">
                     <p>{data?.description}</p>
                  </div>
               </div>
               <img
                  src={data?.icon.url}
                  alt="printer"
                  className="printer__section-printer-img"
               />
            </div>
            <div className="printer__section-inner-buttons">
               <ConnectionButton
                  bgColor="#3c3aa5"
                  content="Оставить заявку"
                  color="white"
               />
               <ConnectionButton
                  bgColor="white"
                  content="Cвязаться"
                  color="black"
               />
            </div>
         </div>
      </section>
   );
};
