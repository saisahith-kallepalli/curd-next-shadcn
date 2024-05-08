import { combineReducers } from "@reduxjs/toolkit";
import signupReducers from "./users";
import productReducers from "./product";

export default combineReducers({
  users: signupReducers,
  products: productReducers,
});
