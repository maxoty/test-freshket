import { createSlice } from "@reduxjs/toolkit";
import { IProductStore } from "./type";
import {
  getProductsAction,
  getProductsMoreAction,
  getRecommendedProductsAction,
} from "./product.action";

const initialState: IProductStore = {
  recommendedItems: [],
  items: [],
  page: 1,
  loading: true,
  hasMore: true,
  error: {},
};

const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProducts: (state) => {
      state.recommendedItems = [];
      state.items = [];
      state.page = 1;
      state.loading = true;
      state.hasMore = true;
      state.error = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRecommendedProductsAction.pending, (state) => {
        state.loading = true;
        delete state.error.recommended;
      })
      .addCase(getRecommendedProductsAction.fulfilled, (state, action) => {
        state.recommendedItems = (action.payload ?? []).slice(0, 4);
        state.loading = false;
        delete state.error.recommended;
      })
      .addCase(getRecommendedProductsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = { ...state.error, recommended: action.payload as string };
      })
      .addCase(getProductsAction.pending, (state) => {
        state.loading = true;
        delete state.error.latest;
      })
      .addCase(getProductsAction.fulfilled, (state, action) => {
        state.items = [...state.items, ...action.payload.items];
        state.page += 1;
        state.hasMore =
          !!action.payload.nextCursor && action.payload.nextCursor !== "";
        state.loading = false;
        delete state.error.latest;
      })
      .addCase(getProductsAction.rejected, (state, action) => {
        state.loading = false;
        state.error = { ...state.error, latest: action.payload as string };
      })
      .addCase(getProductsMoreAction.pending, (state) => {
        delete state.error.latest;
      })
      .addCase(getProductsMoreAction.fulfilled, (state, action) => {
        state.items = [...state.items, ...action.payload.items];
        state.page += 1;
        state.hasMore =
          !!action.payload.nextCursor && action.payload.nextCursor !== "";
        delete state.error.latest;
      })
      .addCase(getProductsMoreAction.rejected, (state, action) => {
        state.error = { ...state.error, latest: action.payload as string };
      });
  },
});

export const { resetProducts } = productsSlice.actions;
export const reducer = productsSlice.reducer;
