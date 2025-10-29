import React from "react";
import {
   PrinterSection,
   AdditionSection,
   CharacteristicsOfPrinter,
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
      </>
   );
};

export default PrinterPage;
