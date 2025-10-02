import "./normalize.css";
import "./App.css";

import { Header } from "./components";
import {  IndustryPrinters } from "./components/IndustryPrinters";
import { Print } from "./components/3dPrint";

function App() {
   return (
      <>
         <Header />
         <IndustryPrinters/>
         <Print/>
      </>
   );
}

export default App;
