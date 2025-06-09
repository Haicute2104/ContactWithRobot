const cartReducer = (state = [], action) => {
  let newState;

  switch (action.type) {
    case "INCREASE_QUANTITY":
      newState = state.map((item) =>
        item.info._id === action.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      break;

    case "DECREASE_QUANTITY":
      newState = state.map((item) => {
        if (item.info._id === action.id) {
          return item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item;
        }
        return item;
      });
      break;

    // --- THÊM CASE MỚI NÀY ---
    case "UPDATE_QUANTITY":
      newState = state.map(item =>
        item.info._id === action.id
          ? { ...item, quantity: action.quantity }
          : item
      );
      break;

    case "ADD_TO_CART":
      const existingIndex = state.findIndex(
        (item) => item.info._id === action.info._id
      );

      if (existingIndex !== -1) {
        newState = state.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + action.quantity }
            : item
        );
      } else {
        newState = [...state, { info: action.info, quantity: action.quantity }];
      }
      break;

    case "REMOVE_FROM_CART":
      newState = state.filter(item => item.info._id !== action.id);
      break;
    case "DELETE_ALL":
      newState = [];
      break
    default:
      newState = state;
  }

  return newState;
};

export default cartReducer;