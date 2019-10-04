import axios from 'axios'

export const AUTHENTICATED = 'AUTHENTICATED'
export const UNAUTHENTICATED = 'UNAUTHENTICATED'
export const SET_USER = 'SET_USER'
export const SET_ERROR = 'SET_ERROR'

export function authenticated() {
    return {
        type: AUTHENTICATED
    }
}

export function unauthenticated() {
    return {
        type: UNAUTHENTICATED
    }
}

export function login(data) {
    let url = window.Laravel.baseUrl + '/api/admin/login'

    return dispatch => {
        return axios.post(url, data)
            .then(res => {
                const accessToken = res.data.token
                window.sessionStorage.setItem('accessToken', accessToken)
                dispatch(authenticated())
            })
            .catch(error => {
                dispatch(setError(error.response.data.errors))
            })
    }
}

export function fetchAuthUser() {
    let url = window.Laravel.baseUrl + '/api/admin/auth'
    let config = {
        headers: {
            'Authorization': "Bearer " + window.sessionStorage.getItem('accessToken')
        }
    }

    return dispatch => {
        return axios.get(url, config)
            .then(res => {
                dispatch(authenticated())
                dispatch(setUser(res.data))
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export function setUser(data) {
    return {
        type: SET_USER,
        user: data
    }
}

export function setError(data) {
    return {
        type: SET_ERROR,
        errors: data
    }
}
