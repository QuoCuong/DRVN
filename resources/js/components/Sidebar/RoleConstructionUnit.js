import React from 'react'
import { withRouter } from 'react-router-dom'
import NavItem from './NavItem'

const RoleConstructionUnit = props => {
    const { url } = props.match

    return (
        <>
            <li className="nav-title">Đơn vị thi công</li>
            <NavItem url={`${url}/projects`}>
                <i className="nav-icon fa fa-road"></i> Công trình
            </NavItem>
        </>
    )
}

export default withRouter(RoleConstructionUnit)
