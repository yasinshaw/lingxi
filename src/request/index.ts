import axios from 'axios'
import {ElMessage} from "element-plus";
import {userUserStore} from "@/store/modules/user";

axios.defaults.timeout = 50000
axios.defaults.baseURL = '/api'
axios.defaults.withCredentials = true
axios.defaults.timeout = 5000
axios.interceptors.request.use(request => {
    request.headers!.authorization = userUserStore.authorization
    return request
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    const data = response.data;
    if (response.headers.authorization) {
        userUserStore.setAuthorization(response.headers.authorization)
    }
    if (data.code != 0) {
        ElMessage.error(data.message)
        return Promise.reject()
    }
    return data.data
}, error => {
    return Promise.reject(error)
})

const $axios = axios
export default $axios