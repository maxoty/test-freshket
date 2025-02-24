import { IProduct } from "../product";

export type ICartItem = {
  product: IProduct;
  quantity: number;
};
