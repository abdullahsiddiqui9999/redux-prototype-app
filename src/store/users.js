import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

let id = 0;

const slice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    userAdded: (users, action) => {
      users.push({
        id: id++,
        name: action.payload.name,
      });
    },
  },
});

export const { userAdded } = slice.actions;
export default slice.reducer;

export const getRandomUser = createSelector(
  (state) => state.entities.users,
  (users) => {
    return users[0];
  }
);
