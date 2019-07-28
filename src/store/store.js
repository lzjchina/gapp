import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
const initialState = {};
const middleware = [thunk];

// const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
// });
const store = createStore(rootReducer, initialState, applyMiddleware(...middleware));

export default store;
