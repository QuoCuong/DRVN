import axios from 'axios'

export const createProjectProgress = (projectId, data) => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.token
        }
    }
    return axios.post(`/api/admin/projects/${projectId}/progresses`, data, config)
}

export const confirmProgress = progressId => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.token
        }
    }
    return axios.post(`/api/admin/progresses/${progressId}/confirm`, [], config)
}

export const issues = (progressId, issues) => {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + window.localStorage.token
        }
    }
    const data = {
        'issues': issues
    }
    return axios.post(`/api/admin/progresses/${progressId}/issues`, data, config)
}
