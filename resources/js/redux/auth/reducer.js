import actions from './actions'

const initialState = {
    isAuthenticated: false,
    logginRequesting: false,
    user: {
        role: {}
    }
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
    case actions.LOGIN_REQUESTING:
        return {
            ...state,
            logginRequesting: true
        }
    case actions.LOGIN_SUCCESS:
        return {
            ...state,
            logginRequesting: false,
            isAuthenticated: true,
            user: action.user
        }
    case actions.LOGIN_FAILURE:
        return {
            ...state,
            logginRequesting: false,
            isAuthenticated: false
        }
    case actions.AUTHENTICATED:
        return {
            ...state,
            logginRequesting: false,
            isAuthenticated: true
        }
    case actions.UNAUTHENTICATED:
        return {
            ...state,
            logginRequesting: false,
            isAuthenticated: false
        }
    default:
        return state
    }
}

export default authReducer
