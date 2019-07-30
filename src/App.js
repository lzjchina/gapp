import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store/store.js';
import Router from './Router';
import './index.css';

import { addLocaleData, IntlProvider } from 'react-intl'; /* react-intl imports */
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import zh_CN from "./locales/zh-CN";     // import defined messages in Chinese
import en_US from "./locales/en-US";     // import defined messages in English
addLocaleData([...en, ...zh]);  // 引入多语言环境的数据


// import {
//   addToCart,
//   updateCart,
//   deleteFromCart
// } from './store/actions/cart-actions';

// console.log("initial state: ", store.getState());

// let unsubscribe = store.subscribe(() =>
//   console.log(store.getState())
// );

// store.dispatch(addToCart('Coffee 500gm', 1, 250));
// store.dispatch(addToCart('Flour 1kg', 2, 110));
// store.dispatch(addToCart('Juice 2L', 1, 250));
// store.dispatch(updateCart('Flour 1kg', 5, 110));
// store.dispatch(deleteFromCart('Coffee 500gm'));

// unsubscribe();

class App extends Component {
    constructor(props){
        super();
        this.state = {
            lang: 'en'
        }
    }
    render() {
        let messages = {}
        messages['en'] = en_US;
        messages['zh'] = zh_CN;
        return (
            <IntlProvider locale={this.state.lang} messages={messages[this.state.lang]}>
                <div>
                    <Provider store={store}>
                        <Router />
                    </Provider>
                </div>
            </IntlProvider>
        )
    }
}
export default App;