import {
    AUTHENTICATED,
    UNAUTHENTICATED,
    SET_USER,
    SET_ERROR
} from '../actions/authActions'

const initialState = {
    isAuthenticated: false,
    user: {},
    errors: {}
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: true
            }
        case UNAUTHENTICATED:
            return {
                ...state,
                isAuthenticated: false
            }
        case SET_USER:
            return {
                ...state,
                user: action.user
            }
        case SET_ERROR:
            return {
                ...state,
                errors: action.errors
            }

        default:
            return state
    }
}

export default authReducer
