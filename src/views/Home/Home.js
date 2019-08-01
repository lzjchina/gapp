import React, { Component } from 'react';
import { connect } from 'react-redux';

class Home extends Component {
    render() {
        console.log(this.props.language)
        console.log(this.props)
        return (
            <div>
                Home
            </div>
        )
    }
}
const mapStateToProps = state => ({
    language: state.language.name
})

export default connect(mapStateToProps)(Home);
