
import request from "@/providers/request";

export function getClassGradeList(params){
    let url = 'class/page/' +params.page+ '/' +params.limit;
    return request({
        url : url,
        method:'GET',
        params
    })
}

export function getAllClassGrade(){
    return request({
        url: 'class/all',
        method: 'GET'
    });
}


export function createClassGrade(data){
    return request({
        url: 'class/save',
        method: 'POST',
        data
    });
}

export function updateClassGrade(data){
    return request({
        url: 'class/update',
        method: 'POST',
        data
    });
}

export function getClassGradeDetail(id){
    return request({
        url : 'class/get/detail/' + id,
        method:'GET',
    })
}

export function getClassGrade(id){
    return request({
        url : 'class/get/' + id,
        method:'GET',
    })
}

export function delClassGrade(id){
    return request({
        url : 'class/delete/' + id
    })
}
