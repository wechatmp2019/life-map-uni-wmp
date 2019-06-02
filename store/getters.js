/*
 * getters计算过滤操作
 * @Author: chenjiaxi
 * @Date: 2019-05-15 22:07:34
 * @Last Modified by: chenjiaxi
 * @Last Modified time: 2019-05-26 11:59:27
 */

const getters = {
    getMarkPointById: (state, getters) => (id) => {
        return state.markPoints.find(markPoints => markPoints.id === id);
    },
    getCardsMap: (state) => {
        // markpointId 到 cards 数组的映射
        return state.cardsMap;
    },
    getCardsByMarkPointId: (state) => (id) => {
        return state.cardsMap[id];
    },
    getCardByCardAndMarkId: (state, getters) => (cardId, markId) => {
        return state.cardsMap[markId].find(card => card.id === cardId);
    }
};

export default getters;
