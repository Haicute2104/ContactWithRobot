import { get } from "../utils/request"

export const getDetailsCart = async(id) => {
  const result = await get(`cart/${id}`);
  return result;
}