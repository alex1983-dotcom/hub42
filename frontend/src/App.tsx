import "./normalize.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./Layouts/MainLayout";
import { routes } from "./Routes";

import { BlogsPage, Home, OpinionsPage } from "./components";
import PrinterPage from "./components/PrinterPage";
import { ArticleBlogPage } from "./components/ArticleBlogPage";

function App() {
   return (
      <>
         <Routes>
            <Route element={<MainLayout />}>
               <Route path={routes.main} element={<Home />}></Route>
               <Route path={routes.printer} element={<PrinterPage />}></Route>
               <Route path={routes.opinions} element={<OpinionsPage />}></Route>
               <Route path={routes.blog} element={<BlogsPage />}></Route>
               <Route path={routes.blogArticle} element={<ArticleBlogPage />} />
            </Route>
         </Routes>
      </>
   );
}

export default App;
