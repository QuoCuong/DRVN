import axios from 'axios'

export const getAll = (search = '') => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.token
        }
    }
    return axios.get(`/api/admin/projects${search}`, config)
}

export const createProject = data => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.token
        }
    }
    return axios.post('/api/admin/projects', data, config)
}

export const projectShow = id => {
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

export const startProject = id => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.token
        }
    }
    return axios.post(`/api/admin/projects/${id}/start`, [], config)
}

export const suspendProject = (id, data) => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.token
        }
    }
    return axios.post(`/api/admin/projects/${id}/suspend`, data, config)
}

export const cancelProject = (id, data) => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.token
        }
    }
    return axios.post(`/api/admin/projects/${id}/cancel`, data, config)
}

export const resumeProject = id => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.token
        }
    }
    return axios.post(`/api/admin/projects/${id}/resume`, [], config)
}

export const approveProject = id => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.token
        }
    }
    return axios.post(`/api/admin/projects/${id}/approve`, [], config)
}
