import React from "react";
import { FormRequest } from "../FormRequest";
import { Tabs } from "../Tabs";
import { OpinionsByUsersList } from "../OpinionsByUsersList";

export const OpinionsPage = () => {
   return (
      <>
         <Tabs isReviewPage={true} />
         <FormRequest />
         <OpinionsByUsersList/>
      </>
   );
};
