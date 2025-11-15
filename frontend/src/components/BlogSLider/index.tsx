import React, { useMemo, useState, useEffect } from "react";
import "./index.css";
import { Paginated, Post } from "../../types";
import { useFetch } from "../../Helpers";

const API = "http://localhost:8000/api/blog/";

export const BLogSLider = () => {
   const [page, setPage] = useState(1);
   const [searchInput, setSearchInput] = useState(""); // текст в поле
   const [search, setSearch] = useState(""); // то, что отправится
   const [accumulated, setAccumulated] = useState<Post[]>([]);

   /* 1. строим URL ТОЛЬКО из search и page */
   const url = useMemo(() => {
      const u = new URL(API);
      if (search) u.searchParams.set("search", search);
      u.searchParams.set("page", String(page));
      return u.toString();
   }, [search, page]);

   /* 2. данные */
   const { data, loading, error } = useFetch<Paginated>(url);

   /* 3. накапливаем результаты */
   useEffect(() => {
      if (!data) return;
      setAccumulated((prev) =>
         page === 1 ? data.results : [...prev, ...data.results]
      );
   }, [data, page]);

   /* 4. поиск по кнопке / Enter */
   const handleSearch = () => {
      setPage(1);
      setSearch(searchInput);
   };

   /* 5. группируем по 3 для слайда */
   const slides: Post[][] = [];
   for (let i = 0; i < accumulated.length; i += 3)
      slides.push(accumulated.slice(i, i + 3));

   const [active, setActive] = useState(0);
   const showNext = () => {
      if (active < slides.length - 1) setActive((a) => a + 1);
      else if (data?.next) setPage((p) => p + 1);
   };
   const showPrev = () => active > 0 && setActive((a) => a - 1);

   const current = slides[active] || [];

   if (error) return <p>Ошибка загрузки</p>;

   return (
      <section className="blog-slider">
         <h3 className="blog-slider-title">Блог 3d-экспертов</h3>
         <div className="slider-window">
            <button
               className="arrow left"
               onClick={showPrev}
               disabled={active === 0}
            >
               ‹
            </button>

            <div className="slides">
               {current.map((p) => (
                  <article key={p.id} className="card">
                     <img src={p.image} alt="" />
                     <h3>
                        <a href={`/${p.slug}`}>{p.title}</a>
                     </h3>
                     <p>{p.preview || p.body.slice(0, 120)}...</p>
                  </article>
               ))}
            </div>

            <button
               className="arrow right"
               onClick={showNext}
               disabled={!data?.next && active === slides.length - 1}
            >
               ›
            </button>
         </div>

         {loading && <div className="loading">Загрузка...</div>}
         <div className="search-line">
            <input
               value={searchInput}
               onChange={(e) => setSearchInput(e.target.value)}
               onKeyDown={(e) => e.key === "Enter" && handleSearch()}
               placeholder="Поиск"
            />
            <button onClick={handleSearch}>🔍</button>
         </div>
      </section>
   );
};
