import React from 'react'
import { withRouter } from 'react-router-dom'
import NavItem from './NavItem'

const RoleAdmin = () => {
    return (
        <>
            <li className="nav-title">Quản trị viên</li>
            <NavItem
                dropdown={true}
                icon="nav-icon fa fa-users"
                name="Tài khoản"
            >
                <ul className="nav-dropdown-items">
                    <NavItem
                        dropdown={false}
                        url="/admin/users"
                        icon="nav-icon fa fa-list"
                        name="Danh sách tài khoản"
                    />
                    <NavItem
                        dropdown={false}
                        url="/admin/users/create"
                        icon="nav-icon fa fa-user-plus"
                        name="Thêm tài khoản"
                    />
                </ul>
            </NavItem>
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
                    <NavItem
                        dropdown={false}
                        url="/admin/projects/create"
                        icon="nav-icon fa fa-plus"
                        name="Thêm công trình"
                    />
                </ul>
            </NavItem>
        </>
    )
}

export default withRouter(RoleAdmin)
