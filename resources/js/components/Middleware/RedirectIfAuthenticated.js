import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { fetchAuthUser } from '../../actions/authActions'

export default function (ComposedComponent) {
    class RedirectIfAuthenticated extends Component {
        constructor(props) {
            super(props)
        }

        UNSAFE_componentWillMount() {
            if (!(this.props.location.state && this.props.location.state.referrer === '/admin/dashboard'))
                this.props.dispatch(fetchAuthUser())
        }

        render() {
            return this.props.isAuthenticated ? <Redirect to='/admin/dashboard' /> : <ComposedComponent {...this.props} />
        }
    }

    RedirectIfAuthenticated.defaultProps = {
        isAuthenticated: false
    }

    const mapStateToProps = state => ({
        isAuthenticated: state.auth.isAuthenticated
    })

    return connect(mapStateToProps)(RedirectIfAuthenticated)
}
