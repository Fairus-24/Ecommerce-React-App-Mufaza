import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk untuk login dengan validasi dari API
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().auth;
      if (user) {
        return rejectWithValue("A user is already logged in.");
      }

      const response = await axios.get("https://fakestoreapi.com/users");
      const firstUser = response.data[0]; // Ambil user index pertama

      if (
        firstUser.email !== credentials.email ||
        firstUser.password !== credentials.password
      ) {
        return rejectWithValue("Invalid credentials");
      }

      return firstUser; // Jika login berhasil, kirim data user
    } catch (error) {
      return rejectWithValue("Login failed");
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
