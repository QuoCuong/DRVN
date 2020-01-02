import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import NavItem from './NavItem'

class RoleConstructionUnit extends Component {
    render() {
        const url = this.props.match.url
        return (
            <Fragment>
                <li className="nav-title">Đơn vị thi công</li>
                <NavItem url={`${url}/projects`}>
                    <i className="nav-icon fa fa-road"></i> Công trình
                </NavItem>
            </Fragment>
        )
    }
}

export default withRouter(RoleConstructionUnit)
