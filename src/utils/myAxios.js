import axios from 'axios'
import { useUserStore } from '../store/user.js'
import { reqLogin, reqUserInfo } from "@/api/login"
import router from '../router/index.js'



// const { user } = userStore

const instance = axios.create({
    // baseURL: 'https://s4.s100.vip:7147',
    // baseURL: '/proxy',
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        Accept: 'fz56yse2881nd2r0fz56yse2881nd2r0'
    }
})

instance.interceptors.request.use(function (config) {



    if ('/api/add_article_model' === config.url) {
        // config.headers['Content-Type'] = 'multipart/form-data';
        console.log("我要给你添加请求头垃");

        config.headers['Content-Type'] = 'multipart/form-data';
        // config.headers['Content-Type'] = 'xxxxxxxxxxxxxxxxxxxxxxxxxx';
        // config.headers['xxxxxx-xx'] = 'xxxx/xxxx-xx';
    }
    console.log(config.url, '=>config.url');

    // Do something before request is sent
    const access_token = localStorage.getItem('access_token');
    if (access_token) {


        // reqUserInfo().then(resInfo => {
        // console.log(res, "resInfo");
        // const userStore = useUserStore()


        // console.log(resInfo, 'resInfo');
        // userStore.setUserInfo(resInfo)
        // })

        config.headers['Authorization'] = `Bearer ${access_token}`;
        // config.headers['access_token'] = `Bearer${access_token}`;
        // config.headers['token'] = `Bearer${access_token}`;
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    // Do something with response data
    // console.log(response, '响应体');
    // return response.data.data;

    return response.data;

}, function (error) {

    const userStore = useUserStore()

    if (error.response.status === 401) {
        userStore.removeUserStore()
        alert('授权过期，重新登陆');
        router.push('/login')
    }
    // Do something with response error
    return Promise.reject(error);
});

export default instance;
