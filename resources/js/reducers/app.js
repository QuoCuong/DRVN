import {
    TOGGLE_LOADING,
    ENABLE_LOADING,
    DISABLE_LOADING
} from '../actions/appActions'

const initialState = {
    loading: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_LOADING:
            return {
                ...state,
                loading: !state.loading
            }
        case ENABLE_LOADING:
            return {
                ...state,
                loading: true
            }
        case DISABLE_LOADING:
            return {
                ...state,
                loading: false
            }

        default:
            return state
    }
}

export default appReducer
