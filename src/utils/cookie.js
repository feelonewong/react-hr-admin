
import cookies from "react-cookies";

const adminToken =  "adminToken";
const username = "username"
export function setUsername(value){
    cookies.save(username,value);
}
export function getUsername(){
   return  cookies.load(username);
}
export function setToken(value){
    cookies.save(adminToken,value);
}
export function getToken(){
   return   cookies.load(adminToken);
}