
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


export function DeleteDepartmentList(data){
    return service.request({
        url:"/department/delete/",
        method:"post",
        data
    })
}

export function DepartmentStatus(data){
    return service.request({
        url:"/department/status/",
        method:"post",
        data
    })
}


export function DepartmentDetails(data){
    return service.request({
        url:"/department/detailed/",
        method:"post",
        data
    })
}

export function DepartmentEdit(data){
    return service.request({
        url:"/department/edit/",
        method:"post",
        data
    })
}