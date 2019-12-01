import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'

import authActions from '../../redux/auth/actions'

function redirectIfAuthenticated(WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props)
        }

        UNSAFE_componentWillMount() {
            const { token } = window.localStorage
            const { fetchAuthUser } = this.props

            token && fetchAuthUser()
        }

        render() {
            const { isAuthenticated } = this.props

            return !isAuthenticated ? <WrappedComponent {...this.props} /> : <Redirect to='/admin/dashboard' />
        }
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    fetchSuccess: state.auth.fetchSuccess
})

const mapDispatchToProps = dispatch => ({
    fetchAuthUser: () => dispatch({ type: authActions.FETCH_AUTH_USER })
})

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        mapDispatchToProps
    ),
    redirectIfAuthenticated
)
