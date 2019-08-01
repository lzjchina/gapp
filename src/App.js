import React, { Component } from 'react';
// import { Provider } from 'react-redux';
// import store from './store/store.js';
import Router from './Router';
import './index.css';
import { connect } from 'react-redux';
import { change_language } from './store/actions/language_action';

import { addLocaleData, IntlProvider } from 'react-intl'; /* react-intl imports */
import en from 'react-intl/locale-data/en';
import zh from 'react-intl/locale-data/zh';
import zh_CN from "./locales/zh-CN";     // import defined messages in Chinese
import en_US from "./locales/en-US";     // import defined messages in English
// import { addToCart, updateCart, deleteFromCart } from './store/actions/cart-actions';
addLocaleData([...en, ...zh]);  // 引入多语言环境的数据




// console.log("initial state: ", store.getState());

// let unsubscribe = store.subscribe(() =>
//     console.log(store.getState())
// );

// store.dispatch(addToCart('Coffee 500gm', 1, 250));
// store.dispatch(addToCart('Flour 1kg', 2, 110));
// store.dispatch(addToCart('Juice 2L', 1, 250));
// store.dispatch(updateCart('Flour 1kg', 5, 110));
// store.dispatch(deleteFromCart('Coffee 500gm'));

// unsubscribe();

class App extends Component {
    constructor(props) {
        super();
        this.state = {
            lang: 'zh'
        }
    }
    render() {
        let messages = {}
        messages['en'] = en_US;
        messages['zh'] = zh_CN;
        return (
            <IntlProvider locale={this.props.language} messages={messages[this.props.language]}>
                <Router />
            </IntlProvider>
        )
    }
}
// export default App;
const mapStateToProps = state => ({
    language: state.language.name
})

export default connect(mapStateToProps, { change_language })(App);