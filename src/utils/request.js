import axios from 'axios';
import {getUsername,getToken} from "./cookie";
/**
 * 1.创建实例
 * 2.请求拦截
 * 3.响应拦截
*/
const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devApi';
const service = axios.create({
    baseURL: BASEURL,
    timeout: 3000
})

service.interceptors.request.use( function(config){
    config.headers["Token"] = getToken();
    config.headers["Username"] = getUsername();
    return config;
},function(error){
    return Promise.reject(error);
})

service.interceptors.response.use( function(config){
    return config;
},function(error){
    return Promise.reject(error);
})

export default service;   
