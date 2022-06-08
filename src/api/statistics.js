import request from "@/providers/request";

export function getDataTotal() {
    return request({
        url: 'statistics/total',
        method: 'GET'
    })
}

export function getHotProfessional() {
    return request({
        url: 'statistics/hotProfessional',
        method: 'GET'
    })
}

export function getProvinceTotal() {
    return request({
        url: 'statistics/provinceTotal',
        method: 'GET'
    })
}

