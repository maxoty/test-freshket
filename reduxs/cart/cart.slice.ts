import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICartStore } from "./type";
import { ICartItem } from "@/types";
import { checkoutAction } from "./cart.action";

const initialState: ICartStore = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartItem>) => {
      const existingProduct = state.cart.find(
        (item) => item.product.id === action.payload.product.id
      );
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter(
        (item) => item.product.id !== action.payload
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: number; quantity: number }>
    ) => {
      const product = state.cart.find(
        (item) => item.product.id === action.payload.productId
      );
      if (product) {
        product.quantity = action.payload.quantity;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkoutAction.pending, (state) => {})
      .addCase(checkoutAction.fulfilled, (state, action) => {
        state.cart = [];
      })
      .addCase(checkoutAction.rejected, (state, action) => {});
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export const reducer = cartSlice.reducer;
