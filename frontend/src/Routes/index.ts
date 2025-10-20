export const routes = {
   main: "/",
   printer: "/printer/:slug",
   printerId: (id: string | number) => `/printer/${id}`,
} as const;
