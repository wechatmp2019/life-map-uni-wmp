/*
 * store actions 文件，异步修改状态
 * @Author: chenjiaxi
 * @Date: 2019-05-15 22:06:14
 * @Last Modified by: chenjiaxi
 * @Last Modified time: 2019-05-30 09:13:41
 */

import $http from '../http/request';
import Config from '../config';
import * as types from './mutationTypes';

const actions = {

    getMap: async (context, payload) => {
        const resData = await $http.get({
            url: `/api/map/${Config.buptMapId}`,
            data: payload
        });
        if (resData.success) {
            context.commit(types.SET_CURRENT_MAP, resData.data);
            context.commit(types.SET_MARK_POINTS, resData.data.markpoints);
        }
    },
    collectcCard: async (context, payload) => {
        // 收藏卡片
        const resData = await $http.post({
            url: `/api/card/collection/add/${payload.cardId}`
        });
        if (resData.success) {
            context.commit(types.SAVE_CARD, {
                markId: payload.markId,
                cardId: payload.cardId,
                collected: true
            });
        }
    },
    cancleCollectCard: async (context, payload) => {
        // 取消收藏
        const resData = await $http.post({
            url: `/api/card/collection/delete/${payload.cardId}`
        });
        if (resData.success) {
            context.commit(types.SAVE_CARD, {
                markId: payload.markId,
                cardId: payload.cardId,
                collected: false
            });
            payload.callback && payload.callback();
        }
    },
    getUserCards: async (context, payload) => {
        // 获取用户收藏的卡片
        const resData = await $http.get({
            url: `/api/card/collection`
        });
        if (resData.success) {
            payload.callback && payload.callback(resData.data);
        }
    },
    getOneCard: async (context, payload) => {
        const resData = await $http.get({
            url: `/api/card/${payload.cardId}`
        });
        if (resData.success) {
            return resData.data;
        }
    }
};

export default actions;
