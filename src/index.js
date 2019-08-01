import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import store from './store/store';
// const store = { ...store1};

ReactDOM.render(
  <App store={store} />,
  // <App/>,
  document.getElementById('root')
);