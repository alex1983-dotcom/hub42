import React from "react";
import { useParams } from "react-router-dom";
import { Blog } from "../../types";
import { useFetch } from "../../Helpers";
import "./index.css";
import { BlogsCards, MdViewer } from "../../components";

const BASE_URL = "http://localhost:8000/api/blog";

/* ---------- регулярка для ПОЛНОЙ строки markdown-картинки ---------- */
const MD_IMG_LINE_REGEX =
   /^!\[.*?\]\(\/media\/[^)]+\.(?:png|jpg|jpeg|gif|webp)\)$/m;

function extractAndRemoveFirstImage(md: string): {
   imagePath: string | null;
   newBody: string;
} {
   const match = MD_IMG_LINE_REGEX.exec(md);
   if (!match) return { imagePath: null, newBody: md };

   const imagePath =
      match[0].match(/\(\/media\/[^)]+\)/)?.[0].slice(1, -1) ?? null;
   const newBody = md.replace(match[0], "").trim();

   return { imagePath, newBody };
}

export const ArticleBlog = () => {
   const { slug } = useParams<{ slug: string }>();

   const {
      data: article,
      loading,
      error,
   } = useFetch<Blog>(`${BASE_URL}/${slug}/`);

   if (loading) return <div className="article-loading">Загрузка...</div>;
   if (error || !article)
      return (
         <div className="article-error">
            {error ? "Ошибка загрузки" : "Статья не найдена"}
         </div>
      );

   const { imagePath, newBody } = extractAndRemoveFirstImage(
      article.body ?? ""
   );

   return (
      <article className="article-blog">
         <h3 className="article-title">{article.title}</h3>

         {/* главная картинка (первая из body) */}
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

         {article.meta_description && (
            <p className="article-lead">{article.meta_description}</p>
         )}

         {/* тело без первой картинки */}
         <MdViewer markdown={newBody || "Материал подготавливается"} />
         <BlogsCards itemContent={[article]} mainPage={false} />
      </article>
   );
};
