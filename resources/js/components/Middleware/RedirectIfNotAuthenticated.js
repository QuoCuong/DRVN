import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { fetchAuthUser } from '../../actions/authActions'

export default function (ComposedComponent) {
    class RedirectIfNotAuthenticated extends Component {
        constructor(props) {
            super(props)
        }

        UNSAFE_componentWillMount() {
            this.props.dispatch(fetchAuthUser())
        }

        render() {
            if (!this.props.isAuthenticated)
                return <Redirect to={{
                    pathname: '/admin/login',
                    state: { referrer: this.props.location.pathname }
                }} />

            return <ComposedComponent {...this.props} />
        }
    }

    RedirectIfNotAuthenticated.defaultProps = {
        isAuthenticated: false
    }

    const mapStateToProps = state => ({
        isAuthenticated: state.auth.isAuthenticated
    })

    return connect(mapStateToProps)(RedirectIfNotAuthenticated)
}
