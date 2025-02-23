import { ICartItem } from "@/types";

export type ICartStore = {
  cart: ICartItem[];
  total: number;
};
