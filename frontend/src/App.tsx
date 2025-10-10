import "./normalize.css";
import "./App.css";

import { Header, ListPrinters, Products, SliderSpheres } from "./components";
import { IndustryPrinters } from "./components/IndustryPrinters";
import { Print } from "./components/3dPrint";
import { AdditionSection } from "./components/AdditionSection";

function App() {
   return (
      <>
         <div className="App">
            <Header />
            <IndustryPrinters />
            <Print />
            <SliderSpheres />
            <AdditionSection />
            <Products />
         </div>
      </>
   );
}

export default App;
