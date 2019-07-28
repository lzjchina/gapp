import {
  combineReducers
} from 'redux';
import productsReducer from './products-reducer';
import cartReducer from './cart-reducer';
import postReducer from './postReducer';

const allReducers = {
  products: productsReducer,
  shoppingCart: cartReducer,
  posts: postReducer
}

const rootReducer = combineReducers(allReducers);

export default rootReducer;
