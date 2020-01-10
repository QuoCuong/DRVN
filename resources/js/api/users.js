import axios from 'axios'

export const getAllUser = search => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.token
        }
    }
    return axios.get(`/api/admin/users${search}`, config)
}

export const createUser = data => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.token
        }
    }
    return axios.post('/api/admin/users', data, config)
}

export const supervisors = () => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.token
        }
    }
    return axios.get('/api/admin/users/supervisors', config)
}

export const constructionUnits = () => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.token
        }
    }
    return axios.get('/api/admin/users/construction_units', config)
}

export const userShow = id => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.token
        }
    }
    return axios.get(`/api/admin/users/${id}`, config)
}

export const updateRole = (id, role) => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.token
        }
    }
    const data = {
        role: role
    }
    return axios.post(`/api/admin/users/${id}/role`, data, config)
}

export const lockUser = id => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.token
        }
    }
    return axios.post(`/api/admin/users/${id}/lock`, [], config)
}

export const unlockUser = id => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.token
        }
    }
    return axios.post(`/api/admin/users/${id}/unlock`, [], config)
}
