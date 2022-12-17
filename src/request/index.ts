import axios from 'axios'
import {ElMessage} from "element-plus";
import {userUserStore} from "@/store/modules/user";
import {Admin} from "@/request/generator/Admin";
import {Common} from "@/request/generator/Common";
import {Milestone} from "@/request/generator/Milestone";

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
    console.log(response)
    const data = response.data;
    if (response.headers.authorization) {
        userUserStore.setAuthorization(response.headers.authorization)
    }
    if (data.code != 0) {
        ElMessage.error(data.message)
        return Promise.reject()
    }
    return data
}, error => {
    return Promise.reject(error)
})

const $axios = axios
const api = {
    Admin: new Admin(),
    Common: new Common(),
    Milestone: new Milestone(),
}
Object.entries(api).forEach(([k, v]) => {
    v.instance = axios
});

export {
    $axios,
    api
}