
import axios from "axios";
// import store from "@/store";

// 创建并配置一个新的axios
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // 这里指所有接口请求的“请求地址前缀”，完整请求地址 = 请求地址前缀 + 接口后缀，即 url = baseURL + request url
    timeout: 60000, // 请求超时时间 毫秒
    // withCredentials: true,   // 异步请求时是否携带cookie
    // headers: {   // 设置后端需要的传参类型，后端不要求，这没必要设置
    //     "Content-Type": "application/json",
    //     token: "your token",
    //     "X-Requested-With": "XMLHttpRequest",
    // },
});

// 添加请求拦截器
service.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么。。。
        // 比如配置请求token（如果需要的话）
        // const tokenInfo = store.state.account.tokenInfo;
        // if (tokenInfo && tokenInfo.tokenName) {
        //     config.headers[tokenInfo.tokenName] = tokenInfo.tokenValue; //配置请求token
        // }
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
service.interceptors.response.use(
    (response) => {
        const res = response.data;
        if (res.code == 401) {
            //登录拦截：接口需要登录，但用户未登录
            // store.commit("account/setUserInfo", ""); //移除用户信息
            // if(confirm("登录失效，是否重新登录")){
            //     console.log("确定")
            // }else{
            //     console.log("取消")
            // }
            return Promise.reject(new Error(res.msg || "Error"));
        } else {
            //其他情况则返回结果，对应状态code需在具体请求函数里判断
            return res;
        }
    },
    (error) => {
        alert(error.msg || "服务器开小差了呢，请稍后再试~");
        return Promise.reject(error);
    }
);

export default service;


// import axios from 'axios'// 创建一个 axios 实例const service = axios.create({baseURL: '/api', // 所有的请求地址前缀部分timeout: 60000, // 请求超时时间毫秒withCredentials: true, // 异步请求携带cookieheaders: {// 设置后端需要的传参类型'Content-Type': 'application/JSON','token': 'your token','X-Requested-With': 'XMLHttpRequest',},})// 添加请求拦截器service.interceptors.request.use(function (config) {// 在发送请求之前做些什么return config},function (error) {// 对请求错误做些什么console.log(error)return Promise.reject(error)})// 添加响应拦截器service.interceptors.response.use(function (response) {console.log(response)// 2xx 范围内的状态码都会触发该函数。// 对响应数据做点什么// dataAxios 是 axios 返回数据中的 dataconst dataAxios = response.data// 这个状态码是和后端约定的const code = dataAxios.resetreturn dataAxios},function (error) {// 超出 2xx 范围的状态码都会触发该函数。// 对响应错误做点什么console.log(error)return Promise.reject(error)})export default service

// import axios from 'axios'// 创建一个 axios 实例
// import Vue from 'vue'
// import axios from 'axios'
// import store from '@/store'
// // import router from './router'
// import { message, Modal, notification } from 'ant-design-vue' /// es/notification
// import { VueAxios } from './axios'
// import { ACCESS_TOKEN } from '@/store/mutation-types'
// const defaultTimeout = 15000;
// // 创建 axios 实例
// const service = axios.create({
//   baseURL: '/api', // api base_url
// })

// const err = (error) => {
//   if (error.response) {
//   const data = error.response.data
//   const token = Vue.ls.get(ACCESS_TOKEN)

//     if (error.response.status === 403) {
//       console.log('服务器403啦，要重新登录！')
//       notification.error({
//         message: 'Forbidden',
//         description: data.message
//       })
//     }
//     if (error.response.status === 500) {
//       if (data.message.length > 0) {
//         message.error(data.message)
//       }
//     }
//     if (error.response.status === 401 && !(data.result && data.result.isLogin) && error.response.config.url.substring(0, 27) !== 'https://graph.microsoft.com') {
//       notification.error({
//         message: 'Unauthorized',
//         description: 'Authorization verification failed'
//       })
//       if (token) {
//         store.dispatch('Logout').then(() => {
//           setTimeout(() => {
//             window.location.reload()
//           }, 1500)
//         })
//       }
//     }
//   }
//   return Promise.reject(error)
// }

// // request interceptor
// service.interceptors.request.use(config => {
//   const token = Vue.ls.get(ACCESS_TOKEN)
//   if (token && !config.headers.OwnToken) {
//     config.headers['Authorization'] = 'Bearer ' + token
//   }
//   if (!config.timeout) {
//     config.timeout = defaultTimeout
//   }
//   return config
// }, err)

// /**
//  * response interceptor
//  * 所有请求统一返回
//  */
// service.interceptors.response.use((response) => {
//   console.log('response ===> ', response);
//   if (response.request.responseType === 'blob') {
//     return response
//   }
//   const resData = response.data
//   const code = response.data.code
//   if (!store.state.app.hasError) {
//     if (code === 1011006 || code === 1011007 || code === 1011008 || code === 1011009) {
//       Modal.error({
//         title: '提示：',
//         content: resData.message,
//         okText: '重新登录',
//         onOk: () => {
//           Vue.ls.remove(ACCESS_TOKEN)
//           store.dispatch('SetHasError', false)
//           window.location.reload()
//         }
//       })
//       store.dispatch('SetHasError', true)
//     }
//     if (code === 1013002 || code === 1016002 || code === 1015002) {
//       message.error(response.data.message)
//       return response.data
//     }
//   }
//   return resData
// }, err)

// const installer = {
//   vm: {},
//   install (Vue) {
//     Vue.use(VueAxios, service)
//   }
// }

// export {
//   installer as VueAxios,
//   service as axios
// }
