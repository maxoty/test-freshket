import {
  addToCart,
  removeFromCart,
  updateQuantity,
  reducer,
} from "@/reduxs/cart/cart.slice";
import { ICartItem } from "@/types";
import { checkoutAction } from "@/reduxs/cart/cart.action";

describe("cartSlice", () => {
  const initialState = {
    cart: [],
  };

  describe("addToCart", () => {
    it("should add a product to the cart", () => {
      const product: ICartItem = {
        product: { id: 1, name: "Product 1", price: 100 },
        quantity: 1,
      };
      const action = addToCart(product);

      const state = reducer(initialState, action);

      expect(state.cart).toHaveLength(1);
      expect(state.cart[0].product.id).toBe(1);
    });

    it("should increase quantity if product already exists in the cart", () => {
      const existingProduct: ICartItem = {
        product: { id: 1, name: "Product 1", price: 100 },
        quantity: 1,
      };
      const action = addToCart(existingProduct);

      const stateAfterFirstAdd = reducer(initialState, action);
      expect(stateAfterFirstAdd.cart[0].quantity).toBe(1);

      const actionAddAgain = addToCart(existingProduct);
      const stateAfterSecondAdd = reducer(stateAfterFirstAdd, actionAddAgain);
      expect(stateAfterSecondAdd.cart[0].quantity).toBe(2);
    });
  });

  describe("removeFromCart", () => {
    it("should remove the product from the cart", () => {
      const existingProduct: ICartItem = {
        product: { id: 1, name: "Product 1", price: 100 },
        quantity: 1,
      };
      const addAction = addToCart(existingProduct);
      const stateWithProduct = reducer(initialState, addAction);

      const removeAction = removeFromCart(1);
      const stateAfterRemoval = reducer(stateWithProduct, removeAction);

      expect(stateAfterRemoval.cart).toHaveLength(0);
    });
  });

  describe("updateQuantity", () => {
    it("should update the quantity of a product in the cart", () => {
      const existingProduct: ICartItem = {
        product: { id: 1, name: "Product 1", price: 100 },
        quantity: 1,
      };
      const addAction = addToCart(existingProduct);
      const stateWithProduct = reducer(initialState, addAction);

      const updateAction = updateQuantity({ productId: 1, quantity: 3 });
      const stateAfterUpdate = reducer(stateWithProduct, updateAction);

      expect(stateAfterUpdate.cart[0].quantity).toBe(3);
    });
  });

  describe("checkoutAction", () => {
    it("should empty the cart after a successful checkout", async () => {
      const existingProduct: ICartItem = {
        product: { id: 1, name: "Product 1", price: 100 },
        quantity: 1,
      };
      const addAction = addToCart(existingProduct);
      const stateWithProduct = reducer(initialState, addAction);

      // Mock the correct ICheckoutRequest type object
      const checkoutResponse = {
        orderId: "12345", // Replace with correct properties of ICheckoutRequest
        status: "success",
        items: [
          { productId: 1, quantity: 1 },
          // Add any necessary details here
        ],
      };

      // Pass the correct mock data for the fulfilled action
      const fulfilledAction = checkoutAction.fulfilled(checkoutResponse, "", {
        products: [0],
      });
      const stateAfterCheckout = reducer(stateWithProduct, fulfilledAction);

      expect(stateAfterCheckout.cart).toHaveLength(0);
    });
  });
});
