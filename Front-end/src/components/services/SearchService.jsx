import { get } from "../utils/request";

export const search = async (keywords) =>{
  const result = await get(`/search?query=${keywords}`);
  return result;
}