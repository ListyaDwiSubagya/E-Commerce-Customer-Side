import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk untuk mengambil semua produk
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const products = await response.json();

    // Tambahkan properti quantity default
    return products.map((product) => ({
      ...product,
      quantity: 20, // Default quantity
    }));
  }
);

// Thunk untuk mengambil detail produk berdasarkan id
export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product details');
    }
    const product = await response.json();

    // Tambahkan properti quantity jika tidak ada
    return { ...product, quantity: product.quantity || 20 };
  }
);

// Initial state
const initialState = {
  products: [], // Daftar semua produk
  productDetails: null, // Detail produk yang dipilih
  loading: false, // Indikator loading
  error: null, // Menyimpan pesan error
};

// Slice untuk produk
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // Action untuk mengurangi stok produk
    reduceStock: (state, action) => {
      const { items } = action.payload;
      items.forEach(({ productId, quantity }) => {
        const product = state.products.find((item) => item.id === productId);
        if (product && product.quantity >= quantity) {
          product.quantity -= quantity; // Kurangi stok hanya jika mencukupi
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      // Reducer untuk fetchProducts
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload; // Produk dengan quantity default
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Reducer untuk fetchProductById
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetails = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Ekspor actions
export const { reduceStock } = productSlice.actions;

// Ekspor reducer
export default productSlice.reducer;
