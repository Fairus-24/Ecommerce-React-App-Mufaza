import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { getState, rejectWithValue }) => {
    try {
      const { user } = getState().auth;
      if (user) {
        return rejectWithValue("Anda telah masuk!");
      }

      const response = await axios.get("https://fakestoreapi.com/users");
      const firstUser = response.data[0]; 

      if (
        firstUser.email !== credentials.email ||
        firstUser.password !== credentials.password
      ) {
        return rejectWithValue("Password tidak valid");
      }

      const tokenResponse = await axios.post(
        "https://fakestoreapi.com/auth/login",
        {
          username: firstUser.username,
          password: credentials.password,
        }
      );

      const token = tokenResponse.data.token;

      localStorage.setItem("token", token);

      return { user: firstUser, token }; 
    } catch (error) {
      return rejectWithValue("Login gagal");
    }
  }
);

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: localStorage.getItem("token") ? true : false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token"); 
      localStorage.removeItem("user");  
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
