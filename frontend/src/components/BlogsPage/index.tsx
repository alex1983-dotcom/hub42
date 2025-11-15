
import { BLogSLider, Tabs } from "../../components";


export const BlogsPage = () => {
   return (
      <div style={{ marginTop: 110 }}>
         <Tabs isReviewPage={true} content="Блог"></Tabs>
         <BLogSLider></BLogSLider>
      </div>
   );
};
