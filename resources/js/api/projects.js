import config from './config'
import axios from 'axios'

export const getAll = (search = '') => {
    return axios.get(`/api/admin/projects${search}`, config)
}

export const supervisor = (search = '') => {
    return axios.get(`/api/admin/projects/supervisor${search}`, config)
}

export const constructionUnit = (search = '') => {
    return axios.get(`/api/admin/projects/construction_unit${search}`, config)
}
