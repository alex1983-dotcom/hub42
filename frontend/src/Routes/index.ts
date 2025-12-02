export const routes = {
   main: "/",
   printer: "/printer/:id",
   blog: "/blog",
   opinions: "/opinions",
   blogArticle: "/blog/:slug",
   privacy:"/privacy",
   terms:"/terms",
   printerId: (id: string | number) => `/printer/${id}`,
   blogId: (slug: string) => `/blog/${slug}`,
} as const;
