import axios from 'axios'

export const login = ({ email, password }) => {
    return axios.post(`/api/admin/login`, { email, password })
}

export const logout = () => {
    const { token } = window.localStorage
    const data = {
        token: token
    }
    const config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    return axios.post(`/api/admin/logout`, data, config)
}
