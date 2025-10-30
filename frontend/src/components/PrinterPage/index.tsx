import React from "react";
import {
   PrinterSection,
   AdditionSection,
   CharacteristicsOfPrinter,
   FormRequest,
   Products,
} from "../../components";

const PrinterPage = () => {
   return (
      <>
         <PrinterSection />
         <AdditionSection
            color="black"
            bgColor="white"
            content="Попробовать"
            mainContent="Нужен тестовый период?"
         />
         <CharacteristicsOfPrinter />
         <FormRequest />
         <Products />
      </>
   );
};

export default PrinterPage;
