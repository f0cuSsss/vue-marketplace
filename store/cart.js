export const actions = {
    addToCart({ state, commit, getters }, product) {
        if(!getters.isProductInCart(product.id))
            commit('pushProductToCart', product)
        else 
            commit('popProductFromCartById', product.id);
    },
    removeFromCart({ commit }, productId) {
        commit('popProductFromCartById', productId);
    },
    initCart({ commit }) {
        let products = localStorage.getItem('userCart');
        if(!localStorage.getItem('userCart') && products) {
            commit('pushProductToCart', JSON.parse(products));
        }
    }
}

export const mutations = {
    pushProductToCart(state, product) {
        if(Array.isArray(product)) {
            state.cart.unshift(...product);
        }
        else {
            state.cart.unshift(product);
        }
        console.log(state.cart);
        localStorage.setItem('userCart', JSON.stringify(state.cart));
    },
    popProductFromCartById(state, id) {
        state.cart = state.cart.filter(p => p.id !== id);
    },

}

export const state = () => ({
    cart: []
})

export const getters = {
    getCartProducts(state) {
        return state.cart;
    },
    isProductInCart: state => id => {
        return state.cart.some(p => p.id == id);
    }
}