/*
 * @Author: chenjiaxi
 * @Date: 2019-05-15 19:50:37
 * @Last Modified by: chenjiaxi
 * @Last Modified time: 2019-05-23 15:04:46
 */

import fly from './config';
import qs from 'qs';
import config from '../config';

const host = config.host;

const request = {
    get: (params) => {
        const token = wx.getStorageSync('api_token');
        const queryString = qs.stringify(Object.assign({}, {api_token: token}, params.data));
        return fly.get(`${host}${params.url}?${queryString}`);
    },
    post: (params) => {
        const token = wx.getStorageSync('api_token');
        const queryString = qs.stringify({api_token: token});
        return fly.post(`${host}${params.url}?${queryString}`, params.data);
    },
    // 封装的登录请求，根据后台接收方式选择是否加qs.stringify
    login: (params) => {
        return fly.post('/oauth/login', params);
    },
    refreshToken: (params) => {
        return fly.post('/oauth/refresh-token', params);
    }
};

export default request;
