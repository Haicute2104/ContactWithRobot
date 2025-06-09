import { post } from "../utils/request";

export const checkoutProduct = async (options) => {
  try {
    const result = await post("checkout", options);
    return result;
  } catch (error) {
    console.error('Error creating checkout:', error);
    throw error;
  }
};
