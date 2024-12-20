import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await axios.get("https://fakestoreapi.com/products");
  return response.data;
});

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    stock: JSON.parse(localStorage.getItem("productStock")) || {}, 
    loading: false,
  },
  reducers: {
    setStock(state, action) {
      const { id, stock } = action.payload;
      state.stock[id] = stock;
      localStorage.setItem("productStock", JSON.stringify(state.stock)); 
    },
    decreaseStock(state, action) {
      const { id, quantity } = action.payload;
      if (state.stock[id]) {
        state.stock[id] -= quantity; 
        localStorage.setItem("productStock", JSON.stringify(state.stock)); 
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;

        action.payload.forEach((product) => {
          if (!state.stock[product.id]) {
            state.stock[product.id] = 20;
          }
        });

        localStorage.setItem("productStock", JSON.stringify(state.stock)); 
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setStock, decreaseStock } = productsSlice.actions;
export default productsSlice.reducer;
