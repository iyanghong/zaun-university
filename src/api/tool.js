/**
 * Created by yh on 2021/5/27
 */
import request from '@/providers/request.js'

export function generatePersonal() {
    return request({
        url : 'https://service.iyanghong.cn/api/tool/data/generate/personal',
        method : 'GET'
    });
}
