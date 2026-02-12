import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../interfaces/userInterface";

interface InitialState {
    users: User[];
}

const initialState: InitialState = {
    users: [],
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    onSetUsers: (state,{ payload }: PayloadAction<User[]>) => {
      state.users = payload;
    }
  },
});

export const { 
    onSetUsers
 } = userSlice.actions;

 export default userSlice.reducer;