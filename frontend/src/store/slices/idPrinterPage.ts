import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StateIdPrinter } from "../../types";

const initialState: StateIdPrinter = {
   id: null,
};
export const idPrinterPage = createSlice({
   name: "idPrinter",
   initialState,
   reducers: {
      setIdPrinter: (state, action: PayloadAction<number | null>) => {
         state.id = action.payload;
      },
   },
});
export const { setIdPrinter } = idPrinterPage.actions;
export default idPrinterPage.reducer;
