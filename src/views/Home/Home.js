import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Hello from '../../components/Hello';
import Nav from '../../components/Nav/Nav';

class Home extends Component {
    componentDidMount(){
        
    }
    render() {
        // console.log(this.props.language)
        // console.log(this.props.loginData)
        return (
            <div>
                <Nav/>
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
