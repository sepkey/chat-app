import { IUser } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { currentUserData: null, currentUserId: "" },
  reducers: {
    setCurrentUserData: (state, action) => {
      state.currentUserData = action.payload;
    },

    setCurrentUserId: (state, action) => {
      state.currentUserId = action.payload;
    },
  },
});

export const { setCurrentUserData, setCurrentUserId } = userSlice.actions;
export default userSlice;

export interface IUserState {
  currentUserData: IUser | null;
  currentUserId: string;
}
