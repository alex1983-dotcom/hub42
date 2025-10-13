import "./normalize.css";
import "./App.css";

import {
   Header,
   Products,
   ReviewsAnswersAccordion,
   SliderSpheres,
} from "./components";
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
            <ReviewsAnswersAccordion url="http://localhost:8000/api/pages/blocks/6/" />
         </div>
      </>
   );
}

export default App;
