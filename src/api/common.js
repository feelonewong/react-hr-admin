import service from "@/utils/request";

/**
 * list delete
 * */ 
export function TableDelete(data){
    return service.request({
        url: data.url,
        method:"post",
        data
    })
}