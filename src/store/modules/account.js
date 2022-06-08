// import {login, logout, checkLogin, changeBaseAccount, refreshAccount} from '@/api/account.js'

// import permission from '@/providers/permission'

import {login} from "@/api/account";
import cache from "@/providers/cache";

const state = {
    isLogin: false,
    user: null
};

const mutations = {
    CHANGE_LOGIN(state, isLogin) {
        state.isLogin = isLogin
    },
    SET_USER(state, user) {
        state.user = user;
    }
};

const actions = {
    readCacheUser({commit}) {
        // let user = permission.getNowUser();
        // if (user) {
        //     commit('SET_USER', user);
        // }

    },
    /**
     * 登录
     */
    login({commit}, {account,password}) {
        return new Promise((resolve, reject) => {
            login(account,password).then(response => {
                if(response.success === true){
                    commit('CHANGE_LOGIN', true);
                    cache.set('user',response.data)
                    commit('SET_USER',response.data)
                }
                resolve(response);
            }).catch(error => {
                reject(error);
            })
        });
    },
    /**
     * 注销登录
     */
    logout({commit}, redirect = true) {
        return new Promise((resolve, reject) => {
            cache.del('user')
            location.href = '/login';
        });
    },
    setUser({commit}, user) {
        commit('SET_USER', user);
    },
    checkLogin({commit}) {
        return new Promise((resolve, reject) => {
            let user = cache.getJson('user');
            if(user){
                commit('CHANGE_LOGIN', true);
                commit('SET_USER',user);
            }else{
                commit('CHANGE_LOGIN', false);
                commit('SET_USER', null);
            }

            resolve();
        });
    },
    changeBaseAccount({dispatch}, data) {
        // return new Promise((resolve, reject) => {
        //     changeBaseAccount(data).then(response => {
        //         resolve(response);
        //         dispatch('refresh');
        //     }).catch(error => {
        //         reject(error)
        //     });
        // });
    },
    refresh({commit}, token = null) {
        // return new Promise((resolve, reject) => {
        //     refreshAccount(token).then(response => {
        //         if (response.success === true) {
        //             setTimeout(() => {
        //
        //                 permission.setLeftConsoleNav(response.data.menu_list);
        //                 delete response.data.menu_list;
        //                 permission.setApiAuth(response.data.auth_api_list);
        //                 delete response.data.auth_api_list;
        //                 permission.setPageAuth(response.data.auth_page_list);
        //                 delete response.data.auth_page_list;
        //
        //                 commit('CHANGE_LOGIN', true);
        //                 let data = JSON.stringify(response.data);
        //                 permission.setNowUser(data);
        //                 commit('SET_USER', permission.getNowUser());
        //                 resolve(response.data);
        //             }, 300);
        //         }
        //
        //     }).catch(error => {
        //         reject(error);
        //     })
        // });
    }

};


export default {
    namespaced: true,
    state,
    mutations,
    actions
}
