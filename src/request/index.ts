import axios from 'axios'

axios.defaults.timeout = 50000
axios.defaults.baseURL = '/api'
axios.defaults.withCredentials = true
axios.defaults.timeout = 5000
axios.interceptors.request.use(config => {
    // ...
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(config => {
    // ...
    const data = config.data;
    if (data.code != 0) {
        return Promise.reject(data.msg)
    }
    return data.data
}, error => {
    return Promise.reject(error)
})

export function loginApi(username: string, password: string) {
    return axios.post(`/login`, {
        username: username,
        password: password
    })
}