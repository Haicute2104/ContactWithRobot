const cartReducer = (state = [], action) => {
    switch (action.type) {
      case "INCREASE_QUANTITY":
        return state.map((item) =>
          item.info.id === action.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      case "DECREASE_QUANTITY":
        return state.map((item) =>
            item.info.id === action.id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
        );
      case "ADD_TO_CART":
        console.log(action);
      default:
        return state;
    }
  };
  
  export default cartReducer;