import React, { useEffect, useState, useRef } from "react";
import "./index.css";
import { useFetch } from "../../Helpers";
import { arrayReview } from "../../types";

const LINES_TO_SHOW = 3;

export const OpinionsByUsersList: React.FC = () => {
   const { data, loading, error } = useFetch<arrayReview>(
      "http://localhost:8000/api/requests/reviews/"
   );
   const [visibleCount, setVisibleCount] = useState(3);

   useEffect(() => {
      setVisibleCount(3);
   }, [data]);

   if (loading) return <p>Loading…</p>;
   if (error) return <p>Ошибка загрузки</p>;
   if (!data?.results?.length) return <p>Отзывов пока нет</p>;

   const reviews = data.results;
   const showMoreAvailable = visibleCount < reviews.length;

   const loadMore = () =>
      setVisibleCount((prev) => Math.min(prev + 3, reviews.length));

   // Внутренний компонент карточки (не выносится отдельно)
   const OpinionCard: React.FC<{ review: any }> = ({ review }) => {
      const textRef = useRef<HTMLDivElement>(null);
      const [isLong, setIsLong] = useState(false);
      const [isOpen, setIsOpen] = useState(false);

      useEffect(() => {
         const checkHeight = () => {
            if (textRef.current) {
               const lineHeight = 24; // 16px * 1.5
               const maxHeight = lineHeight * LINES_TO_SHOW;
               setIsLong(textRef.current.scrollHeight > maxHeight);
            }
         };

         checkHeight();
         window.addEventListener("resize", checkHeight);
         return () => window.removeEventListener("resize", checkHeight);
      }, [review.review]);

      return (
         <li className="opinion-card">
            <p className="opinion-card__name">{review.name}</p>

            <div
               ref={textRef}
               className={`opinion-card__text ${
                  isOpen ? "opinion-card__text--expanded" : ""
               }`}
            >
               {review.review}
            </div>

            {isLong && (
               <button
                  className="opinion-card__toggle"
                  onClick={() => setIsOpen(!isOpen)}
               >
                  {isOpen ? "Свернуть" : "Показать больше"}
               </button>
            )}
         </li>
      );
   };

   return (
      <section className="opinions-list">
         <h3 className="opinion-lits__title">Мнение наших клиентов</h3>
         <ul className="opinions-list__ul">
            {reviews.slice(0, visibleCount).map((rv) => (
               <OpinionCard key={rv.id} review={rv} />
            ))}
         </ul>

         {showMoreAvailable && (
            <div className="opinions-list__more">
               <button className="opinions-list__load-btn" onClick={loadMore}>
                  Загрузить ещё
               </button>
            </div>
         )}
      </section>
   );
};
