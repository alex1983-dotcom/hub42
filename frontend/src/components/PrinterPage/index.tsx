import {
   PrinterSection,
   AdditionSection,
   CharacteristicsOfPrinter,
   FormRequest,
   Products,
} from "../../components";

export const PrinterPage = () => {
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
         <Products main={false}/>
      </>
   );
};

export default PrinterPage;
