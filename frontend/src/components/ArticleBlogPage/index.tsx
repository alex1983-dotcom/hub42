import React from "react";
import { Tabs } from "../Tabs";
import { ArticleBlog } from "../ArticleBlog";

export const ArticleBlogPage = () => {
   return (
      <>
         <Tabs isReviewPage={true} content="блог"></Tabs>
         <ArticleBlog></ArticleBlog>
      </>
   );
};
