import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
// import { ThemeColor } from "../interfaces/themeColor";
import { initialThemeColorState } from "../states/themeColor";

const themeColorSlice = createSlice({
  name: "products",
  initialState: initialThemeColorState,
  reducers: {
    changeThemeColor(state, action: PayloadAction<string>) {
      state.themeColor = action.payload;
    },
  },
});

export const { changeThemeColor } = themeColorSlice.actions;

// Create a selector to get the products from the state
export const selectColor = (state: RootState) => state.themeColors;

export default themeColorSlice.reducer;
