
import service from "../utils/request";

export function DepartmentAddSubmit(data){
    return service.request({
        url:"/department/add",
        method:"post",
        data
    })
}

export function GetDepartmentList(data){
    return service.request({
        url:"/department/list/",
        method:"post",
        data
    })
}