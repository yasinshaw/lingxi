import axios from 'axios'

axios.defaults.timeout = 50000

axios.interceptors.request.use(config => {
    // ...
    return config
}, error => {
    return Promise.reject(error)
})

export function getUsers() {
    return axios.get(`/api/getUsers`)
}