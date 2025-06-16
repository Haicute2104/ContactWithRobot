import { del, get, patch, post } from "../utils/request";

export const getProductList = async (sortType = "") => {
  const result = await get("product", {
     params: {
        sort: sortType
      }
  });
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

export const createProduct = async (options) => {
  try {
    const result = await post("product/create", options);
    return result;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  const result = await del(`product/delete/${id}`);
  return result;
};

export const updateProduct = async (id, options) => {
  const result = await patch(`product/update/${id}`, options);
  return result;
}

export const changeMultiAction = async (options) => {
  const result = await post('product/change-multi', options);
  return result;
}

// // export const editProduct = async (id, options) => {
// //   const result = await patch(`products/${id}`, options);
// //   return result;
// // };