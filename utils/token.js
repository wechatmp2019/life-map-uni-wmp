/*
 * token 管理，获取，验证
 * @Author: chenjiaxi
 * @Date: 2019-05-19 22:21:00
 * @Last Modified by: chenjiaxi
 * @Last Modified time: 2019-05-23 21:25:26
 */
import $http from '../http/request';

class Token {
    // eslint-disable-next-line no-useless-constructor
    constructor () {
    }
    // 用户登录并拿到 token
    login (callback) {
        const _this = this;
        wx.login({
            success: async (res) => {
                console.log('wx.login success,code:', res.code);
                const resData = await $http.login({code: res.code});
                if (resData.success) {
                    _this._setTokenAndId(resData);
                    callback && callback(resData.data.api_token);
                } else {
                    wx.showToast({
                        title: '登录失败',
                        icon: 'none',
                        duration: 1000
                    });
                }
            }
        });
    }

    // 去服务器刷新 token
    async refreshTokenFromServer (callback) {
        const resData = await $http.refreshToken({
            api_token: wx.getStorageSync('api_token'),
            refresh_token: wx.getStorageSync('refresh_token'),
            open_id: wx.getStorageSync('open_id')
        });
        if (resData.success) {
            this._setTokenAndId(resData);
            callback && callback(resData.data.api_token);
        } else {
            wx.showToast({
                title: 'Token 刷新失败',
                icon: 'none',
                duration: 1000
            });
        }
    }

    _setTokenAndId (resData) {
        wx.setStorageSync('api_token', resData.data.api_token);
        wx.setStorageSync('refresh_token', resData.data.refresh_token);
        wx.setStorageSync('open_id', resData.data.open_id);
    }
}

export { Token };
