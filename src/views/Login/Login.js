import React, { Component } from 'react';
import './Login.less';
import LoginForm from '../../components/LoginForm';
import { connect } from 'react-redux';
import { fetchPosts } from '../../store/actions/postAction';
import { FormattedMessage, injectIntl } from 'react-intl';
// import store from '../../store/store';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
        this.props.fetchPosts();
        this.test();
        // console.log(store.getState().shoppingCart)
        // http.get('/api/MMessage/GetRequestData?op=getdevice&content=effd9698-01ab-49c8-9399-5f4ac7fd8d1c&user_id=effd9698-01ab-49c8-9399-5f4ac7fd8d1c&token=988F453199D88CAC05F8A048AEFA68D204943173719BA28262559372AFB83F28BC06C9C67EBF052AFC11D253F2E46FBE').then(res => console.log(res))
    }

    test = () => {
        const { intl } = this.props;
        let tmp = intl.formatMessage({ id: 'hello' });
        console.log(tmp)
    }

    render() {
        // console.log(this.props.posts)
        return (
            <div className="login">
                <main className="login-box">
                    <div className="login-box-info">
                        <h1>欢迎！</h1>
                        <h1>多媒体信息发布管理系统</h1>
                    </div>
                    <div className="login-box-form">
                        <h2 className="form-signin-heading">
                            <div className="logo"></div>
                        </h2>
                        <LoginForm />
                        <div><FormattedMessage id="hello" /></div>
                    </div>
                </main>
                <footer></footer>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    posts: state.posts.items
})

export default connect(mapStateToProps, { fetchPosts })(injectIntl(Login));