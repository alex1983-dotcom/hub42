import { useSelector } from "react-redux";
import { IndustryPrinters } from "../IndustryPrinters";
import { Print } from "../3dPrint";
import { SliderSpheres } from "../SliderSpheres";
import { AdditionSection } from "../AdditionSection";
import { Products } from "../Products";
import { ReviewsAnswersAccordion } from "../ReviewsAnswersAccordion";
import { ServicesSection } from "../ServicesSection";
import { FormRequest } from "../FormRequest";

export const Home = () => {

   return (
      <div className="App">
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
   );
};
