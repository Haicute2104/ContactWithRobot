import { combineReducers } from 'redux';
import cartReducer from './cart';

const allReducer = combineReducers({
  cart: cartReducer
});

export default allReducer;
