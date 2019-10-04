import axios from 'axios'
import config from './config'

export const createUser = (data) => {
    const url = '/api/admin/users'
    return axios.post(url, data, config)
}
