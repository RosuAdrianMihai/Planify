import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  managers: [],
  members: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setUsers: (state, action) => {
      const users = action.payload;

      for (const user of users) {
        if (user.position === "manager") {
          state.managers.push(user);
        } else if (user.position === "member") {
          state.members.push(user);
        }
      }
    },
    addUser: (state, action) => {
      let createdUser = action.payload;

      if (createdUser.position === "manager") {
        state.managers.push(createdUser);
      } else if (createdUser.position === "member") {
        state.members.push(createdUser);
      }
    },
  },
});

export const { setUser, clearUser, setUsers, addUser } = userSlice.actions;

export default userSlice.reducer;
