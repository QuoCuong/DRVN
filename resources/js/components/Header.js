import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../api/auth'
import authActions from '../redux/auth/actions'
import { withRouter } from 'react-router-dom'

class Header extends Component {
    handleLogoutClick() {
        logout()
            .then(res => {
                this.props.unauthenticate()
                this.props.history.push('/admin/login')
            })
            .catch(error => {
                console.log(error)
            })
    }

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
                <ul className="nav navbar-nav ml-auto">
                    <li className="nav-item dropdown">
                        <a className="nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
                            aria-expanded="false">
                            <img className="img-avatar" src="/img/avatars/6.jpg" alt="admin@bootstrapmaster.com" />
                            {this.props.user.fullname}
                        </a>
                        <div className="dropdown-menu dropdown-menu-right">
                            <a className="dropdown-item" href="#" onClick={this.handleLogoutClick.bind(this)}>
                                <i className="fa fa-sign-out"></i> Đăng xuất</a>
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

Header.defaultProps = {
    user: {}
}

const mapStateToProps = state => ({
    user: state.auth.user
})

const mapDispatchToProps = dispatch => ({
    unauthenticate: () => dispatch({
        type: authActions.UNAUTHENTICATED
    })
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Header))
