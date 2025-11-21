import React from "react";
import "./index.css";
import { Blog } from "../../types";
import { Link } from "react-router-dom";
import { routes } from "../../Routes";

export const BlogsCards = ({
   itemContent,
   mainPage,
}: {
   itemContent: Blog[];
   mainPage: boolean;
}) => {
   /* -------------------------------------------------
    * какие посты показываем
    * -----------------------------------------------*/
   const blogs = mainPage
      ? itemContent.slice(-2) // главная → 2 последних
      : itemContent[0]?.similar_posts || []; // карточка статьи → похожие

   /* -------------------------------------------------
    * CSS сам сделает «по 2 в строке» через
    * .blog__section-content-wrapper-list--grid
    * -----------------------------------------------*/
   return (
      <div className="blog__section-content-wrapper">
         <h3 className="blog__section-content-wrapper-title">Похожие статьи</h3>
         <ul
            className={
               mainPage
                  ? "blog__section-content-wrapper-list"
                  : "blog__section-content-wrapper-list blog__section-content-wrapper-list--grid"
            }
         >
            {blogs.map((blog) => (
               <li key={blog.id} className="blog__section-content-wrapper-item">
                  <img
                     src={blog.image}
                     alt={blog.title}
                     className="blog__section-content-wrapper-item-img"
                  />

                  <div className="blog__section-content-wrapper-item-inner">
                     <h4 className="blog__section-content-wrapper-item-title">
                        <Link
                           to={routes.blogId(blog.slug)}
                           className="blog__section-content-wrapper-item-link"
                        >
                           {blog.title}
                        </Link>
                     </h4>
                  </div>
               </li>
            ))}
         </ul>

         <Link to={routes.blog} className="blog__section-content-wrapper-link">
            Перейти в блог
         </Link>
      </div>
   );
};
