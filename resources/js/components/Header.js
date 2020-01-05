import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../api/auth'
import authActions from '../redux/auth/actions'
import { withRouter } from 'react-router-dom'

const Header = props => {
    const { user, unauthenticate } = props

    const handleLogoutClick = () => {
        logout()
            .then(() => {
                unauthenticate()
                props.history.push('/admin/login')
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <header className="app-header navbar">
            <button className="navbar-toggler sidebar-toggler d-lg-none mr-auto" type="button" data-toggle="sidebar-show">
                <span className="navbar-toggler-icon"></span>
            </button>
            <a className="navbar-brand" href="/admin">
                <img className="navbar-brand-full" src="/img/brand/logo.png" width="89" height="25" alt="CoreUI Logo" />
                <img className="navbar-brand-minimized" src="/img/brand/sygnet.svg" width="30" height="30"
                    alt="CoreUI Logo"
                />
            </a>
            <button className="navbar-toggler sidebar-toggler d-md-down-none" type="button" data-toggle="sidebar-lg-show">
                <span className="navbar-toggler-icon"></span>
            </button>
            <ul className="nav navbar-nav ml-auto mr-4">
                <li className="nav-item dropdown">
                    <a className="nav-link" data-toggle="dropdown" href="#" role="button" aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <img className="img-avatar" src="/img/avatars/avatar.jpg" alt="" />
                        {user.fullname}
                    </a>
                    <div className="dropdown-menu dropdown-menu-right">
                        <a className="dropdown-item" href="#" onClick={handleLogoutClick}>
                            <i className="fa fa-sign-out"></i> Đăng xuất</a>
                    </div>
                </li>
            </ul>
        </header>
    )
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
