export const routes = {
   main: "/",
   printer: "/printer/:id",
   blog: "/blog",
   blogId: (id: string | number) => `/blog/${id}`,
   printerId: (id: string | number) => `/printer/${id}`,
} as const;
