import axios from 'axios'

export const createUser = (data) => {
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

export const userShow = (id) => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.token
        }
    }
    return axios.get(`/api/admin/users/${id}`, config)
}
