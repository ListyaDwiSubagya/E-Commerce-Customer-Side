import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import userReducer from './userSlice';
import cartReducer from './cartSlice';

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer
});

const store = createStore(rootReducer);

export default store;
