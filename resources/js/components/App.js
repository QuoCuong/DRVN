import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import authActions from '../redux/auth/actions'
import { Route, Switch } from 'react-router-dom'
import NotFound from './NotFound'
import UnauthenticatedRoute from './Routes/UnauthenticatedRoute'
import Login from './Login'
import AuthenticatedRoute from './Routes/AuthenticatedRoute'
import AppContainer from './AppContainer'

const App = props => {
    const { fetchAuthUser } = props

    useEffect(() => {
        const { token } = window.localStorage
        token && fetchAuthUser()
    }, [])

    return (
        <Switch>
            <UnauthenticatedRoute
                exact
                path="/admin/login"
                component={Login}
            />
            <AuthenticatedRoute
                path="/admin"
                component={AppContainer}
            />
            <Route component={NotFound} />
        </Switch>
    )
}

const mapDispatchToProps = dispatch => ({
    fetchAuthUser: () => dispatch({ type: authActions.FETCH_AUTH_USER })
})

export default connect(
    null,
    mapDispatchToProps
)(App)
