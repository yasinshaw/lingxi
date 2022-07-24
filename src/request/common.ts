import $axios from "@/request/index";

export function getQiniuFileTokenApi(): Promise<string> {
    return $axios.get(`/common/qiniu/token`, {
    })
}
