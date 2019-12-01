import actions from './actions'

const initialState = {
    loading: false
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actions.TOGGLE_LOADING:
            return {
                ...state,
                loading: !state.loading
            }
        case actions.ENABLE_LOADING:
            return {
                ...state,
                loading: true
            }
        case actions.DISABLE_LOADING:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}

export default appReducer
