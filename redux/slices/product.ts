import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Product } from "../interfaces/products";
import { initialProductState } from "../states/product";

const productsSlice = createSlice({
  name: "products",
  initialState:initialProductState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.push(action.payload);
    },
    removeProduct(state, action: PayloadAction<string>) {
      return state.filter((product) => product.id !== action.payload);
    },
    updateProduct(state, action: PayloadAction<Product>) {
      const index = state.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { addProduct, removeProduct, updateProduct } =
  productsSlice.actions;

// Create a selector to get the products from the state
export const selectProducts = (state: RootState) => state.products;

export default productsSlice.reducer;
