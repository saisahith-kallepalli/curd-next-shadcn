import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Signup } from "../interfaces/users";
import { signupInitialState } from "../states/users";

const signupSlice = createSlice({
  name: "signup",
  initialState: signupInitialState,
  reducers: {
    addSignup(state, action: PayloadAction<Signup>) {
      state.push(action.payload);
    },
    removeSignup(state, action: PayloadAction<string>) {
      return state.filter((signup) => signup.id !== action.payload);
    },
    updateSignup(state, action: PayloadAction<Signup>) {
      // const index = state.findIndex(signup => signup.id === action.payload.id);
      // if (index !== -1) {
      //     state[index] = action.payload;
      // }
    },
  },
});

export const { addSignup, removeSignup, updateSignup } = signupSlice.actions;
export const selectSignups = (state: RootState) => state.users;

export default signupSlice.reducer;
