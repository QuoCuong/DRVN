import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import RoleAdmin from './RoleAdmin'
import RoleConstructionUnit from './RoleConstructionUnit'
import RoleSupervisor from './RoleSupervisor'
import NavItem from './NavItem'
import { Nav } from 'reactstrap'

const Sidebar = props => {
    const { authUserRole } = props

    const renderSwitch = () => {
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
                <Nav>
                    <NavItem
                        url="/admin/dashboard"
                        dropdown={false}
                        icon="nav-icon icon-speedometer"
                        name="Bảng điều khiển"
                    ></NavItem>
                    {renderSwitch()}
                </Nav>
            </nav>
            <button className="sidebar-minimizer brand-minimizer" type="button"></button>
        </div>
    )
}

Sidebar.defaultProps = {
    authUserRole: {}
}

const mapStateToProps = state => ({
    authUserRole: state.auth.user.role
})

export default withRouter(connect(
    mapStateToProps
)(Sidebar))
