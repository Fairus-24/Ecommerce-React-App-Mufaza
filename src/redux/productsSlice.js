import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk untuk mengambil data produk
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await axios.get("https://fakestoreapi.com/products");
  return response.data;
});

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    stock: JSON.parse(localStorage.getItem("productStock")) || {}, // Load stock from localStorage or use an empty object
    loading: false,
  },
  reducers: {
    setStock(state, action) {
      const { id, stock } = action.payload;
      state.stock[id] = stock;
      localStorage.setItem("productStock", JSON.stringify(state.stock)); // Save to localStorage
    },
    decreaseStock(state, action) {
      const { id, quantity } = action.payload;
      if (state.stock[id]) {
        state.stock[id] -= quantity; // Kurangi stok saat checkout
        localStorage.setItem("productStock", JSON.stringify(state.stock)); // Update localStorage
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

        // Inisialisasi stok jika tidak ada dalam localStorage
        action.payload.forEach((product) => {
          if (!state.stock[product.id]) {
            state.stock[product.id] = 20; // Stok default 20 jika belum ada di localStorage
          }
        });

        localStorage.setItem("productStock", JSON.stringify(state.stock)); // Save to localStorage
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setStock, decreaseStock } = productsSlice.actions;
export default productsSlice.reducer;
