// src/components/ArticleBlog/index.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { Blog } from "../../types";
import { useFetch } from "../../Helpers";
import "./index.css";
import { MdViewer } from "../../components";

const BASE_URL = "http://localhost:8000/api/blog";

export const ArticleBlog = () => {
   const { slug } = useParams<{ slug: string }>();

   const {
      data: article,
      loading,
      error,
   } = useFetch<Blog>(`${BASE_URL}/${slug}/`);

   /* ---------- состояния загрузки / ошибки ---------- */
   if (loading) return <div className="article-loading">Загрузка...</div>;

   if (error || !article)
      return (
         <div className="article-error">
            {error ? "Ошибка загрузки" : "Статья не найдена"}
         </div>
      );

   /* ---------- рендер ---------- */
   return (
      <article className="article-blog">
         <h3 className="article-title">{article.title}</h3>

         {/* картинка только если url пришёл */}
         {article.image ? (
            <figure className="article-figure">
               <img
                  className="article-figure-image"
                  src={article.image}
                  alt={article.title}
               />
            </figure>
         ) : (
            <div className="article-no-image">Нет изображения</div>
         )}

         {article.meta_description && (
            <p className="article-lead">{article.meta_description}</p>
         )}

         {/* безопасный рендер тела */}
         <MdViewer markdown={article.body ?? "Материал подготавливается"} />
      </article>
   );
};
