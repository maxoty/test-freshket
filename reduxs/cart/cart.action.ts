import { getProductsApi, getRecommendedProductsApi } from "@/services";
import { IGetProductsRequest } from "@/services/product/product.type";
import { createAsyncThunk } from "@reduxjs/toolkit";

const prefixAction = "product";

export const getRecommendedProductsAction = createAsyncThunk(
  `${prefixAction}/getRecommendedProducts`,
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRecommendedProductsApi();
      return response.data;
    } catch (error: any) {
      return rejectWithValue("Something went wrong");
    }
  }
);

export const getProductsAction = createAsyncThunk(
  `${prefixAction}/getProducts`,
  async (payload: IGetProductsRequest, { rejectWithValue }) => {
    try {
      const response = await getProductsApi(payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
