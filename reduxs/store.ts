import { configureStore } from "@reduxjs/toolkit";
import product from "./product";
import cart from "./cart";

export const store = configureStore({
  reducer: {
    product: product.reducer,
    cart: cart.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
