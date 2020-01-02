import React from 'react'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import RoleAdmin from './RoleAdmin'
import RoleConstructionUnit from './RoleConstructionUnit'
import RoleSupervisor from './RoleSupervisor'
import NavItem from './NavItem'

const Sidebar = props => {
    const { path } = props.match
    const authUserRole = useSelector(state => state.auth.user.role) || {}

    function renderSwitch() {
        switch (authUserRole.name) {
        case 'admin':
            return <RoleAdmin />
        case 'supervisor':
            return <RoleSupervisor />
        case 'construction unit':
            return <RoleConstructionUnit />
        default:
            return
        }
    }

    return (
        <div className="sidebar">
            <nav className="sidebar-nav">
                <ul className="nav">
                    <NavItem url={`${path}/dashboard`}>
                        <i className="nav-icon icon-speedometer"></i> Bảng điều khiển
                    </NavItem>
                    {renderSwitch()}
                </ul>
            </nav>
            <button className="sidebar-minimizer brand-minimizer" type="button"></button>
        </div>
    )
}

Sidebar.defaultProps = {
    role: {}
}

export default withRouter(Sidebar)
