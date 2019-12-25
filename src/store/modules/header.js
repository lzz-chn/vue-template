export default {
    namespaced: true,
    state: {
        name: 'yo.'
    },
    mutations: {
        name(state, val) {
            state.name = val;
        }
    },
    actions: {
        name({ commit }, val) {
            commit('name', val);
        }
    },
    getters: {
        name: state => state.name
    }
};
