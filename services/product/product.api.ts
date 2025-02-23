import { IResponses } from "@/types";
import { api } from "../instances";
import {
  IGetProductsRequest,
  IGetProductsResponse,
  IGetRecommendedProductsResponse,
} from "./product.type";

export const getRecommendedProductsApi = (): Promise<
  IResponses<IGetRecommendedProductsResponse>
> => {
  return api.get("/recommended-products").then((res) => res);
};

export const getProductsApi = (
  payload: IGetProductsRequest
): Promise<IResponses<IGetProductsResponse>> => {
  return api.get("/products", { params: payload }).then((res) => res);
};
