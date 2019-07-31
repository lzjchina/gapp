import React, { Component } from 'react';
import './Login.less';
import LoginForm from '../../components/LoginForm';
import { connect } from 'react-redux';
import { fetchPosts } from '../../store/actions/postAction';
import { FormattedMessage, injectIntl } from 'react-intl';
// import {  injectIntl } from 'react-intl';
import store from '../../store/store';
import { addToCart, updateCart, deleteFromCart } from '../../store/actions/cart-actions';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'zh'
        }
    }
    componentDidMount() {
        this.test();
        
    }

    test = () => {
        // const { intl } = this.props;
        // let tmp = intl.formatMessage({ id: 'hello' });
        // console.log(tmp)
        this.props.fetchPosts();
        console.log(this.props.posts)
        store.dispatch(addToCart('Coffee 500gm', 1, 250));
        store.dispatch(addToCart('Flour 1kg', 2, 110));
        store.dispatch(addToCart('Juice 2L', 1, 250));
        store.dispatch(updateCart('Flour 1kg', 5, 110));
        store.dispatch(deleteFromCart('Coffee 500gm'));
        console.log(store.getState())
        console.log(this.props)
    }

    selectZh = () => {
        this.setState({
            language: 'zh'
        });
    }

    selectEn = () => {
        this.setState({
            language: 'en'
        });
    }

    render() {
        // console.log(this.props.posts)
        return (
            <div className="login">
                <main className="login-box">
                    <div className="login-box-info">
                        <h1><FormattedMessage id="login_welcome" /></h1>
                        <h1><FormattedMessage id="login_systemName" /></h1>
                    </div>
                    <div className="login-box-form">
                        <h2 className="form-signin-heading">
                            <div className="logo"></div>
                        </h2>
                        <LoginForm />
                        <div className="languageBox">
                            <span onClick={this.selectZh} className={this.state.language === 'zh' ? 'languageActive': 'languageName'}>简体中文</span>
                            <span className="Language_line">|</span>
                            <span onClick={this.selectEn} className={this.state.language === 'en' ? 'languageActive' : 'languageName'}>英文</span>
                        </div>
                    </div>
                </main>
                <footer></footer>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts.items,
    cart: state.shoppingCart
})

export default connect(mapStateToProps, { fetchPosts, addToCart })(injectIntl(Login));