export const actions = {
    login({ commit }, userData) {
        commit('login', userData)
    },
    logout({ commit }) {
        commit('logout');
    }
}

export const mutations = {
    login(state, userData) {
        state.user = userData;
        state.isLoggedIn = true;
    },
    logout(state) {
        state.user = null;
        state.isLoggedIn = false;
    }
}

export const state = () => ({
    user: null,
    isLoggedIn: false
})

export const getters = {
    getUserData(state) {
        return state.user;
    },
    userIsLoggedIn(state) {
        return state.isLoggedIn;
    }
}