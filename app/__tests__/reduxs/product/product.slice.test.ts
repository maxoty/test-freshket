import {
  getProductsAction,
  getProductsMoreAction,
  getRecommendedProductsAction,
} from "@/reduxs/product/product.action";
import { reducer, resetProducts } from "@/reduxs/product/product.slice";

describe("productsSlice", () => {
  const initialState = {
    recommendedItems: [],
    items: [],
    page: 1,
    loading: true,
    hasMore: true,
    error: {},
  };

  it("should return the initial state", () => {
    expect(reducer(undefined, { type: "@reduxjs/toolkit/INIT" })).toEqual(
      initialState
    );
  });

  it("should handle resetProducts", () => {
    const action = resetProducts();
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      recommendedItems: [],
      items: [],
      page: 1,
      loading: true,
      hasMore: true,
      error: {},
    });
  });

  describe("extraReducers", () => {
    it("should handle getRecommendedProductsAction.pending", () => {
      const action = { type: getRecommendedProductsAction.pending.type };
      const state = reducer(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error.recommended).toBeUndefined();
    });

    it("should handle getRecommendedProductsAction.fulfilled", () => {
      const action = {
        type: getRecommendedProductsAction.fulfilled.type,
        payload: ["product1", "product2"],
      };
      const state = reducer(initialState, action);

      expect(state.recommendedItems).toEqual(["product1", "product2"]);
      expect(state.loading).toBe(false);
      expect(state.error.recommended).toBeUndefined();
    });

    it("should handle getRecommendedProductsAction.rejected", () => {
      const action = {
        type: getRecommendedProductsAction.rejected.type,
        payload: "Error fetching recommended products",
      };
      const state = reducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error.recommended).toBe(
        "Error fetching recommended products"
      );
    });

    it("should handle getProductsAction.pending", () => {
      const action = { type: getProductsAction.pending.type };
      const state = reducer(initialState, action);

      expect(state.loading).toBe(true);
      expect(state.error.latest).toBeUndefined();
    });

    it("should handle getProductsAction.fulfilled", () => {
      const action = {
        type: getProductsAction.fulfilled.type,
        payload: { items: ["product1", "product2"], nextCursor: "nextCursor" },
      };
      const state = reducer(initialState, action);

      expect(state.items).toEqual(["product1", "product2"]);
      expect(state.page).toBe(2);
      expect(state.hasMore).toBe(true);
      expect(state.loading).toBe(false);
      expect(state.error.latest).toBeUndefined();
    });

    it("should handle getProductsAction.rejected", () => {
      const action = {
        type: getProductsAction.rejected.type,
        payload: "Error fetching products",
      };
      const state = reducer(initialState, action);

      expect(state.loading).toBe(false);
      expect(state.error.latest).toBe("Error fetching products");
    });

    it("should handle getProductsMoreAction.pending", () => {
      const action = { type: getProductsMoreAction.pending.type };
      const state = reducer(initialState, action);

      expect(state.error.latest).toBeUndefined();
    });

    it("should handle getProductsMoreAction.fulfilled", () => {
      const action = {
        type: getProductsMoreAction.fulfilled.type,
        payload: { items: ["product3"], nextCursor: "nextCursor" },
      };
      const state = reducer(initialState, action);

      expect(state.items).toEqual(["product3"]);
      expect(state.page).toBe(2);
      expect(state.hasMore).toBe(true);
      expect(state.error.latest).toBeUndefined();
    });

    it("should handle getProductsMoreAction.rejected", () => {
      const action = {
        type: getProductsMoreAction.rejected.type,
        payload: "Error fetching more products",
      };
      const state = reducer(initialState, action);

      expect(state.error.latest).toBe("Error fetching more products");
    });
  });
});
