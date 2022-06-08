
import request from "@/providers/request";

export function getCollegeList(params){
    let url = 'college/page/' +params.page+ '/' +params.limit;
    return request({
        url : url,
        method:'GET',
        params
    })
}

export function getAllCollege(){
    return request({
        url: 'college/all',
        method: 'GET'
    });
}


export function createCollege(data){
    return request({
        url: 'college/save',
        method: 'POST',
        data
    });
}

export function updateCollege(data){
    return request({
        url: 'college/update',
        method: 'POST',
        data
    });
}

export function getCollege(id){
    return request({
        url : 'college/get/' + id,
        method:'GET',
    })
}

export function delCollege(id){
    return request({
        url : 'college/delete/' + id
    })
}
