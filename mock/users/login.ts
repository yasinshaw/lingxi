import {MockMethod, Recordable} from 'vite-plugin-mock'
import {resultError, resultSuccess} from "../util";
import {UserInfo} from "../../src/types/userInfo";

// @ts-ignore
export default [
    {
        url: "/login", //匹配到指定url
        method: "post",        //请求类型
        response: ({ body }: Recordable) => {
            const { username, password } = body;
            if (username != "lingxi" || password != "lingxi") {
                return resultError('用户名或密码错误，请重新输入！');
            }
            const userInfo = new UserInfo();
            userInfo.username = username
            userInfo.nickName = "灵希"
            userInfo.avatar = "/avatar.png"
            userInfo.token = "mytoken"
            return resultSuccess(userInfo)
        }
    }
] as MockMethod[]