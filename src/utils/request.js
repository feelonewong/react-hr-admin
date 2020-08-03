import axios from 'axios';

/**
 * 1.创建实例
 * 2.请求拦截
 * 3.响应拦截
*/
const service = axios.create({
    baseURL: "devApi",
    timeout: 3000
})

service.interceptors.request.use( function(config){
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
