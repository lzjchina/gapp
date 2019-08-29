import React, {
    Component
} from 'react'
import {
    Form,
    Icon,
    Input,
    Button,
    message,
    Spin
} from 'antd';
import '../views/Login/Login.less';
// import http from 'axios';
import CryptoJS from 'crypto-js';
import verify from '../untils/verify.js';
import {
    injectIntl,
    FormattedMessage
} from 'react-intl';
import {
    connect
} from 'react-redux';
import {
    set_login_status
} from '../store/actions/login_state';
import {
    withRouter
} from 'react-router-dom';
import {
    get
} from '../fetch/fetch';
import {
    setCookie
} from '../untils/getStore';


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.key = CryptoJS.enc.Utf8.parse("GIADASytemMedia?+GIADASytemMedia")
        this.iv = CryptoJS.enc.Utf8.parse('giada123456giada')
        this.ivtoken = CryptoJS.enc.Utf8.parse('giada123456giada')
        this.keytoken = CryptoJS.enc.Utf8.parse('GIADAValidToken?+GIADAValidToken')
        this.state = {
            verifyValue: '',
            verifyIsSuccess: false,
            verifyCode: '',
            loading: false
        }
    }

    componentDidMount() {
        this.verifyCode()
    }
    handleChange = event => {
        this.setState({
            verifyValue: event.target.value
        });
    }
    // 验证码
    verifyCode() {
        const verifyCode = new verify("v_container");
        this.setState({
            verifyCode: verifyCode
        });
    }
    Encrypt(word) {
        var srcs = CryptoJS.enc.Utf8.parse(word);
        var encrypted = CryptoJS.AES.encrypt(srcs, this.key, {
            iv: this.iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.ciphertext.toString().toUpperCase();
    }
    Decrypt(word) {
        var encryptedHexStr = CryptoJS.enc.Hex.parse(word);
        var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
        var decrypt = CryptoJS.AES.decrypt(srcs, this.key, {
            iv: this.iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString();
    }
    // EncryptTK(word) {
    //     srcs = CryptoJS.enc.Utf8.parse(word);
    //     var encrypted = CryptoJS.AES.encrypt(srcs, keytoken, { iv: ivtoken, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    //     return encrypted.ciphertext.toString().toUpperCase();
    // }
    DecryptTK(word) {
        var encryptedHexStr = CryptoJS.enc.Hex.parse(word);
        var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
        var decrypt = CryptoJS.AES.decrypt(srcs, this.keytoken, {
            iv: this.ivtoken,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
        return decryptedStr.toString();
    }
    handleSubmit = e => {
        e.preventDefault();
        this.setState({
            loading: true
        });
        const {
            intl
        } = this.props;
        let validation = intl.formatMessage({
            id: 'login_validation'
        });
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let verifyStatus = this.state.verifyCode.validate(this.state.verifyValue);
                if (this.state.verifyValue === '' || !verifyStatus) {
                    this.setState({
                        loading: false
                    });
                    message.error(validation);

                } else {
                    const username = this.props.form.getFieldValue("username");
                    const password = this.Encrypt(this.props.form.getFieldValue("password"));
                    const reqData = `/api/MMessage/GetRequestData?op=login&content={"login_name":"${username}","password":"${password}"}`;
                    // http.get(reqData).then(res => {
                    //     const data = JSON.parse(res.data);
                    //     let j_data;
                    //     if (data.status === 'success') {
                    //         this.setState({
                    //             loading: false
                    //         });
                    //         j_data = this.DecryptTK(data.data);
                    //         j_data = JSON.parse(j_data);
                    //         // console.log(j_data)
                    //         this.props.set_login_status(j_data);

                    //         this.props.history.push('/home');
                    //     }
                    // })
                    // .catch(err => {
                    //     this.setState({
                    //         loading: false
                    //     });
                    // })

                    get(reqData).then(res => res.json()).then(json => {
                            const data = JSON.parse(json);
                            let j_data;
                            if (data.status === 'success') {
                                this.setState({
                                    loading: false
                                });
                                j_data = this.DecryptTK(data.data);
                                j_data = JSON.parse(j_data);
                                this.props.set_login_status(j_data);
                                setCookie('user_id', j_data.id)
                                setCookie('token', j_data.token)
                                this.props.history.push('/deviceManage');
                            } else {
                                this.setState({
                                    loading: false
                                });
                            }
                        })
                        .catch(err => {
                            console.log(err)
                            this.setState({
                                loading: false
                            });
                        })
                }
            }
        });
    };
    test = () => {
        console.log(this.props.history)
        // this.context.router.history.push('/home');
    }

    render() {
            const {
                getFieldDecorator
            } = this.props.form;
            return ( <
                div >
                <
                Spin spinning = {
                    this.state.loading
                } >
                <
                Form onSubmit = {
                    this.handleSubmit
                }
                className = "login-form" >
                <
                Form.Item > {
                    getFieldDecorator('username', {
                        rules: [{
                            required: true,
                            message: 'Please input your username!'
                        }],
                    })( <
                        Input prefix = {
                            < Icon type = "user"
                            style = {
                                {
                                    color: 'rgba(0,0,0,.25)'
                                }
                            }
                            />}
                            placeholder = "Username" /
                            > ,
                        )
                    } <
                    /Form.Item> <
                    Form.Item > {
                        getFieldDecorator('password', {
                            rules: [{
                                required: true,
                                message: 'Please input your Password!'
                            }],
                        })( <
                            Input prefix = {
                                < Icon type = "lock"
                                style = {
                                    {
                                        color: 'rgba(0,0,0,.25)'
                                    }
                                }
                                />}
                                type = "password"
                                placeholder = "Password" /
                                > ,
                            )
                        } <
                        /Form.Item> <
                        Form.Item className = "VerificationBox" >
                        <
                        Input value = {
                            this.state.verifyValue
                        }
                        onChange = {
                            this.handleChange
                        }
                        placeholder = "验证码" / >
                        <
                        div className = "verify-code"
                        id = "v_container" > < /div> <
                        /Form.Item> <
                        Form.Item >
                        <
                        Button type = "primary"
                        htmlType = "submit"
                        className = "login-form-button" > < FormattedMessage id = "login_loginBtn" / > < /Button> <
                        /Form.Item> <
                        /Form> <
                        /Spin> <
                        /div>
                    )
                }
            }

            const LoginFormBox = Form.create()(LoginForm);
            const mapStateToProps = state => ({
                loginData: state.login.data
            })

            export default withRouter(connect(mapStateToProps, {
                set_login_status
            })(injectIntl(LoginFormBox)));