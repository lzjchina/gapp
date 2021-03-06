import { combineReducers } from 'redux';
import productsReducer from './products-reducer';
import cartReducer from './cart-reducer';
import postReducer from './postReducer';
import language_reducer from './language_reducer';
import login_reducer from './login_reducer';

const allReducers = {
  products: productsReducer,
  shoppingCart: cartReducer,
  posts: postReducer,
  language: language_reducer,
  login: login_reducer
}

const rootReducer = combineReducers(allReducers);

export default rootReducer;
