
import request from "@/providers/request";

export function getProfessionalList(params){
    let url = 'professional/page/' +params.page+ '/' +params.limit;
    return request({
        url : url,
        method:'GET',
        params
    })
}

export function getAllProfessional(){
    return request({
        url: 'professional/all',
        method: 'GET'
    });
}


export function createProfessional(data){
    return request({
        url: 'professional/save',
        method: 'POST',
        data
    });
}

export function updateProfessional(data){
    return request({
        url: 'professional/update',
        method: 'POST',
        data
    });
}

export function getProfessional(id){
    return request({
        url : 'professional/get/' + id,
        method:'GET',
    })
}

export function delProfessional(id){
    return request({
        url : 'professional/delete/' + id
    })
}
