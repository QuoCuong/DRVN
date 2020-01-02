import actions from './actions'

const initialState = {
    isAuthenticated: null,
    fetchSuccess: true,
    user: {
        role: {}
    }
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
    case actions.LOGIN_SUCCESS:
        return {
            ...state,
            isAuthenticated: true,
            user: action.user
        }
    case actions.LOGIN_FAILURE:
        return {
            ...state,
            isAuthenticated: false,
            fetchSuccess: false
        }
    case actions.AUTHENTICATED:
        return {
            ...state,
            isAuthenticated: true
        }
    case actions.UNAUTHENTICATED:
        return {
            ...state,
            isAuthenticated: false
        }
    default:
        return state
    }
}

export default authReducer
