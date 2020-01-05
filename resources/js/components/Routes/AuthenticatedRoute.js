import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router'

const AuthenticatedRoute = ({ component: C, ...rest }) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated
                    ? <C {...props} />
                    : <Redirect to='/admin/login'/>
            }
        />
    )
}

export default AuthenticatedRoute
