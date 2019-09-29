import React, { Component } from 'react';
import './Login.less';
import LoginForm from '../../components/LoginForm';
// import Hello from '../../components/Hello';
import { connect } from 'react-redux';
import { fetchPosts } from '../../store/actions/postAction';
import { change_language } from '../../store/actions/language_action';
import { FormattedMessage, injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'zh'
        }
    }
    componentDidMount() {
        // this.test();
    }
    componentDidUpdate() {
        // console.log(this.props.posts)
    }

    test = () => {
        // const { intl } = this.props;
        // let tmp = intl.formatMessage({ id: 'hello' });
        // console.log(tmp)
        // this.props.fetchPosts();
        console.log(this.props)
        // this.props.history.push('/home');
    }

    selectZh = async () => {
        this.setState({
            language: 'zh'
        });
        await this.props.change_language('zh')
        // console.log(this.props.language)
        // console.log(this.props.posts)
    }

    selectEn = async () => {
        this.setState({
            language: 'en'
        });
        await this.props.change_language('en')
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
                            <span onClick={this.selectZh} className={this.props.language === 'zh' ? 'languageActive' : 'languageName'}>简体中文</span>
                            <span className="Language_line">|</span>
                            <span onClick={this.selectEn} className={this.props.language === 'en' ? 'languageActive' : 'languageName'}>英文</span>
                        </div>
                    </div>
                </main>
                <footer></footer>
            </div>
        )
    }
}

Login.propTypes = {
    posts: PropTypes.array.isRequired,
    language: PropTypes.string.isRequired
}
const mapStateToProps = state => ({
    posts: state.posts.items,
    language: state.language.name
})

export default withRouter(connect(mapStateToProps, { fetchPosts, change_language })(injectIntl(Login)));