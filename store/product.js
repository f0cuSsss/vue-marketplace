import unsplash from '@/assets/apis/unsplash'


export const actions = {
    async fetchProducts({ commit }, limit = 15) {
        const res = await this.$axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`);

        const characteristics = [
            { name: 'Brand', value: 'Some name of brand' },
            { name: 'Model', value: 'Some name of model' },
            { name: 'Size', value: 'M' },
            { name: 'Other', value: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint cumque repellendus illum iure, ex recusandae quo eveniet blanditiis sequi debitis! Maxime cum qui molestiae illo ipsa vero sapiente tempore doloribus?' }
        ];

        const resImages = await unsplash.get('/search/photos',
        {
            params: 
                { 
                    page: 1,
                    per_page: limit,
                    query: 'product'
                },
        });

        const products = res.data.map((product, index) => { 
            product.characteristics = characteristics;
            product.image = resImages.data.results[index].urls.regular;
            product.price = (Math.random() * 1000 + 100).toFixed(2);
            return product;
        });

        commit('setProducts', products);
    },
    async fetchRecommendedProducts({ commit }, count = 4) {
        const res = await this.$axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=30`);

        const characteristics = [
            { name: 'Brand', value: 'Some name of brand' },
            { name: 'Model', value: 'Some name of model' },
            { name: 'Size', value: 'M' },
            { name: 'Other', value: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint cumque repellendus illum iure, ex recusandae quo eveniet blanditiis sequi debitis! Maxime cum qui molestiae illo ipsa vero sapiente tempore doloribus?' }
        ];

        const resImages = await unsplash.get('/search/photos',
        {
            params: 
                { 
                    page: 1,
                    per_page: 30,
                    query: 'product'
                },
        });

        const products = Array(count).fill(0).map((v, index) => {
            const rand = Math.floor(Math.random() * (res.data.length - 1) + 0);
            const product = res.data[rand];
            product.characteristics = characteristics;
            product.image = resImages.data.results[rand].urls.regular;
            product.price = (Math.random() * 1000 + 100).toFixed(2);
            return product;
        });

        commit('setRecommendedProducts', products);
    }
}
    
export const mutations = {
    setProducts(state, products) {
        state.products = products;
    },
    setRecommendedProducts(state, products) {
        state.recommendedProducts = products;
    },
    setIsRedirectBack(state, status = 'revert') {
        if(status == 'revert') {
            state.isRedirectBack = !state.isRedirectBack;
        } else {
            state.isRedirectBack = status;
        }
    },
    searchProducts(state, name) {

    }
}

export const state = () => ({
    products: [],
    recommendedProducts: [],
    isRedirectBack: false
})

export const getters = {
    getProducts(state) {
        return state.products
    },
    getProductById: state => id => {
        const product = state.products.find(product => product.id == id);
        return product 
            ? product 
            : state.recommendedProducts.find(product => product.id == id);
    },
    getRecommendedProducts(state) {
        return state.recommendedProducts;
    },
    isRedirectBack(state) {
        return state.isRedirectBack;
    },
    getProductsByName: state => (name = '') => {
        if(name === '')
            return state.products;

        let products = state.products.filter(product => product.title.toUpperCase().includes(name.toUpperCase()) ?? product);
        return products;
    }
}
