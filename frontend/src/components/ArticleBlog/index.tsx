// src/pages/ArticleBlog/ArticleBlog.tsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Blog } from "../../types";
import { useFetch } from "../../Helpers";
import "./index.css";
import { BlogsCards, MdViewer } from "../../components";

const BASE_URL = "http://localhost:8000/api/blog";

/* ищем первую Markdown-картинку в любом месте текста */
const MD_IMG_REGEX =
   /!\[.*?\]\(https?:\/\/[^)]+\/media\/[^)]+\.(?:png|jpg|jpeg|gif|webp)\)/i;

function extractAndRemoveFirstImage(md: string): {
   imagePath: string | null;
   newBody: string;
} {
   const match = MD_IMG_REGEX.exec(md);
   if (!match) return { imagePath: null, newBody: md };

   const fullUrl = match[0].match(/\((https?:\/\/[^)]+)\)/)?.[1] ?? "";
   const imagePath = fullUrl.replace("http://localhost:8000", ""); // убираем хост
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

   console.log("=== ArticleBlog render ===");
   console.log("article:", article);
   console.log("imagePath:", imagePath);
   console.log("article.body:", article.body);
   return (
      <article className="article-blog">
         <h3 className="article-title">{article.title}</h3>

         {imagePath && (
            <figure className="article-figure">
               <img
                  className="article-figure-image"
                  src={`http://localhost:8000${imagePath}`}
                  alt={article.title}
               />
            </figure>
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
