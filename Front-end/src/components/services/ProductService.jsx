import { get, patch } from "../utils/request";

export const getProductList = async () => {
  const result = await get("product");
  return result;
};

export const changeStatus = async(status, id) => {
  const result = await patch(`product/change-status/${status}/${id}`);
  return result
}
export const getDetailProductList = async (id) => {
  const result = await get(`product/${id}`);
  return result;
};

// export const createProduct = async (options) => {
//   const result = await post("products", options);
//   return result;
// };

// export const deleteProduct = async (id) => {
//   const result = await del(`products/${id}`);
//   return result;
// };

// // export const editProduct = async (id, options) => {
// //   const result = await patch(`products/${id}`, options);
// //   return result;
// // };