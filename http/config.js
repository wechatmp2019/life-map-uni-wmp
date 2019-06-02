/*
 * @Author: chenjiaxi
 * @Date: 2019-05-15 19:49:36
 * @Last Modified by: chenjiaxi
 * @Last Modified time: 2019-05-27 01:39:09
 */

import qs from 'qs';
import config from '../config';
import Fly from 'flyio/dist/npm/wx';
import { Token } from '../utils/token';
const fly = new Fly();

fly.config.timeout = 5000;
fly.config.baseURL = config.host;
fly.noRefetch = false; // noRefetch 为 true 时，不做未授权重试机制

// 添加请求拦截器
fly.interceptors.request.use((request) => {
    wx.showLoading({
        title: '加载中...',
        mask: true
    });
    // 给所有请求添加自定义 header
    request.headers = {
        'X-Tag': 'flyio',
        'content-type': 'application/json',
        'api_token': wx.getStorageSync('api_token')
    };

    return request;
});

// 添加响应拦截器,在 then/catch 之前处理
fly.interceptors.response.use(
    (response) => {
        wx.hideLoading();
        return response.data;
    },
    (err) => {
        wx.hideLoading();
        const token = new Token();
        console.log(err);
        // token 重试机制
        const httpCode = err.status.toString();
        if (httpCode === '401') {
            let selfErrCode = '';
            if (err.response) {
                selfErrCode = err.response.data.err_code.toString();
            }
            if (selfErrCode === '51' || selfErrCode === '52') { // api_token 过期或无效
                // 掉刷新接口刷新 token,回调中重发之前请求
                if (!fly.noRefetch) {
                    const requset = err.request;
                    token.refreshTokenFromServer((apiToken) => {
                        _refetch({
                            url: requset.url,
                            data: requset.body,
                            options: {method: requset.method}
                        }, apiToken);
                    });
                }
            } else if (selfErrCode === '53' || selfErrCode === '54') { // refresh_token 过期或无效
                // * 重新登录获取 token
                // const requset = err.request;
                // token.login((apiToken) => {
                //     _refetch({
                //         url: requset.url,
                //         data: requset.body,
                //         options: {method: requset.method}
                //     }, apiToken);
                // });
                token.login();
            }
        }

        if (fly.noRefetch || httpCode !== '401') {
            wx.showToast({
                title: '请求失败',
                icon: 'none',
                duration: 1000
            });
        }
    });

const _refetch = (params, apiToken) => {
    fly.noRefetch = true; // 避免陷入重发循环
    const queryString = qs.stringify({api_token: apiToken});
    const previousUrl = params.url.split('?')[0];
    fly.request(`${previousUrl}?${queryString}`, params.data, params.options)
        .then(() => {
            fly.noRefetch = false; // 重置 noRefetch 状态
        })
        .catch((e) => {
            wx.showToast({
                title: '令牌服务器故障',
                icon: 'none',
                duration: 1000
            });
        });
};

export default fly;
