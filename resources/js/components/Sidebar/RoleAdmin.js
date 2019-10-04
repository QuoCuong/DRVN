import React, { Component, Fragment } from 'react';
import { withRouter, Link } from 'react-router-dom';

class RoleAdmin extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const url = this.props.match.url
        return (
            <Fragment>
                <li className="nav-title">Cục Đường Bộ</li>
                <li className="nav-item">
                    <Link className="nav-link"
                        to={`${url}/users`}>
                        <i className="nav-icon fa fa-users"></i> Tài khoản</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link"
                        to={`${url}/projects`}>
                        <i className="nav-icon fa fa-road"></i> Công trình</Link>
                </li>
            </Fragment>
        );
    }
}

export default withRouter(RoleAdmin);
