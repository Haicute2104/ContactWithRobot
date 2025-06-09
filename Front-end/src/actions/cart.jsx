export const addToCart = (info, quantity) => {
  return {
    type: "ADD_TO_CART",
    info,
    quantity,
  }
};

export const increaseQuantity = (id) => ({
  type: "INCREASE_QUANTITY",
  id,
});

export const decreaseQuantity = (id) => ({
  type: "DECREASE_QUANTITY",
  id,
});
export const removeProductFromCart = (id) => ({
  type: "REMOVE_FROM_CART",
  id,
})
export const updateQuantity = (id, quantity) => {
  return {
  type: "UPDATE_QUANTITY",
  id,
  quantity,
  }
};
export const deleteAll = () => {
  return{
    type: "DELETE_ALL"
  }
}