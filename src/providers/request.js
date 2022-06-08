import axios from 'axios'
import store from '@/store'
import router from '@/router'
import {
    Message,
    MessageBox
} from 'element-ui' //提示框



const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API_URL, //接口根路径
    timeout: 5000,
    prefix: process.env.VUE_APP_BASE_API_PREFIX,
    retry: 3, //请求次数
    retryDelay: 100, //请求间隙
    method: 'POST'
});


function tansJsonParams(params) {
    let result = ''
    if(params===undefined) return result;
    for (const propName of Object.keys(params)) {
        const value = params[propName];
        let part = encodeURIComponent(propName) + "=";
        if (value !== null && typeof (value) !== "undefined") {
            if (typeof value === 'object') {
                for (const key of Object.keys(value)) {
                    if (value[key] !== null && typeof (value[key]) !== 'undefined') {
                        let params = propName + '[' + key + ']';
                        let subPart = encodeURIComponent(params) + "=";
                        result += subPart + encodeURIComponent(value[key]) + "&";
                    }
                }
            } else {
                result += part + encodeURIComponent(value) + "&";
            }
        }
    }
    return result
}
/**
 * 请求拦截
 */
service.interceptors.request.use(
    config => {
        if (config.url === '' || config.url === null) {
            Message({
                message: 'api接口地址不应该为空',
                type: 'error',
                duration: 5 * 1000
            });
            return Promise.reject(new Error('api接口地址不应该为空'))
        }
        config.baseURL = config.baseURL + config.prefix


        if (typeof config.retry != 'number') {
            config.retry = 3;
        }
        if (typeof config.retryDelay != 'number') {
            config.retryDelay = 100;
        }
        if (typeof config.timeout != 'number') {
            config.timeout = 5000;
        }
        if(!config.notTansJsonParams){
            config.data = tansJsonParams(config.data)
        }

        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)


/**
 * 相应拦截
 */
service.interceptors.response.use(
    response => {
        const res = response.data
        //处理断网
        response.status === 200 && store.dispatch('app/changeNetWork', true);

        //解析请求状态
        if (!errorHandle(response.status)) {
            return Promise.reject(new Error(res.message || 'Error'))
        }
        //解析接口状态
        if (!errorHandle(res.code)) {
            return Promise.reject(new Error(res.message || 'Error'))
        }
        return res;
    },
    error => {

        const {
            response
        } = error;

        //检测断网
        if (response) {
            Message({
                message: error.message,
                type: 'error',
                duration: 5 * 1000
            });
            return Promise.reject(error)
        } else {
            /**
             * 请求超时/网络错误 重新建立连接
             */
            var config = error.config;
            if (!config || !config.retry) return Promise.reject(error);

            config.retryCount = config.retryCount || 0; //初始化请求次数

            //大于设定请求次数，直接返回错误
            if (config.retryCount >= config.retry) {
                //断网处理
                response.status === 200 && store.dispatch('app/changeNetWork', false);
                return Promise.reject(error);
            }
            config.retryCount += 1;
            console.log('重新建立请求第' + config.retryCount + '次');
            let retry = new Promise((resolve) => {
                setTimeout(function () {
                    resolve();
                }, config.retryDelay || 1);
            });
            return retry.then(() => {
                return service(config);
            });
        }
    }
);

/**
 * 标记变量，标记是否弹出未登录提示框，防止页面多个请求，弹出多个登录提示框
 */
var noLoginMsg = false;
/**
 * 状态码解析验证
 */
const errorHandle = (status) => {
    let flag = true;
    switch (status) {
        case 50001:
            if (location.pathname === '/login') {
                return true;
            }
            flag = false;
            if (!noLoginMsg) {
                noLoginMsg = true;
                MessageBox.confirm('您未登录, 是否前去登录?',
                    '提示', {
                        type: 'warning'
                    })
                    .then(() => {

                        noLoginMsg = false;
                        let history = window.location.hash;
                        let endIndex = history.length - 1;

                        //解析历史，即登录成功跳转的页面
                        if (history === '#') {
                            history = '/';
                        } else {
                            if (history.indexOf('?') > -1) {
                                endIndex = history.indexOf('?');
                            }
                            history = history.substring(1, endIndex);
                        }
                        router.push({
                            path: '/login',
                            query: {
                                history: history
                            }
                        });
                    }).catch(() => {
                    noLoginMsg = false;
                });
            }
            break;
        case 10107:
            flag = false;
            Message({
                message: '您无权限操作',
                type: 'error',
                duration: 5 * 1000
            });
            break;
        case 404:
            flag = false;
            Message({
                message: '接口失踪',
                type: 'error',
                duration: 5 * 1000
            });
            break;
        case 500:
            flag = false;
            Message({
                message: '系统出错',
                type: 'error',
                duration: 5 * 1000
            });
            break;
        default:
            break;
    }
    return flag;
}
export default service
