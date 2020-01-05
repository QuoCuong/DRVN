import React from 'react'
import { withRouter } from 'react-router-dom'
import NavItem from './NavItem'

const RoleAdmin = () => {
    return (
        <>
            <li className="nav-title">Quản trị viên</li>
            <NavItem url={'/admin/users'}>
                <i className="nav-icon fa fa-users"></i> Tài khoản
            </NavItem>
            <NavItem url={'/admin/projects'}>
                <i className="nav-icon fa fa-road"></i> Công trình
            </NavItem>
        </>
    )
}

export default withRouter(RoleAdmin)
