import "./normalize.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./Layouts/MainLayout";
import { routes } from "./Routes";

import Printer from "./components/PrinterPage";
import { BlogNews, BlogsPage, Home } from "./components";

function App() {
   return (
      <>
         <Routes>
            <Route element={<MainLayout />}>
               <Route path={routes.main} element={<Home />}></Route>
               <Route path={routes.printer} element={<Printer />}></Route>
               <Route path={routes.blog} element={<BlogsPage />}></Route>
            </Route>
         </Routes>
      </>
   );
}

export default App;
