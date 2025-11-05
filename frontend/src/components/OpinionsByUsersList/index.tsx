import React, { useEffect, useState } from "react";
import "./index.css";
import { useFetch } from "../../Helpers";
import { arrayReview, Blogs, Main, objReview } from "../../types";
const LINES_TO_SHOW = 5;

export const OpinionsByUsersList: React.FC = () => {
   /* 1. вся подборка с сервера */
   const { data, loading, error } = useFetch<arrayReview>(
      "http://localhost:8000/api/requests/reviews/"
   );

   /* 2. сколько карточек уже показываем */
   const [visibleCount, setVisibleCount] = useState(3);

   /* 3. раскрытые карточки (Set<id>) */
   const [expanded, setExpanded] = useState<Set<number>>(new Set());

   /* 4. при получении новых данных – сброс счётчика */
   useEffect(() => {
      setVisibleCount(3);
      setExpanded(new Set());
   }, [data]);

   if (loading) return <p>Loading…</p>;
   if (error) return <p>Ошибка загрузки</p>;
   if (!data?.results?.length) return <p>Отзывов пока нет</p>;

   const reviews = data.results;
   const showMoreAvailable = visibleCount < reviews.length;

   /* 5. переключатель «Показать больше / Свернуть» */
   const toggleExpanded = (id: number) =>
      setExpanded((prev) => {
         const next = new Set(prev);
         next.has(id) ? next.delete(id) : next.add(id);
         return next;
      });

   /* 6. подгрузка +3 карточки */
   const loadMore = () =>
      setVisibleCount((prev) => Math.min(prev + 3, reviews.length));

   /* 7. разбиваем текст на строки по символу \n */
   const getLines = (text: string) => text.split("\n");

   return (
      <section className="opinions-list">
         <ul className="opinions-list__ul">
            {reviews.slice(0, visibleCount).map((rv) => {
               const lines = getLines(rv.review);
               const isLong = lines.length > LINES_TO_SHOW;
               const isOpen = expanded.has(rv.id);

               return (
                  <li key={rv.id} className="opinion-card">
                     <p className="opinion-card__name">{rv.name}</p>

                     <div className="opinion-card__text">
                        {(isOpen ? lines : lines.slice(0, LINES_TO_SHOW)).map(
                           (ln, i) => (
                              <p key={i} className="opinion-card__line">
                                 {ln}
                              </p>
                           )
                        )}
                     </div>

                     {isLong && (
                        <button
                           className="opinion-card__toggle"
                           onClick={() => toggleExpanded(rv.id)}
                        >
                           {isOpen ? "Свернуть" : "Показать больше"}
                        </button>
                     )}
                  </li>
               );
            })}
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
