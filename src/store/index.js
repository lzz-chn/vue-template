import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import header from './modules/header';

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    modules: {
        header
    }
});
