import request from "@/providers/request";


export function getAllTeacher() {
    return request({
        url: 'user/teacher/all',
        method: 'GET'
    })
}

export function getTeacherList(params) {
    let url = 'user/teacher/' + params.page + '/' + params.limit;
    return request({
        url: url,
        method: 'GET',
        params
    })
}

export function addTeacher(data) {
    return request({
        url: 'user/teacher/save',
        data
    })
}

export function updateTeacher(data) {
    return request({
        url: 'user/teacher/update',
        data
    })
}

export function getTeacher(id) {
    return request({
        url: 'user/teacher/get/' + id,
        method: 'GET'
    })
}


export function getStudentList(params) {
    let url = 'user/student/' + params.page + '/' + params.limit;
    return request({
        url: url,
        method: 'GET',
        params
    })
}

export function getStudentByClass(id) {
    return request({
        url: 'user/class/' + id + '/student',
        method: 'GET'
    })
}

export function addStudent(data) {
    return request({
        url: 'user/student/save',
        data
    })
}

export function updateStudent(data) {
    return request({
        url: 'user/student/update',
        data
    })
}

export function getStudent(id) {
    return request({
        url: 'user/student/get/' + id,
        method: 'GET'
    })
}

export function delUser(id) {
    return request({
        url: 'user/delete/' + id,
        method: 'POST'
    })
}


