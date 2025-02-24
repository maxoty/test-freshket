import { checkoutApi } from "@/services";
import { ICheckoutRequest } from "@/services/cart/cart.type";
import { createAsyncThunk } from "@reduxjs/toolkit";

const prefixAction = "cart";

export const checkoutAction = createAsyncThunk(
  `${prefixAction}/checkout`,
  async (payload: ICheckoutRequest, { rejectWithValue }) => {
    try {
      const response = await checkoutApi(payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue("Something went wrong");
    }
  }
);
