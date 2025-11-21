import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../../Routes";
import { useFetch } from "../../Helpers";
import { Blogs, Main } from "../../types";
import "./index.css";
import { BlogsCards } from "../BlogsCards";
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

   if (headerError || itemError) return <p>Error :</p>;
   if (!itemContent) return <p>No content available</p>;
   return (
      <section className="blog__section" id="blog">
         <div className="blog__section-wrapper">
            <h2 className="blog__section-title">{headerContent?.title}</h2>
            <div className="blog__section-content">
               <h3 className="blog__section-content-title">
                  {headerContent?.subtitle}
               </h3>

               <BlogsCards itemContent={itemContent.results} mainPage={true} />
            </div>
         </div>
      </section>
   );
};
