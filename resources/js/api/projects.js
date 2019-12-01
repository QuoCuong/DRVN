import axios from 'axios'

export const getAll = (search = '') => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.token
        }
    }
    return axios.get(`/api/admin/projects${search}`, config)
}

export const supervisor = (search = '') => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.token
        }
    }
    return axios.get(`/api/admin/projects/supervisor${search}`, config)
}

export const constructionUnit = (search = '') => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.token
        }
    }
    return axios.get(`/api/admin/projects/construction_unit${search}`, config)
}

export const createProject = (data) => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.token
        }
    }
    return axios.post('/api/admin/projects', data, config)
}

export const projectShow = (id) => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.token
        }
    }
    return axios.get(`/api/admin/projects/${id}`, config)
}

export const updateProject = (id, data) => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.token
        }
    }
    return axios.post(`/api/admin/projects/${id}`, data, config)
}
