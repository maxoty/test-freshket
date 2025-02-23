import { reducer } from "./product.slice";
import * as actions from "./product.action";

export default {
  ...actions,
  reducer,
};
