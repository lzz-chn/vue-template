import Vue from 'vue';
import axios from 'axios';
import qs from 'qs'; // 引入qs模块，用来序列化post类型的数据
import { Message } from 'element-ui';

axios.defaults.baseURL = 'http://rnd.scimedsoft.com:21004/'; // 测试   
// axios.defaults.headers.common['Authorization'] = store.state.token;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        // const token = store.state.token;
        // token && (config.headers.Authorization = token);
        return config;
    },
    error => {
        Message.error('请求异常');
        console.log('请求异常 :', error);
        return Promise.error(error);
    }
);

// 响应拦截器
axios.interceptors.response.use(
    response => {
        // if (response.status === 200) {
        //     return Promise.resolve(response);
        // } else {
        //     return Promise.reject(response);
        // }
        return Promise.resolve(response);
    },
    error => {
        Message.error('响应异常');
        console.log('响应异常 :', error);
        return Promise.reject(error);
    }
);

Plugin.install = (Vue, options) => {
    Vue.prototype.$axios = {
        // 封装 get
        get(url, params) {
            return axios.get(url, { params });
        },
        // 封装 post
        post(url, params) {
            return axios.post(url, qs.stringify(params));
        }
    };
};

Vue.use(Plugin);

export default Plugin;
