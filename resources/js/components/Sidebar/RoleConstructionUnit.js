import React from 'react'
import { withRouter } from 'react-router-dom'
import NavItem from './NavItem'

const RoleConstructionUnit = () => {
    return (
        <>
            <li className="nav-title">Đơn vị thi công</li>
            <NavItem
                dropdown={true}
                icon="nav-icon fa fa-road"
                name="Công trình"
            >
                <ul className="nav-dropdown-items">
                    <NavItem
                        dropdown={false}
                        url="/admin/projects"
                        icon="nav-icon fa fa-list"
                        name="Danh sách công trình"
                    />
                </ul>
            </NavItem>
        </>
    )
}

export default withRouter(RoleConstructionUnit)
