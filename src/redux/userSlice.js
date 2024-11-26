import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false, // Menyimpan status login
  user: null, // Menyimpan data pengguna jika login
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload; // Menyimpan data user
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
