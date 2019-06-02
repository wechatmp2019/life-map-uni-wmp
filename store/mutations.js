/*
 * mutations 修改状态
 * @Author: chenjiaxi
 * @Date: 2019-05-15 22:08:05
 * @Last Modified by: chenjiaxi
 * @Last Modified time: 2019-05-25 22:27:40
 */

import * as types from './mutationTypes';
const matations = {
    /**
    * state:当前状态树
    * payload: 提交matations时传的参数
    */
    [types.SET_CURRENT_MAP] (state, payload) {
        state.currentMap = payload;
    },
    [types.SET_MARK_POINTS] (state, payload) {
        state.markPoints = payload;
        state.markPoints.forEach(item => {
            state.cardsMap[item.id] = item.cards;
        });
    },
    [types.SAVE_CARD] (state, payload) {
        state.cardsMap[payload.markId].find(card => card.id === payload.cardId).collected = payload.collected;
    }
};

export default matations;
