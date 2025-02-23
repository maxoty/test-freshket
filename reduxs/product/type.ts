import { IProduct } from "@/types/product";

export type IProductStore = {
  recommendedItems: IProduct[];
  items: IProduct[];
  page: number;
  loading: boolean;
  hasMore: boolean;
  error: Record<string, string>;
};
