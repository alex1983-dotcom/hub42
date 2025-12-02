
import { IndustryPrinters } from "../IndustryPrinters";
import { Print } from "../3dPrint";
import { SliderSpheres } from "../SliderSpheres";
import { AdditionSection } from "../AdditionSection";
import { Products } from "../Products";
import { ReviewsAnswersAccordion } from "../ReviewsAnswersAccordion";
import { ServicesSection } from "../ServicesSection";
import { FormRequest } from "../FormRequest";
import { BlogNews } from "../BlogNews";
import { useScrollToHash } from "../../Helpers";

export const Home = () => {
     useScrollToHash(); // 👈 теперь срабатывает на любом hash-изменении
   return (
      <div className="App">
         <IndustryPrinters />
         <Print />
         <SliderSpheres />
         <AdditionSection
            color="black"
            bgColor="white"
            content="Связаться"
            mainContent="Наши клиенты запускают печать без оснастки, получают детали за часы, а не недели"
         />
         <Products main={true} />
         <ReviewsAnswersAccordion
            url="http://localhost:8000/api/pages/blocks/6/"
            idSection="company"
         />
         <ServicesSection />
         <FormRequest />
         <ReviewsAnswersAccordion
            url="http://localhost:8000/api/pages/blocks/9/"
            idSection="FAQ"
         />
         <AdditionSection
            color="black"
            bgColor="white"
            content="Связаться"
            mainContent="Наши клиенты запускают печать без оснастки, получают детали за часы, а не недели"
         />
         <BlogNews />
      </div>
   );
};
