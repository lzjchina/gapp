import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Hello extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    test = () => {
        console.log(this.props);
        this.props.history.push("/");
    };
    render() {
        return (
            <div>
                <button onClick={this.test}>按钮</button>
            </div>
        );
    };
}
export default withRouter(Hello);