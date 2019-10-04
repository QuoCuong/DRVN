import React, { Component, Fragment } from 'react'
import { withRouter, Link } from 'react-router-dom'

class RoleSupervisor extends Component {
    render() {
        const url = this.props.match.url
        return (
            <Fragment>
                <li className="nav-title">Giám sát viên</li>
                <li className="nav-item">
                    <Link className="nav-link"
                        to={`${url}/projects/supervisor`}>
                        <i className="nav-icon fa fa-road"></i> Công trình</Link>
                </li>
            </Fragment>
        );
    }
}

export default withRouter(RoleSupervisor)