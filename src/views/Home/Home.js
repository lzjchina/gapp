import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Hello from '../../components/Hello';

class Home extends Component {
    render() {
        console.log(this.props.language)
        console.log(this.props.loginData)
        return (
            <div>
                Home
                <Hello/>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    language: state.language.name,
    loginData: state.login.data
})

export default withRouter(connect(mapStateToProps)(Home));
