/*
 * 组装模块并导出 store 的地方
 * @Author: chenjiaxi
 * @Date: 2019-05-15 22:09:09
 * @Last Modified by: chenjiaxi
 * @Last Modified time: 2019-05-16 10:32:48
 */

import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import getters from './getters';
import actions from './actions';
import mutations from './mutations';
import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    plugins: debug ? [createLogger()] : []
});
