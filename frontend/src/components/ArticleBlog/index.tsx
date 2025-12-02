// src/pages/ArticleBlog/ArticleBlog.tsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Blog } from "../../types";
import { useFetch } from "../../Helpers";
import "./index.css";
import { BlogsCards, MdViewer } from "../../components";

const BASE_URL = "http://localhost:8000/api/blog";

/* ищем первую Markdown-картинку в любом месте текста */
const MD_IMG_REGEX = /!\[.*?\]\(\/media\/[^)]+\.(?:png|jpg|jpeg|gif|webp)\)/;

function extractAndRemoveFirstImage(md: string): {
   imagePath: string | null;
   newBody: string;
} {
   const match = MD_IMG_REGEX.exec(md);
   if (!match) return { imagePath: null, newBody: md };

   const imagePath =
      match[0].match(/\(\/media\/[^)]+\)/)?.[0].slice(1, -1) ?? null;
   const newBody = md.replace(match[0], "").trim();
   return { imagePath, newBody };
}

export const ArticleBlog = () => {
   const { slug } = useParams<{ slug: string }>();

   /* ключ-перезапрос (cache-busting) */
   const [tick, setTick] = useState(0);
   const url = `${BASE_URL}/${slug}/?_t=${tick}`;

   const { data: article, loading, error } = useFetch<Blog>(url);

   if (loading) return <div className="article-loading">Загрузка...</div>;

   if (error || !article)
      return (
         <div className="article-error">
            {error ? "Ошибка загрузки" : "Статья не найдена"}
            <br />
            <button onClick={() => setTick((t) => t + 1)}>Обновить</button>
         </div>
      );

   const { imagePath, newBody } = extractAndRemoveFirstImage(
      article.body ?? ""
   );

   return (
      <article className="article-blog">
         <h3 className="article-title">{article.title}</h3>

         {imagePath ? (
            <figure className="article-figure">
               <img
                  className="article-figure-image"
                  src={`http://localhost:8000${imagePath}`}
                  alt={article.title}
               />
            </figure>
         ) : (
            <div className="article-no-image">Нет изображения</div>
         )}

         <MdViewer markdown={newBody || "Материал подготавливается"} />

         {/* кнопка обновления */}
         <button
            onClick={() => setTick((t) => t + 1)}
            style={{ marginTop: 16 }}
         >
            Обновить статью
         </button>

         <BlogsCards itemContent={[article]} mainPage={false} />
      </article>
   );
};
