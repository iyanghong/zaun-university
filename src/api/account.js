import request from "@/providers/request";

export function login(account, password) {
    return request({
        url: 'user/login',
        method: 'POST',
        data: {
            account,
            password
        }
    })
}
