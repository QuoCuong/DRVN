import React, { Component } from 'react'
import { connect } from 'react-redux'

class Header extends Component {
    render() {
        return (
            <header className="app-header navbar">
                <button className="navbar-toggler sidebar-toggler d-lg-none mr-auto" type="button" data-toggle="sidebar-show">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand" href="/admin">
                    <img className="navbar-brand-full" src="/img/brand/logo.svg" width="89" height="25" alt="CoreUI Logo" />
                    <img className="navbar-brand-minimized" src="/img/brand/sygnet.svg" width="30" height="30"
                        alt="CoreUI Logo" />
                </a>
                <button className="navbar-toggler sidebar-toggler d-md-down-none" type="button" data-toggle="sidebar-lg-show">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <ul className="nav navbar-nav d-md-down-none">
                    <li className="nav-item px-3">
                        <a className="nav-link" href="#">Dashboard</a>
                    </li>
                    <li className="nav-item px-3">
                        <a className="nav-link" href="#">Users</a>
                    </li>
                    <li className="nav-item px-3">
                        <a className="nav-link" href="#">Settings</a>
                    </li>
                </ul>
                <ul className="nav navbar-nav ml-auto">
                    <li className="nav-item d-md-down-none">
                        <a className="nav-link" href="#">
                            <i className="icon-bell"></i>
                            <span className="badge badge-pill badge-danger">5</span>
                        </a>
                    </li>
                    <li className="nav-item d-md-down-none">
                        <a className="nav-link" href="#">
                            <i className="icon-list"></i>
                        </a>
                    </li>
                    <li className="nav-item d-md-down-none">
                        <a className="nav-link" href="#">
                            <i className="icon-location-pin"></i>
                        </a>
                    </li>
                    <li className="nav-item dropdown">
                        <a className="nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
                            aria-expanded="false">
                            <img className="img-avatar" src="/img/avatars/6.jpg" alt="admin@bootstrapmaster.com" />
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                            <div className="dropdown-header text-center">
                                <strong>Account</strong>
                            </div>
                            <a className="dropdown-item" href="#">
                                <i className="fa fa-bell-o"></i> Updates
                                    <span className="badge badge-info">42</span>
                            </a>
                            <a className="dropdown-item" href="#">
                                <i className="fa fa-envelope-o"></i> Messages
                                    <span className="badge badge-success">42</span>
                            </a>
                            <a className="dropdown-item" href="#">
                                <i className="fa fa-tasks"></i> Tasks
                                    <span className="badge badge-danger">42</span>
                            </a>
                            <a className="dropdown-item" href="#">
                                <i className="fa fa-comments"></i> Comments
                                    <span className="badge badge-warning">42</span>
                            </a>
                            <div className="dropdown-header text-center">
                                <strong>Settings</strong>
                            </div>
                            <a className="dropdown-item" href="#">
                                <i className="fa fa-user"></i> Profile</a>
                            <a className="dropdown-item" href="#">
                                <i className="fa fa-wrench"></i> Settings</a>
                            <a className="dropdown-item" href="#">
                                <i className="fa fa-usd"></i> Payments
                                    <span className="badge badge-secondary">42</span>
                            </a>
                            <a className="dropdown-item" href="#">
                                <i className="fa fa-file"></i> Projects
                                    <span className="badge badge-primary">42</span>
                            </a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">
                                <i className="fa fa-shield"></i> Lock Account</a>
                            <a className="dropdown-item" href={`/admin/logout?token=${window.sessionStorage.accessToken}`}>
                                <i className="fa fa-lock"></i> Đăng xuất</a>
                        </div>
                    </li>
                </ul>
                <button className="navbar-toggler aside-menu-toggler d-md-down-none" type="button" data-toggle="aside-menu-lg-show">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <button className="navbar-toggler aside-menu-toggler d-lg-none" type="button" data-toggle="aside-menu-show">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </header>
        );
    }
}

export default connect()(Header)
