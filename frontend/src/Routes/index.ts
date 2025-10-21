export const routes = {
   main: "/",
   printer: "/printer/:id",
   printerId: (id: string | number) => `/printer/${id}`,
} as const;
