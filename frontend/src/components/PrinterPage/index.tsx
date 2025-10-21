import { useParams } from "react-router-dom";
import { useFetch } from "../../Helpers";
import { ItemCard } from "../ItemCard";
import { Printer } from "../../types";

const PrinterPage = () => {
   const { id } = useParams();

   const { data, loading, error } = useFetch<Printer | null>(
      `http://localhost:8000/api/equipment/products/${id}`
   );
   if (loading) return <p>Loading…</p>;

   if (error) return <p>Ошибка загрузки</p>;
   return (
      <div>
         {data && (
            <div style={{ marginTop: 110, marginLeft: 50 }}>
               <ItemCard printer={data} />
            </div>
         )}
      </div>
   );
};

export default PrinterPage;
