import { api } from "../instances";
import { ICheckoutRequest } from "./cart.type";

export const checkoutApi = (payload: ICheckoutRequest) => {
  return api
    .post("/orders/checkout", payload)
    .then((res) => res)
    .catch((err) => {
      throw err;
    });
};
