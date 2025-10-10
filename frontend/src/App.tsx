import "./normalize.css";
import "./App.css";

import { Header, ScopeApplication, SliderSpheres } from "./components";
import { IndustryPrinters } from "./components/IndustryPrinters";
import { Print } from "./components/3dPrint";

function App() {
   return (
      <>
         <div className="App">
            <Header />
            <IndustryPrinters />
            <Print />
            {/* <ScopeApplication /> */}
            <SliderSpheres/>
         </div>
      </>
   );
}

export default App;
