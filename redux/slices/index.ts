import { combineReducers } from "@reduxjs/toolkit";
import signupReducers from "./users";
import productReducers from "./product";
import themeColorReducers from "./themeColors";

export default combineReducers({
  users: signupReducers,
  products: productReducers,
  themeColors: themeColorReducers,
});
