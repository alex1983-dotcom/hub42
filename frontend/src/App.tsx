import "./normalize.css";
import "./App.css";

import {
   FormRequest,
   Header,
   Products,
   ReviewsAnswersAccordion,
   ServicesSection,
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
            <ServicesSection />
            <FormRequest />
            <ReviewsAnswersAccordion url="http://localhost:8000/api/pages/blocks/9/" />
            <AdditionSection />
         </div>
      </>
   );
}

export default App;
