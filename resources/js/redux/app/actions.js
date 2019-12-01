const actions = {
    TOGGLE_LOADING: 'TOGGLE_LOADING',
    ENABLE_LOADING: 'ENABLE_LOADING',
    DISABLE_LOADING: 'DISABLE_LOADING',

    toggleLoading: () => {
        return {
            type: actions.TOGGLE_LOADING
        }
    },

    enableLoading: () => {
        return {
            type: actions.ENABLE_LOADING
        }
    },

    disableLoading: () => {
        return {
            type: actions.DISABLE_LOADING
        }
    }
}

export default actions
