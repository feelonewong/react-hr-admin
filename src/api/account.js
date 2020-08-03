import service from "../utils/request.js";

export function Login(params){
    return service.request({
        url:"/login/",
        methods:"post",
        params
    })
}