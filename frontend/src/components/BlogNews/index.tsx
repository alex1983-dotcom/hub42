import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../../Routes";
import { useFetch } from "../../Helpers";
import { Blogs, Main } from "../../types";
import "./index.css";
const myData = [
   {
      url: "something",
      title: "Хранение металлических порошков: практические рекомендации",
      subtitle: "#Основы 3D #Эксперты рекомендуют Время чтения: 8 минут",
   },
   {
      url: "something",
      title: "Хранение металлических порошков: практические рекомендации",
      subtitle: "#Основы 3D #Эксперты рекомендуют Время чтения: 8 минут",
   },
];
export const BlogNews = () => {
   const {
      data: headerContent,
      loading: headerLoading,
      error: headerError,
   } = useFetch<Main>("http://localhost:8000/api/pages/blocks/10");
   const {
      data: itemContent,
      loading: itemLoading,
      error: itemError,
   } = useFetch<Blogs>("http://localhost:8000/api/blog/");
   if (headerLoading || itemLoading) return <p>Loading…</p>;

   if (headerError || itemError) return <p>Error :(</p>;
   return (
      <section className="blog__section">
         <div className="blog__section-wrapper">
            <h2 className="blog__section-title">{headerContent?.title}</h2>
            <div className="blog__section-content">
               <h3 className="blog__section-content-title">
                  {headerContent?.subtitle}
               </h3>
               <div className="blog__section-content-wrapper">
                  <ul className="blog__section-content-wrapper-list">
                     {itemContent?.results.slice(-2).map((blog, idx) => (
                        <li
                           className="blog__section-content-wrapper-item"
                           key={idx}
                        >
                           <img
                              src={blog.image}
                              alt="тут должны быть картинки"
                              className="blog__section-content-wrapper-item-img"
                           />

                           <div className="blog__section-content-wrapper-item-inner">
                              <h4 className="blog__section-content-wrapper-item-title">
                                 {blog.preview}
                              </h4>
                           </div>

                           <div className="blog__section-content-wrapper-item-subtitle">
                              <p className="blog-tags">
                                 #Основы 3D #Эксперты рекомендуют
                              </p>
                              <p className="blog-time">Время чтения: 8 минут</p>
                           </div>
                        </li>
                     ))}
                  </ul>
                  <Link
                     to={routes.blog}
                     className="blog__section-content-wrapper-link"
                  >
                     Перейти в блог
                  </Link>
               </div>
            </div>
         </div>
      </section>
   );
};
