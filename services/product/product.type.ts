import { IPagination } from "@/types";
import { IProduct } from "@/types/product";

export type IGetRecommendedProductsResponse = IProduct[];

export type IGetProductsRequest = IPagination;
export type IGetProductsResponse = {
  items: IProduct[];
  nextCursor: string;
};
