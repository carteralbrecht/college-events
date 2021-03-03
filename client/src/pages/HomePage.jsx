import React from 'react';
import {withRouter} from "react-router-dom";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <h1>
                Welcome {localStorage.getItem("user")}
            </h1>
        )
    }
}

export default withRouter(HomePage);